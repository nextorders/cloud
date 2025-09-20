<template>
  <header class="bg-(--ui-bg) border-b border-(--ui-border) sticky h-16 top-0 z-50">
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
const { isMobileMenuOpened, mainNavigationItems } = useApp()
</script>
