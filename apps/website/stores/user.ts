import type { Email, EmailStatus, Space, SpaceMember, User, UserQuota, UserQuotaKey } from '@nextorders/database'

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
  const emails = ref<(Email & { status: EmailStatus })[]>([])

  async function update() {
    try {
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
      emails.value = data.emails as (Email & { status: EmailStatus })[]

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
    } catch (error) {
      if (error instanceof Error) {
        // Do nothing
      }
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
    emails,

    update,
  }
})

function getQuotaInfo(key: UserQuotaKey): { name: string, icon: string } {
  switch (key) {
    case 'owned_spaces':
      return {
        name: 'Пространства',
        icon: 'i-lucide-hexagon',
      }
    case 'owned_emails':
      return {
        name: 'Email адреса',
        icon: 'i-lucide-mail',
      }
    default:
      return { name: key, icon: 'i-lucide-circle' }
  }
}
