<template>
  <UContainer class="flex flex-col py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24 text-center">
    <div>
      <template v-if="$slots.top">
        <slot name="top" />
      </template>

      <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted)">
        {{ title }}
      </h1>
      <p class="text-lg sm:text-xl/8 text-(--ui-text-muted) text-balance mt-6">
        {{ description }}
      </p>

      <template v-if="$slots.bottom">
        <slot name="bottom" />
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
defineProps<{ title: string, description: string }>()
</script>
