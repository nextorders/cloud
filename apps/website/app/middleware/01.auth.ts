export default defineNuxtRouteMiddleware(async () => {
  const { user } = useUserSession()

  if (!user.value?.id) {
    return navigateTo('/sign-in')
  }
})
