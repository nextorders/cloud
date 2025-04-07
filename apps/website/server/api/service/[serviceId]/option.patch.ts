import { repository } from '@nextorders/database'
import { notify } from '~~/server/services/telegram/bot'
import { serviceOptionCreateSchema } from '~~/shared/services/service'

export default defineEventHandler(async (event) => {
  const serviceId = getRouterParam(event, 'serviceId')
  if (!serviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Space id is required',
    })
  }

  const body = await readBody(event)
  const data = serviceOptionCreateSchema.parse(body)

  const { user } = await getUserSession(event)
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const service = await repository.service.find(serviceId)
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

  await repository.service.composeOption(serviceId, data)

  await notify(`Update service option: ${service.id} - ${data.key} - ${data.value}`)

  return {
    ok: true,
  }
})
