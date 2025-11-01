<template>
  <div class="flex flex-col gap-4 justify-center items-center h-full min-h-36 border-2 border-default border-dashed rounded-xl">
    <UIcon name="i-lucide-mail-plus" class="size-10 text-dimmed" />

    <UButton
      size="md"
      color="neutral"
      variant="subtle"
      label="Добавить Email"
      @click="modalCreateEmail.open()"
    />
  </div>
</template>

<script setup lang="ts">
import { ModalCreateEmail } from '#components'

const overlay = useOverlay()
const modalCreateEmail = overlay.create(ModalCreateEmail)
</script>
