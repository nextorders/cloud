import type { City } from '@nextorders/database'

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/city/list')
      if (!data) {
        return
      }

      cities.value = data
    } catch (error) {
      if (error instanceof Error) {
        // Do nothing
      }
    }
  }

  return {
    cities,

    update,
  }
})
