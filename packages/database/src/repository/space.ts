import type { SpaceDraft, SpaceMemberDraft } from '../types'
import { useDatabase } from '../database'
import { spaceMembers, spaces } from '../tables'
import { Balance } from './balance'

export class Space {
  static async find(id: string) {
    return useDatabase().query.spaces.findFirst({
      where: (spaces, { eq }) => eq(spaces.id, id),
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
}
