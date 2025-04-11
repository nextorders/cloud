import type { TelegramBindingDraft, TelegramReceiverDraft } from '../types'
import { useDatabase } from '../database'
import { telegramBindings, telegramReceivers } from '../tables'

export class Telegram {
  static async list() {
    return useDatabase().query.telegramBots.findMany()
  }

  static async createBinding(data: TelegramBindingDraft) {
    const [binding] = await useDatabase().insert(telegramBindings).values(data).returning()
    return binding
  }

  static async createReceiver(data: TelegramReceiverDraft) {
    const [receiver] = await useDatabase()
      .insert(telegramReceivers)
      .values(data)
      .returning()
    return receiver
  }
}
