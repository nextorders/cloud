<template>
  <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-10">
    <aside class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height) py-8 lg:ps-4 lg:-ms-4 lg:pe-6.5 lg:col-span-2">
      <UNavigationMenu orientation="vertical" :items="items" />
    </aside>

    <div class="lg:col-span-8">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  [
    {
      label: 'Продукт',
      icon: 'i-lucide-book-open',
      defaultOpen: true,
      children: [
        {
          label: 'Вступление',
          icon: 'i-lucide-house',
          to: '/docs/getting-started',
        },
      ],
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '34',
      to: 'https://github.com/nextorders/food',
      target: '_blank',
    },
    {
      label: 'Поддержка',
      icon: 'i-simple-icons-telegram',
      to: 'https://t.me/hmbanan666',
      target: '_blank',
    },
  ],
])
</script>
