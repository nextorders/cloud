import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  try {
    const auth = accessAuthGuard(event)

    return repository.user.findWithEntities(auth.user.id)
  } catch (error) {
    throw errorResolver(error)
  }
})
