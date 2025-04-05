import type { UserTwitch } from '#auth-utils'
import { repository } from '@nextorders/database'
import { notify } from '~~/server/services/telegram/bot'

const logger = useLogger('twitch')

export default defineOAuthTwitchEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user?.login || !user?.email) {
      logger.error('Twitch OAuth error: missing name or email')
      return sendRedirect(event, '/sign-in')
    }

    const twitchUser = user as unknown as UserTwitch

    async function createUser() {
      const user = await repository.user.create({ email: twitchUser.email, name: twitchUser?.login, avatarUrl: twitchUser?.profile_image_url })

      try {
        await notify(`New user via Twitch: ${user?.name} (${user?.email}, ${user?.id})`)
      } catch (error) {
        logger.error('Failed to send Telegram notification', error)
      }

      return user
    }

    const userInDB = await repository.user.findByEmail(twitchUser.email) ?? await createUser()
    if (!userInDB) {
      logger.error('Twitch OAuth error: User not found')
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
    logger.error('Twitch OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
