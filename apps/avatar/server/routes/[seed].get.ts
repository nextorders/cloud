import type { AvatarOptions } from '@nextorders/avatar'
import { createAvatar } from '@nextorders/avatar'

export default defineCachedEventHandler(async (event) => {
  try {
    const seed = getRouterParam(event, 'seed')
    const query = getQuery(event)

    setHeader(event, 'Content-Type', 'image/svg+xml')

    const gender = query.gender?.toString() as AvatarOptions['gender']
    const clothing = query.clothing?.toString() as AvatarOptions['clothing']
    const emotion = query.emotion ? Number(query.emotion) as AvatarOptions['emotion'] : undefined

    const options = {
      seed,
      gender,
      emotion,
      clothing,
    } satisfies AvatarOptions

    return createAvatar(options)
  } catch (error) {
    throw errorResolver(error)
  }
}, {
  maxAge: 60 * 60 * 24 * 30,
})
