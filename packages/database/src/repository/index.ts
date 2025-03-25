import { useDatabase } from '../database'
import { User } from './user'

class Repository {
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()

    return true
  }
}

export const repository = new Repository()
