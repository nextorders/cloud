import { useCreateBot } from '../services/telegram/bot'

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

  if (telegram.botToken) {
    useCreateBot()
  }

  logger.success('Telegram bots started')
})
