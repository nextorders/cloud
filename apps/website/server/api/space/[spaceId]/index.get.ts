import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  const spaceId = getRouterParam(event, 'spaceId')
  if (!spaceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Space id is required',
    })
  }

  const { user } = await requireUserSession(event)

  const space = await repository.space.findWithEntities(spaceId)
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
