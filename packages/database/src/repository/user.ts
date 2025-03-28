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
        spaces: {
          with: {
            members: {
              with: {
                user: true,
              },
            },
          },
        },
      },
    })
  }

  static async create(data: UserDraft) {
    const [user] = await useDatabase().insert(users).values(data).returning()
    return user
  }
}
