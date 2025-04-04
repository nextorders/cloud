import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Space id is required',
    })
  }

  const { user } = await getUserSession(event)
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const space = await repository.space.findWithEntities(id)
  if (!space?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Space not found',
    })
  }

  // Member?
  const member = space.members.find((m) => m.userId === user.id)
  if (!member?.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  return space
})
