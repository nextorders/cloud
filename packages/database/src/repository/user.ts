import type { UserDraft, UserQuotaKey } from '../types'
import { and, eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { userQuotas, users } from '../tables'

export class User {
  static async find(id: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      with: {
        quotas: true,
      },
    })
  }

  static async findByEmail(email: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
  }

  static async findWithEntities(id: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      with: {
        memberInSpaces: {
          with: {
            space: {
              with: {
                members: {
                  with: {
                    user: true,
                  },
                  orderBy: (spaceMembers, { asc }) => asc(spaceMembers.createdAt),
                },
              },
            },
            user: true,
          },
          orderBy: (spaceMembers, { asc }) => asc(spaceMembers.createdAt),
        },
        quotas: true,
      },
    })
  }

  static async create(data: UserDraft) {
    const [user] = await useDatabase().insert(users).values(data).returning()
    if (!user) {
      return
    }

    // Create default quotas
    await User.createQuota(user.id, 'owned_spaces', 1)

    return user
  }

  static async createQuota(userId: string, key: UserQuotaKey, limit: number) {
    const [quota] = await useDatabase()
      .insert(userQuotas)
      .values({
        userId,
        key,
        used: 0,
        limit,
      })
      .returning()

    return quota
  }

  static async updateUsedQuota(userId: string, key: UserQuotaKey, amount: number = 1) {
    return useDatabase()
      .update(userQuotas)
      .set({ used: sql`${userQuotas.used} + ${amount}` })
      .where(and(eq(userQuotas.userId, userId), eq(userQuotas.key, key)))
      .returning()
  }
}
