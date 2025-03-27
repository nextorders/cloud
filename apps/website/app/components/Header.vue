<template>
  <header class="bg-(--ui-bg)/85 backdrop-blur border-b border-(--ui-border) sticky h-16 top-0 z-50">
    <UContainer class="flex items-center justify-between gap-3 h-full">
      <div class="lg:flex-1 flex items-center gap-1.5">
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
          size="xl"
          class="visible lg:hidden"
          @click="isMobileMenuOpened = true"
        />

        <Logo />
      </div>

      <div class="hidden lg:flex">
        <UNavigationMenu
          :items="mainNavigationItems"
          variant="link"
        />
      </div>

      <div class="flex items-center justify-end lg:flex-1 gap-2.5">
        <div class="hidden lg:flex items-center justify-end lg:flex-1 gap-1.5">
          <ColorModeToggle />
          <GithubButton />
        </div>

        <USkeleton
          v-if="!ready"
          class="size-9 rounded-full"
        />
        <template v-else>
          <UButton
            v-if="!loggedIn"
            to="/sign-in"
            size="lg"
          >
            Войти
          </UButton>
          <UDropdownMenu
            v-else
            :items="userMenuItems"
            :ui="{
              content: 'w-56',
            }"
          >
            <UAvatar
              :src="user?.avatarUrl ?? undefined"
              :alt="user?.name"
              size="lg"
              class="cursor-pointer hover:scale-95 duration-200"
            />
          </UDropdownMenu>
        </template>
      </div>
    </UContainer>
  </header>

  <USlideover
    v-model:open="isMobileMenuOpened"
    side="left"
  >
    <template #header>
      <div class="flex flex-row items-center">
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="outline"
          size="xl"
          @click="isMobileMenuOpened = false"
        />
      </div>
    </template>

    <template #body>
      <Navigation />
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { isMobileMenuOpened, mainNavigationItems } = useApp()
const { user, loggedIn, ready, clear: signOut } = useUserSession()

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: user.value?.name,
      avatar: {
        src: user.value?.avatarUrl ?? undefined,
      },
      type: 'label' as const,
    },
    {
      label: user.value?.email,
      icon: 'i-lucide-mail',
      type: 'link' as const,
    },
    {
      label: 'Кабинет',
      icon: 'i-lucide-briefcase-business',
      to: '/cabinet',
      type: 'link' as const,
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: async () => {
        await signOut()
        await navigateTo('/')
      },
    },
  ],
])
</script>
