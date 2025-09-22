import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  try {
    const citySlug = getRouterParam(event, 'citySlug')
    if (!citySlug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug is required',
      })
    }

    return repository.company.listUnitsByCitySlug(citySlug)
  } catch (error) {
    throw errorResolver(error)
  }
})
