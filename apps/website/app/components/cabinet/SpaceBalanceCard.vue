<template>
  <UCard variant="outline">
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 items-center">
        <UIcon name="i-lucide-wallet" class="size-10 text-dimmed" />

        <div>
          <h2 class="text-2xl font-semibold">
            {{ balance }} ₽
          </h2>

          <p class="text-sm text-muted">
            Активный баланс
          </p>
        </div>
      </div>

      <UButton
        color="neutral"
        variant="solid"
        block
        @click="modalCreatePayment.open({ spaceId })"
      >
        Пополнить
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ModalCreatePayment } from '#components'

defineProps<{ balance: number, spaceId: string }>()

const overlay = useOverlay()
const modalCreatePayment = overlay.create(ModalCreatePayment)
</script>
