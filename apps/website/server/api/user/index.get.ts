import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  const { auth } = event.context
  if (!auth?.user.id) {
    return null
  }

  return repository.user.findWithEntities(auth.user.id)
})
