import { repository } from '@nextorders/database'
import { createId } from '@paralleldrive/cuid2'

export async function createEmailReceiver(data: { email: string, userId: string, serviceId: string, emailOptionId: string, websiteUrl: string, apiToken: string }) {
  const emailInDB = await repository.email.findByEmail(data.email, data.userId)
  if (!emailInDB?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Email not found',
    })
  }

  const emailId = emailInDB?.id
  const token = `${createId()}${createId()}`

  const emailReceiver = await repository.email.createReceiver({
    emailId,
    token,
    serviceId: data.serviceId,
  })
  if (!emailReceiver) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Email receiver not found',
    })
  }

  const url = `https://nextorders.ru/api/email/receiver/${emailReceiver.id}/checkout`

  await $fetch(`${data.websiteUrl}/api/checkout/receiver`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.apiToken}`,
    },
    body: {
      name: data.email,
      url,
      method: 'POST',
      authorization: `Bearer ${token}`,
    },
  })

  await repository.service.setOptionAsActive(data.emailOptionId)
}
