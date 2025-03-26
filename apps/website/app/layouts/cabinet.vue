<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <div class="hidden lg:flex flex-col min-h-svh min-w-16 w-72 border-r border-(--ui-border) shrink-0 bg-(--ui-bg-elevated)/25">
      <CabinetNavigationHeader class="h-16" />
      <CabinetNavigation />
    </div>

    <main class="flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) flex-1">
      <slot />
    </main>
  </div>

  <USlideover
    v-model:open="isMobileMenuOpened"
    side="left"
  >
    <template #header>
      <div class="flex flex-row items-center">
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          @click="isMobileMenuOpened = false"
        />

        <CabinetNavigationHeader />
      </div>
    </template>

    <template #body>
      <CabinetNavigation />
    </template>
  </USlideover>
</template>

<script setup lang="ts">
const { isMobileMenuOpened } = useApp()
</script>
