import type { UserDraft } from '../types'
import { useDatabase } from '../database'
import { users } from '../tables'

export class User {
  static async find(id: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
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
      },
    })
  }

  static async create(data: UserDraft) {
    const [user] = await useDatabase().insert(users).values(data).returning()
    return user
  }
}
