import { useDatabase } from '../database'
import { Balance } from './balance'
import { Space } from './space'
import { Tariff } from './tariff'
import { User } from './user'

class Repository {
  readonly balance = Balance
  readonly space = Space
  readonly tariff = Tariff
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
