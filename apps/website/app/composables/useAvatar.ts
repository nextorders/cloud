import { getRandInteger } from '#shared/utils/random'

export type AvatarState = {
  seed: string
  emotion: string
  gender: string
  clothing: string
}

export function useAvatar() {
  const hostUrl = 'https://avatar.nextorders.ru'

  const availableGenders = ['male', 'female']
  const availableClothing = ['teal', 'amber', 'green', 'blue', 'pink', 'violet']
  const availableEmotions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  function getRandomClothing() {
    return availableClothing[getRandInteger(0, availableClothing.length - 1)] ?? 'amber'
  }

  function generateAvatar(): AvatarState {
    const avatar = {} as AvatarState

    avatar.seed = generateSeed()
    avatar.emotion = getRandInteger(1, 10).toString()
    avatar.gender = getRandInteger(0, 1) === 0 ? 'male' : 'female'
    avatar.clothing = getRandomClothing()

    return avatar
  }

  function getHref(options: AvatarState): string {
    const url = new URL(`/${options.seed}`, hostUrl)

    url.searchParams.set('emotion', options.emotion.toString())
    url.searchParams.set('gender', options.gender)
    url.searchParams.set('clothing', options.clothing)

    return url.href
  }

  function generateSeed(): string {
    return getRandInteger(100000, 1000000).toString()
  }

  return {
    availableGenders,
    availableClothing,
    availableEmotions,
    generateAvatar,
    generateSeed,
    getHref,
  }
}
