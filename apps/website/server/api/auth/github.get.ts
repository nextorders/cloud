import type { UserGitHub } from '#auth-utils'
import { repository } from '@nextorders/database'
import { notify } from '~~/server/services/telegram/bot'

const logger = useLogger('github')

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user?.email) {
      logger.error('GitHub OAuth error: Missing email')
      return sendRedirect(event, '/sign-in')
    }

    const githubUser = user as unknown as UserGitHub

    async function createUser() {
      const user = await repository.user.create({ email: githubUser.email, name: githubUser?.name ?? 'Аноним', avatarUrl: githubUser?.avatar_url })

      try {
        await notify(`New user via GitHub: ${user?.name} (${user?.email}, ${user?.id})`)
      } catch (error) {
        logger.error('Failed to send Telegram notification', error)
      }

      return user
    }

    const userInDB = await repository.user.findByEmail(githubUser.email) ?? await createUser()
    if (!userInDB) {
      logger.error('GitHub OAuth error: User not found')
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
    logger.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
