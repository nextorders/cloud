<template>
  <h2 :id="props.id" class="relative text-2xl text-(--ui-text-highlighted) font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a]:focus-visible:outline-(--ui-primary) [&>a>code]:border-dashed hover:[&>a>code]:border-(--ui-primary) hover:[&>a>code]:text-(--ui-primary) [&>a>code]:text-xl/7 [&>a>code]:font-bold">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>
