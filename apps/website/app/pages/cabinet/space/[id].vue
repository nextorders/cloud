<template>
  <CabinetHeader :title="`Пространство «${space?.name}»`">
    <template #submenu>
      <UNavigationMenu
        :items="items"
        highlight
        class="flex-1 -ml-2.5"
      />
    </template>
  </CabinetHeader>

  <NuxtPage />
</template>

<script setup lang="ts">
const { params } = useRoute('cabinet-space-id___en')

const space = useSpaceStore()
const res = await space.update(params.id)
if (!res) {
  await navigateTo('/cabinet')
}

const items = computed(() => [
  {
    label: 'Сервисы',
    to: `/cabinet/space/${params.id}`,
    icon: 'i-lucide-hexagon',
    exact: true,
  },
  {
    label: 'Баланс',
    to: `/cabinet/space/${params.id}/balance`,
    icon: 'i-lucide-wallet',
    badge: `${space.balance} ₽`,
  },
  {
    label: 'Изменения',
    to: `/cabinet/space/${params.id}/debit`,
    icon: 'i-lucide-list',
  },
  {
    label: 'Тариф',
    to: `/cabinet/space/${params.id}/tariff`,
    icon: 'i-lucide-package',
  },
])
</script>
