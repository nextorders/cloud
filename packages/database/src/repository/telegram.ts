import type { TelegramBindingDraft } from '../types'
import { useDatabase } from '../database'
import { telegramBindings } from '../tables'

export class Telegram {
  static async list() {
    return useDatabase().query.telegramBots.findMany()
  }

  static async createBinding(data: TelegramBindingDraft) {
    const [binding] = await useDatabase().insert(telegramBindings).values(data).returning()
    return binding
  }
}
