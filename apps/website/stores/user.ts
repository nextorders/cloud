import type { Space, SpaceMember, User, UserQuota, UserQuotaKey } from '@nextorders/database'

type SpaceMemberWithData = SpaceMember & { space: SpaceWithMembers, user: User }
type SpaceWithMembers = Space & { members: SpaceMemberWithUser[] }
type SpaceMemberWithUser = SpaceMember & { user: User }

type UserQuotaWithData = UserQuota & {
  key: UserQuotaKey
  name: string
  icon: string
}

export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const updatedAt = ref<string | undefined>(undefined)
  const email = ref('')
  const name = ref('')
  const avatarUrl = ref<string | null>(null)
  const memberInSpaces = ref<SpaceMemberWithData[]>([])
  const quotas = ref<UserQuotaWithData[]>([])

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

    if (data.quotas && Array.isArray(data.quotas)) {
      quotas.value = data.quotas.map((quota) => {
        const quotaKey = quota.key as UserQuotaKey
        const { name, icon } = getQuotaInfo(quotaKey)

        return {
          ...quota,
          key: quotaKey,
          name,
          icon,
        }
      })
    }
  }

  return {
    id,
    updatedAt,
    email,
    name,
    avatarUrl,
    memberInSpaces,
    quotas,

    update,
  }
})

function getQuotaInfo(key: UserQuotaKey): { name: string, icon: string } {
  if (key === 'owned_spaces') {
    return {
      name: 'Пространства',
      icon: 'i-lucide-hexagon',
    }
  }

  return { name: key, icon: 'i-lucide-circle' }
}
