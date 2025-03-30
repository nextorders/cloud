<template>
  <UCard variant="subtle">
    <div class="flex flex-col gap-4 justify-between">
      <UIcon :name="icon" class="size-8 text-(--ui-text-dimmed)" />

      <div>
        <div class="text-sm text-(--ui-text-muted) flex flex-row items-center gap-1.5">
          <p>{{ name }}</p>
        </div>
        <h3 class="text-2xl">
          {{ used }} из {{ limit }}
        </h3>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{ name: string, limit: number, used: number, icon: string }>()
</script>
