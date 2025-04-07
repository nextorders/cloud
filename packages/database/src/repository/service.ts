import type { ServiceDraft, ServiceOptionDraft, ServiceOptionKey, ServiceOptionStatus, ServiceOptionType, ServiceType } from '../types'
import { useDatabase } from '../database'
import { serviceOptions, services } from '../tables'

export class Service {
  static async create(data: ServiceDraft & { type: ServiceType }) {
    const [service] = await useDatabase().insert(services).values(data).returning()
    return service
  }

  static async createOption(
    data: ServiceOptionDraft & { key: ServiceOptionKey, type: ServiceOptionType, status?: ServiceOptionStatus },
  ) {
    const [option] = await useDatabase().insert(serviceOptions).values(data).returning()
    return option
  }
}
