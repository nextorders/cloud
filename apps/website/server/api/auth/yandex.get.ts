import type { UserYandex } from '#auth-utils'
import { repository } from '@nextorders/database'

const logger = useLogger('yandex')

export default defineOAuthYandexEventHandler({
  async onSuccess(event, { user, tokens }) {
    logger.success('New auth', user, tokens)

    if (!user?.id || !user.default_email) {
      logger.error('Yandex OAuth error: missing email')
      return sendRedirect(event, '/sign-in')
    }

    const yandexUser = user as unknown as UserYandex
    const avatarUrl = `https://avatars.yandex.net/get-yapic/${yandexUser?.default_avatar_id}/islands-retina-middle`

    // Get and Update data in DB
    const userInDB = await repository.user.findByEmail(yandexUser.default_email) ?? await repository.user.create({ email: yandexUser.default_email, name: yandexUser?.display_name, avatarUrl })
    if (!userInDB) {
      logger.error('Yandex OAuth error: User not found')
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
    logger.error('Yandex OAuth error:', error)
    return sendRedirect(event, '/sign-in')
  },
})
