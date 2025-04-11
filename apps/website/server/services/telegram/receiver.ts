import { repository } from '@nextorders/database'

export async function createTelegramReceiver(data: { bindingId: string, serviceId: string, optionId: string, websiteUrl: string, apiToken: string }) {
  const binding = await repository.telegram.findBinding(data.bindingId)
  if (!binding?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Binding not found',
    })
  }

  const token = getToken()

  const receiver = await repository.telegram.createReceiver({
    botId: binding.botId,
    token,
    serviceId: data.serviceId,
  })
  if (!receiver) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Receiver not found',
    })
  }

  const url = `https://nextorders.ru/api/telegram/receiver/${receiver.id}/checkout`

  await $fetch(`${data.websiteUrl}/api/checkout/receiver`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.apiToken}`,
    },
    body: {
      name: `Telegram ${binding.chatId}`,
      url,
      method: 'POST',
      authorization: `Bearer ${token}`,
    },
  })

  await repository.service.setOptionAsActive(data.optionId)
}
