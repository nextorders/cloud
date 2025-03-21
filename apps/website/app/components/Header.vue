<template>
  <header class="bg-(--ui-bg)/85 backdrop-blur border-b border-(--ui-border) sticky h-16 top-0 z-50">
    <UContainer class="flex items-center justify-between gap-3 h-full">
      <div class="lg:flex-1 flex items-center gap-1.5">
        <Logo />
      </div>

      <div class="hidden lg:flex">
        <UNavigationMenu
          :items="items"
          variant="link"
        />
      </div>

      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <ColorModeToggle />
        <GithubButton />
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Цены',
  to: '/pricing',
}, {
  label: 'Документация',
  to: '/docs/getting-started',
  active: route.path.startsWith('/docs'),
}])
</script>
