function _useApp() {
  const route = useRoute()

  const isMobileMenuOpened = ref(false)

  const mainNavigationItems = computed(() => [{
    label: 'Цены',
    to: '/pricing',
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
