import { useDatabase } from '../database'

export class Tariff {
  static async list() {
    return useDatabase().query.tariffs.findMany()
  }
}
