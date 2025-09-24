<template>
  <UContainer class="flex flex-col py-24 sm:py-32 lg:py-40 gap-4 text-center">
    <template v-if="$slots.top">
      <slot name="top" />
    </template>

    <div>
      <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted wrap-break-word">
        {{ title }}
      </h1>
      <p class="text-lg sm:text-xl/8 text-text-muted text-balance mt-6">
        {{ description }}
      </p>
    </div>

    <template v-if="$slots.bottom">
      <slot name="bottom" />
    </template>
  </UContainer>
</template>

<script setup lang="ts">
defineProps<{ title: string, description: string }>()
</script>
