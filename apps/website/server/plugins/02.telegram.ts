import { useCreateBot } from '../services/telegram/bot'
import { useCreateOrderBot } from '../services/telegram/orderBot'

/**
 * Start Telegram bots (using long polling)
 */
export default defineNitroPlugin(() => {
  // Only on prod
  if (import.meta.dev) {
    return { result: true }
  }

  const logger = useLogger('plugin-start-telegram')
  const { telegram } = useRuntimeConfig()

  if (!telegram.botToken || !telegram.orderBotToken) {
    // No config provided
    return
  }

  useCreateBot()
  useCreateOrderBot()

  logger.success('Telegram bots started')
})
