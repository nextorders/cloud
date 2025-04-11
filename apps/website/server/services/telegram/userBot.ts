import { repository } from '@nextorders/database'
import { Bot } from 'grammy'

const logger = useLogger('user-telegram-bot')

const userBots: Bot[] = []

export function useUserBot(token: string): Bot | undefined {
  return userBots.find((bot) => bot.token === token)
}

export function useCreateUserBot(id: string, token: string): boolean {
  if (useUserBot(token)) {
    return false
  }

  const bot = new Bot(token)

  bot.on('message:text', async (ctx) => {
    // const locale = ctx.message.from.language_code

    if (ctx.hasCommand('start')) {
      const binding = await repository.telegram.createBinding({
        chatId: ctx.message.chat.id.toString(),
        botId: id,
      })
      if (!binding) {
        return
      }

      await ctx.reply(binding.id)

      return
    }

    logger.log(ctx.message.from.id, ctx.message.text)
    ctx.reply('Я пока не умею отвечать на сообщения.')
  })

  bot.start()

  userBots.push(bot)

  return true
}
