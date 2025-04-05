import type { UserVK } from '#auth-utils'
import { repository } from '@nextorders/database'
import { notify } from '~~/server/services/telegram/bot'

const logger = useLogger('vk')

export default defineOAuthVKEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.user?.user_id || !user.user?.email) {
      logger.error('VK OAuth error: missing email')
      return sendRedirect(event, '/sign-in')
    }

    const { user: vkUser } = user as unknown as UserVK
    const name = `${vkUser?.first_name} ${vkUser?.last_name}`

    async function createUser() {
      const user = await repository.user.create({ email: vkUser.email, name, avatarUrl: vkUser?.avatar })

      try {
        await notify(`New user via VK: ${user?.name} (${user?.email}, ${user?.id})`)
      } catch (error) {
        logger.error('Failed to send Telegram notification', error)
      }

      return user
    }

    const userInDB = await repository.user.findByEmail(vkUser.email) ?? await createUser()
    if (!userInDB) {
      logger.error('VK OAuth error: User not found')
      return sendRedirect(event, '/sign-in')
    }

    await setUserSession(event, {
      user: {
        id: userInDB.id,
        name: userInDB.name,
        email: userInDB.email,
        avatarUrl: userInDB.avatarUrl,
      },
    })
    return sendRedirect(event, '/cabinet')
  },
  onError(event, error) {
    logger.error('VK OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
