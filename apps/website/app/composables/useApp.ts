function _useApp() {
  const route = useRoute()

  const isMobileMenuOpened = ref(false)

  const mainNavigationItems = computed(() => [{
    label: 'Аватары',
    to: '/avatar',
    active: route.path.startsWith('/avatar'),
  }, {
    label: 'Документация',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs'),
  }])

  watch(
    () => route.fullPath,
    () => {
      isMobileMenuOpened.value = false
    },
  )

  return {
    isMobileMenuOpened,
    mainNavigationItems,
  }
}

export const useApp = createSharedComposable(_useApp)
