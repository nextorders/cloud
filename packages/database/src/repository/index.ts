import { useDatabase } from '../database'
import { Balance } from './balance'
import { Bucket } from './bucket'
import { Cluster } from './cluster'
import { Payment } from './payment'
import { Space } from './space'
import { Tariff } from './tariff'
import { User } from './user'

class Repository {
  readonly balance = Balance
  readonly bucket = Bucket
  readonly cluster = Cluster
  readonly payment = Payment
  readonly space = Space
  readonly tariff = Tariff
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
