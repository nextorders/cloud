import { useDatabase } from '../database'
import { Space } from './space'
import { User } from './user'

class Repository {
  readonly user = User
  readonly space = Space

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()

    return true
  }
}

export const repository = new Repository()
