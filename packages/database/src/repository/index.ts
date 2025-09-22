import { useDatabase } from '../database'
import { Balance } from './balance'
import { Bucket } from './bucket'
import { City } from './city'
import { Cluster } from './cluster'
import { Company } from './company'
import { Email } from './email'
import { Payment } from './payment'
import { Point } from './point'
import { Service } from './service'
import { Space } from './space'
import { Tariff } from './tariff'
import { Telegram } from './telegram'
import { User } from './user'

class Repository {
  readonly balance = Balance
  readonly bucket = Bucket
  readonly city = City
  readonly cluster = Cluster
  readonly company = Company
  readonly email = Email
  readonly payment = Payment
  readonly point = Point
  readonly service = Service
  readonly space = Space
  readonly tariff = Tariff
  readonly telegram = Telegram
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
