<template>
  <UCard>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 items-center">
        <UIcon name="i-lucide-calendar-clock" class="size-10 text-(--ui-text-dimmed)" />

        <div>
          <h2 class="text-2xl font-semibold">
            {{ endDate }}
          </h2>

          <p class="text-sm text-(--ui-text-muted)">
            Дата окончания
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { tariffId, balance } = defineProps<{ tariffId: string, balance: number }>()

const tariffStore = useTariffStore()
const tariff = tariffStore.findTariff(tariffId)
const endDate = getEndDate(balance, tariff?.dailyCost ?? 0)
</script>
