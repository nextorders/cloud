<template>
  <h2 :id="id" class="relative text-2xl text-(--ui-text-highlighted) font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a]:focus-visible:outline-(--ui-primary) [&>a>code]:border-dashed hover:[&>a>code]:border-(--ui-primary) hover:[&>a>code]:text-(--ui-primary) [&>a>code]:text-xl/7 [&>a>code]:font-bold">
    <slot />
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>()
</script>
