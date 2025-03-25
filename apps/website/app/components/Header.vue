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

        <UButton
          v-if="!loggedIn"
          to="/sign-in"
          size="lg"
        >
          Войти
        </UButton>
        <div v-else>
          {{ user }}
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const { isMobileMenuOpened, mainNavigationItems } = useApp()
const { user, loggedIn } = useUserSession()
</script>
