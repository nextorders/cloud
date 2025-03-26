<template>
  <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2">
    <UNavigationMenu
      :items="menuItems"
      orientation="vertical"
    />

    <UNavigationMenu
      :items="linkItems"
      orientation="vertical"
      class="mt-auto"
    />
  </div>

  <div class="shrink-0 flex items-center gap-1.5 px-4 py-2 lg:border-t lg:border-(--ui-border)">
    <CabinetUserMenu />
  </div>
</template>

<script setup lang="ts">
const menuItems = ref([
  {
    label: 'Кабинет',
    to: '/cabinet',
    icon: 'i-lucide-briefcase-business',
  },
])

const linkItems = ref([
  {
    label: 'На главную',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Поддержка',
    icon: 'i-lucide-circle-help',
    to: 'https://t.me/hmbanan666',
    target: '_blank',
  },
])
</script>
