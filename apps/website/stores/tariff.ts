import type { Tariff } from '@nextorders/database'

export const useTariffStore = defineStore('tariff', () => {
  const list = ref<Tariff[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/tariff/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      list.value = data
    } catch (error) {
      if (error instanceof Error) {
        // Do nothing
      }
    }
  }

  function findTariff(id: string): Tariff | undefined {
    return list.value.find((t) => t.id === id)
  }

  return {
    list,

    update,
    findTariff,
  }
})
