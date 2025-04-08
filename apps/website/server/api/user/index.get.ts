import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  return repository.user.findWithEntities(user.id)
})
