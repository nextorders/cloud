import { repository } from '@nextorders/database'
import { useCreateUserBot } from '~~/server/services/telegram/userBot'

const logger = useLogger('telegram:bots')

export default defineTask({
  meta: {
    name: 'telegram:bots',
    description: 'On and off Telegram bots',
  },
  async run() {
    // Only on prod
    if (import.meta.dev) {
      return { result: true }
    }

    try {
      const telegramBots = await repository.telegram.list()

      for (const bot of telegramBots) {
        const ok = useCreateUserBot(bot.id, bot.token)

        if (ok) {
          logger.log(`Bot ${bot.id} now is ON`)
        }
      }
    } catch (error) {
      errorResolver(error)
    }

    return { result: true }
  },
})
