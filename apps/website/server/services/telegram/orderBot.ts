import { createId } from '@paralleldrive/cuid2'
import { Bot } from 'grammy'

const logger = useLogger('telegram')
const { telegram } = useRuntimeConfig()

let bot: Bot | null = null

export function useCreateOrderBot() {
  bot = new Bot(telegram.orderBotToken)

  bot.on('message:text', async (ctx) => {
    // const locale = ctx.message.from.language_code

    if (ctx.hasCommand('start')) {
      // Welcome message with buttons
      await ctx.reply(
        createId(),
        // {
        //   reply_markup: {
        //     inline_keyboard: [
        //       [{ text: dictionary(locale).bots.woodland.title, url: woodlandsBotUrl }],
        //     ],
        //   },
        // },
      )

      return
    }

    logger.log(ctx.message.from.id, ctx.message.text)
    ctx.reply('Я пока не умею отвечать на сообщения.')
  })

  bot.start()
}

export function useOrderBot(): Bot {
  if (!bot) {
    throw new Error('Order Bot is not created')
  }

  return bot
}
