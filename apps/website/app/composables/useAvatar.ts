import { getRandInteger } from '#shared/utils/random'

type State = {
  seed: string
  emotion: number
  gender: string
  clothing: string
}

export type AvatarOptions = State & {
  href: string
}

export function useAvatar() {
  const hostUrl = 'https://avatar.nextorders.ru'

  const availableGenders = ['male', 'female']
  const availableClothing = ['teal', 'amber', 'green', 'blue', 'pink', 'violet']

  function getRandomClothing() {
    return availableClothing[getRandInteger(0, availableClothing.length - 1)] ?? 'amber'
  }

  function generateAvatar(): AvatarOptions {
    const avatar = {} as AvatarOptions

    avatar.seed = generateSeed()
    avatar.emotion = getRandInteger(1, 10)
    avatar.gender = getRandInteger(0, 1) === 0 ? 'male' : 'female'
    avatar.clothing = getRandomClothing()
    avatar.href = getHref(avatar)

    return avatar
  }

  function getHref(options: AvatarOptions): string {
    const url = new URL(`/${options.seed}`, hostUrl)

    url.searchParams.set('emotion', options.emotion.toString())
    url.searchParams.set('gender', options.gender)
    url.searchParams.set('clothing', options.clothing)

    return url.href
  }

  function generateSeed() {
    return getRandInteger(100000, 1000000).toString()
  }

  return {
    availableGenders,
    availableClothing,
    generateAvatar,
    generateSeed,
    getHref,
  }
}
