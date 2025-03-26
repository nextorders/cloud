<template>
  <UDropdownMenu
    size="lg"
    :items="userMenuItems"
    :search-input="false"
    :content="{ side: 'top', align: 'center' }"
    :ui="{ content: 'w-64' }"
  >
    <UButton
      :avatar="{ src: user?.avatarUrl ?? undefined }"
      :ui="{ trailingIcon: 'text-(--ui-text-dimmed)' }"
      :label="user?.name"
      block
      color="neutral"
      variant="ghost"
      trailing-icon="i-lucide-ellipsis-vertical"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { user, clear, fetch: refreshSession } = useUserSession()
const colorMode = useColorMode()

async function signOut() {
  await clear()
  await refreshSession()
  await navigateTo('/')
}

const userMenuItems = computed(() => [
  {
    label: user.value?.name,
    type: 'label' as const,
    avatar: {
      src: user.value?.avatarUrl ?? undefined,
    },
  },
  {
    type: 'separator' as const,
  },
  {
    label: 'Тема',
    icon: 'i-lucide-sun-moon',
    children: [
      {
        label: 'Светлая',
        type: 'checkbox' as const,
        icon: 'i-lucide-sun',
        onUpdateChecked(checked: boolean) {
          if (checked) {
            colorMode.preference = 'light'
          }
        },
      },
      {
        label: 'Темная',
        type: 'checkbox' as const,
        icon: 'i-lucide-moon',
        onUpdateChecked(checked: boolean) {
          if (checked) {
            colorMode.preference = 'dark'
          }
        },
      },
    ],
  },
  {
    type: 'separator' as const,
  },
  {
    label: 'Выйти',
    type: 'link' as const,
    icon: 'i-lucide-log-out',
    onSelect: signOut,
  },
])
</script>
