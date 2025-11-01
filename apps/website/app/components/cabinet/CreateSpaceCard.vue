<template>
  <div class="flex flex-col gap-4 justify-center items-center h-full min-h-48 border-2 border-default border-dashed rounded-xl">
    <UIcon name="i-lucide-copy-plus" class="size-10 text-dimmed" />

    <UButton
      size="md"
      color="neutral"
      variant="subtle"
      label="Создать Пространство"
      @click="modalCreateSpace.open()"
    />
  </div>
</template>

<script setup lang="ts">
import { ModalCreateSpace } from '#components'

const overlay = useOverlay()
const modalCreateSpace = overlay.create(ModalCreateSpace)
</script>
