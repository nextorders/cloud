import type { Space } from '@nextorders/database'

export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const updatedAt = ref<string | undefined>(undefined)
  const email = ref('')
  const name = ref('')
  const avatarUrl = ref<string | null>(null)
  const spaces = ref<Space[]>([])

  async function update() {
    const data = await $fetch('/api/user', {
      lazy: true,
      server: true,
      cache: 'no-cache',
      getCachedData: undefined,
    })
    if (!data) {
      throw new Error('User data not found')
    }

    id.value = data.id
    updatedAt.value = data.updatedAt
    email.value = data.email
    name.value = data.name
    avatarUrl.value = data.avatarUrl
    spaces.value = data.spaces
  }

  return {
    id,
    updatedAt,
    email,
    name,
    avatarUrl,
    spaces,

    update,
  }
})
