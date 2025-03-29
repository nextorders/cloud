import type { Space, SpaceMember, User } from '@nextorders/database'

type SpaceMemberWithData = SpaceMember & { space: SpaceWithMembers, user: User }
type SpaceWithMembers = Space & { members: SpaceMemberWithUser[] }
type SpaceMemberWithUser = SpaceMember & { user: User }

export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const updatedAt = ref<string | undefined>(undefined)
  const email = ref('')
  const name = ref('')
  const avatarUrl = ref<string | null>(null)
  const memberInSpaces = ref<SpaceMemberWithData[]>([])

  async function update() {
    const data = await $fetch('/api/user', {
      lazy: true,
      server: true,
      cache: 'no-cache',
      getCachedData: undefined,
    })
    if (!data) {
      return
    }

    id.value = data.id
    updatedAt.value = data.updatedAt
    email.value = data.email
    name.value = data.name
    avatarUrl.value = data.avatarUrl
    memberInSpaces.value = data.memberInSpaces
  }

  return {
    id,
    updatedAt,
    email,
    name,
    avatarUrl,
    memberInSpaces,

    update,
  }
})
