<template>
  <CabinetActiveCard>
    <div class="flex flex-col gap-4 justify-between">
      <UIcon name="i-lucide-mail" class="size-8 text-dimmed" />

      <div class="flex flex-col gap-1">
        <div class="text-sm text-muted">
          <p v-if="status === 'inactive'" class="text-error">
            Необходимо подтвердить
          </p>
          <p v-else>
            Активный адрес
          </p>
        </div>
        <h3 class="text-xl font-semibold line-clamp-1">
          {{ email }}
        </h3>
      </div>
    </div>
  </CabinetActiveCard>
</template>

<script setup lang="ts">
import type { EmailStatus } from '@nextorders/database'

defineProps<{ email: string, status: EmailStatus }>()
</script>
