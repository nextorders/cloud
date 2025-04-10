import type { ServiceDraft, ServiceOptionDraft, ServiceOptionKey, ServiceOptionStatus, ServiceOptionType, ServiceType } from '../types'
import { and, eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { serviceOptions, services } from '../tables'

export class Service {
  static async find(id: string) {
    return useDatabase().query.services.findFirst({
      where: (services, { eq }) => eq(services.id, id),
    })
  }

  static async findWithOptions(id: string) {
    return useDatabase().query.services.findFirst({
      where: (services, { eq }) => eq(services.id, id),
      with: {
        options: true,
      },
    })
  }

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

  static async composeOption(serviceId: string, { key, value }: Pick<ServiceOptionDraft, 'key' | 'value'>) {
    const [option] = await useDatabase()
      .update(serviceOptions)
      .set({ value, status: 'on_moderation', updatedAt: sql`now()` })
      .where(and(eq(serviceOptions.serviceId, serviceId), eq(serviceOptions.key, key)))
      .returning()

    return option
  }

  static async setOptionAsActive(id: string) {
    await useDatabase()
      .update(serviceOptions)
      .set({ status: 'active', updatedAt: sql`now()` })
      .where(eq(serviceOptions.id, id))
  }
}
