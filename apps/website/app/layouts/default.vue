<template>
  <Header />

  <slot />

  <Footer />

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
const { isMobileMenuOpened } = useApp()
</script>
