import { Bot } from 'grammy'

const logger = useLogger('telegram')
const { telegram } = useRuntimeConfig()

let bot: Bot | null = null

export function useCreateBot() {
  bot = new Bot(telegram.botToken)

  bot.on('message:text', async (ctx) => {
    // const locale = ctx.message.from.language_code

    if (ctx.hasCommand('start')) {
      // Welcome message with buttons
      await ctx.reply(
        'Приветствую!',
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

export function useBot(): Bot {
  if (!bot) {
    throw new Error('Bot is not created')
  }

  return bot
}

export async function notify(message: string) {
  return useBot().api.sendMessage(telegram.supportId, message)
}
