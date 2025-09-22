export const useCompanyStore = defineStore('company', () => {
  async function getCompanyBySlug(slug: string) {
    try {
      const data = await $fetch(`/api/company/slug/${slug}`)
      if (!data) {
        return
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        // Do nothing
      }
    }
  }

  async function getUnitsByCitySlug(slug: string) {
    try {
      const data = await $fetch(`/api/city/slug/${slug}/unit-list`)
      if (!data) {
        return
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        // Do nothing
      }
    }
  }

  return {
    getCompanyBySlug,
    getUnitsByCitySlug,
  }
})
