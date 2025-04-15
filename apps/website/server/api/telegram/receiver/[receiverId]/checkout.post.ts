import type { CheckoutForReceiver } from '~~/types/receiver'
import { repository } from '@nextorders/database'
import { formatCheckout } from '~~/server/services/telegram/checkout'
import { useUserBot } from '~~/server/services/telegram/userBot'

export default defineEventHandler(async (event) => {
  try {
    const logger = useLogger('telegram')

    const receiverId = getRouterParam(event, 'receiverId')
    if (!receiverId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const receiver = await repository.telegram.findReceiver(receiverId)
    if (!receiver) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Telegram receiver not found',
      })
    }

    const bearerToken = getHeader(event, 'Authorization')
    const key = bearerToken?.startsWith('Bearer ') ? bearerToken.substring(7) : bearerToken

    if (!receiver.token || !key || receiver.token !== key) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      })
    }

    const bot = useUserBot(receiver.binding.bot.token)
    if (!bot) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bot not found',
      })
    }

    const body = await readBody(event)
    const checkout = body.checkout as CheckoutForReceiver

    const message = await bot.api.sendMessage(receiver.binding.chatId, formatCheckout(checkout))

    logger.log('Message sent', message.message_id)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
