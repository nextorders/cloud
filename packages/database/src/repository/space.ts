import type { SpaceDraft, SpaceMemberDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { spaceMembers, spaces } from '../tables'
import { Balance } from './balance'

export class Space {
  static async find(id: string) {
    return useDatabase().query.spaces.findFirst({
      where: (spaces, { eq }) => eq(spaces.id, id),
    })
  }

  static async findWithExpiredPaidTo() {
    return useDatabase().query.spaces.findMany({
      where: (spaces, { sql }) => sql`${spaces.paidTo} < now()`,
    })
  }

  static async findWithEntities(id: string) {
    return useDatabase().query.spaces.findFirst({
      where: (spaces, { eq }) => eq(spaces.id, id),
      with: {
        members: {
          with: {
            user: true,
          },
        },
        balanceChanges: {
          orderBy: (balanceChanges, { desc }) => desc(balanceChanges.createdAt),
        },
        payments: true,
      },
    })
  }

  static async create(data: SpaceDraft) {
    const [space] = await useDatabase()
      .insert(spaces)
      .values(data)
      .returning()

    if (!space) {
      return
    }

    // Create member as owner
    await Space.createMember({
      spaceId: space.id,
      userId: space.ownerId,
      roles: ['owner'],
    })

    // Create first bonus change: 7 days
    const bonusAmount = 9 * 7
    await Balance.change({
      type: 'bonus',
      spaceId: space.id,
      amount: bonusAmount,
      description: 'Приветственный бонус',
    })

    return space
  }

  static async createMember(data: SpaceMemberDraft) {
    const [spaceMember] = await useDatabase()
      .insert(spaceMembers)
      .values(data)
      .returning()

    return spaceMember
  }

  static async addDayToPaidTo(spaceId: string, dailyCost: number) {
    await Balance.change({
      type: 'daily_tariff_debit',
      spaceId,
      amount: dailyCost,
      description: 'Ежедневное списание согласно тарифу',
    })

    // +24 hours
    await useDatabase()
      .update(spaces)
      .set({ paidTo: sql`paid_to + interval '1 day'` })
      .where(eq(spaces.id, spaceId))
  }
}
