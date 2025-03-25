<template>
  <div class="flex flex-col gap-4 flex-1 overflow-y-auto py-2">
    <UNavigationMenu
      :items="mainNavigationItems"
      orientation="vertical"
    />
  </div>

  <div class="shrink-0 flex items-center gap-1.5 py-2 px-2">
    <ColorModeToggle />
    <GithubButton />
  </div>
</template>

<script setup lang="ts">
const { mainNavigationItems } = useApp()
</script>
