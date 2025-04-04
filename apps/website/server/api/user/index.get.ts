import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return repository.user.findWithEntities(user.id)
})
