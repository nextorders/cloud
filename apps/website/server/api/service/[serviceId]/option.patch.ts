import { repository } from '@nextorders/database'
import { createEmailReceiver } from '~~/server/services/email/receiver'
import { notify } from '~~/server/services/telegram/bot'
import { createTelegramReceiver } from '~~/server/services/telegram/receiver'
import { serviceOptionCreateSchema } from '~~/shared/services/service'

export default defineEventHandler(async (event) => {
  const serviceId = getRouterParam(event, 'serviceId')
  if (!serviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Service id is required',
    })
  }

  const body = await readBody(event)
  const data = serviceOptionCreateSchema.parse(body)

  const { user } = await requireUserSession(event)

  const service = await repository.service.findWithOptions(serviceId)
  if (!service?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Service not found',
    })
  }

  const space = await repository.space.findWithEntities(service.spaceId)
  if (!space?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Space not found',
    })
  }

  // Member?
  const member = space.members.find((m) => m.userId === user.id)
  if (!member?.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const option = await repository.service.composeOption(serviceId, data)
  const websiteUrl = service.options.find((o) => o.key === 'primary_website_url')?.value ?? ''

  // If Email
  if (data.key === 'checkout_receiver_email') {
    await createEmailReceiver({
      email: data.value,
      userId: user.id,
      serviceId,
      emailOptionId: option?.id ?? '',
      websiteUrl,
      apiToken: service.apiToken ?? '',
    })
  }

  // If Telegram
  if (data.key === 'checkout_receiver_telegram') {
    await createTelegramReceiver({
      bindingId: data.value,
      serviceId,
      optionId: option?.id ?? '',
      websiteUrl,
      apiToken: service.apiToken ?? '',
    })
  }

  await notify(`Update service option: ${service.id} - ${data.key} - ${data.value}`)

  return {
    ok: true,
  }
})
