import { repository } from '@nextorders/database'

export default defineEventHandler(async (event) => {
  event.context.auth = null

  const { user } = await getUserSession(event)

  const userId = user?.id
  if (!userId) {
    return
  }

  const userInDB = await repository.user.find(userId)
  if (!userInDB?.id) {
    return
  }

  event.context.auth = { user: userInDB }
})
