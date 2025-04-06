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
definePageMeta({
  validate: (route) => {
    const params = route.params as { id: string }
    const id = params.id
    if (typeof id !== 'string') {
      return false
    }
    const { error } = useFetch(`/api/space/${id}`)
    return !error.value
  },
})

const { params } = useRoute('cabinet-space-id___en')

const { data: space, error } = await useFetch(`/api/space/${params.id}`)
if (error.value) {
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
    badge: space.value?.balance ? `${space.value?.balance} ₽` : undefined,
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
