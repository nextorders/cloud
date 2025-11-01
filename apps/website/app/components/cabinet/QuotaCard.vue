<template>
  <UCard variant="subtle">
    <div class="flex flex-col gap-4 justify-between">
      <UIcon :name="icon" class="size-8 text-dimmed" />

      <div class="flex flex-col gap-1">
        <div class="text-sm text-muted">
          {{ name }}
        </div>
        <h3 class="text-xl font-semibold line-clamp-1">
          {{ used }} из {{ limit }}
        </h3>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{ name: string, limit: number, used: number, icon: string }>()
</script>
