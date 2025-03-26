export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession()

  if (!user.value?.id) {
    return navigateTo('/sign-in')
  }
})
