<template>
  <div class="relative grid rounded-[calc(var(--ui-radius)*2.5)] p-6 lg:p-8 xl:p-10 gap-6 bg-(--ui-bg) ring ring-inset ring-(--ui-border)" :class="{ 'ring-2 ring-inset ring-(--ui-primary)': highlight, 'lg:scale-[1.1] lg:z-[1]': scale }">
    <div class="flex flex-col min-w-0">
      <div class="flex items-center gap-3">
        <div class="text-(--ui-text-highlighted) text-2xl sm:text-3xl text-pretty font-semibold">
          {{ title }}
        </div>
      </div>
      <div class="text-base text-pretty mt-2 text-(--ui-text-muted)">
        {{ description }}
      </div>
      <div class="flex items-center gap-1 mt-6">
        <div class="text-(--ui-text-highlighted) text-3xl sm:text-4xl font-semibold">
          {{ price }}
        </div>
        <div class="flex flex-col justify-between min-w-0">
          <span class="text-(--ui-text-muted) truncate text-xs font-medium">&nbsp;</span>
          <span class="text-(--ui-text-muted) truncate text-xs font-medium">{{ billingCycle }}</span>
        </div>
      </div>
      <ul class="flex flex-col gap-3 flex-1 mt-6 grow-0">
        <li
          v-for="feature in features"
          :key="feature"
          class="flex items-center gap-2 min-w-0"
        >
          <UIcon name="lucide:circle-check" class="size-5 shrink-0 text-(--ui-primary)" />
          <span class="text-sm truncate text-(--ui-text-muted)">{{ feature }}</span>
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-6 items-center justify-end">
      <UButton
        color="neutral"
        :variant="highlight ? 'solid' : 'subtle'"
        size="lg"
        block
        :label="button.label"
        :to="button.to"
        target="_blank"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  price: string
  billingCycle: string
  features: string[]
  button: {
    label: string
    to?: string
  }
  highlight?: boolean
  scale?: boolean
}>()
</script>
