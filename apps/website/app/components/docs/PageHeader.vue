<template>
  <div class="relative border-b border-default py-8">
    <div>
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted">
          {{ title }}
        </h1>
      </div>
      <div class="text-lg text-pretty text-muted mt-4">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
