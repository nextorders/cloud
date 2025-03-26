export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, ready } = useUserSession()

  if (ready && !loggedIn) {
    return navigateTo('/sign-in')
  }
})
