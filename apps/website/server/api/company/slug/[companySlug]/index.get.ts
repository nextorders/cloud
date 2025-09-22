import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  try {
    const companySlug = getRouterParam(event, 'companySlug')
    if (!companySlug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug is required',
      })
    }

    return repository.company.findBySlug(companySlug)
  } catch (error) {
    throw errorResolver(error)
  }
})
