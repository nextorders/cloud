<template>
  <UCard>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 items-center">
        <UIcon
          v-if="tariff?.icon"
          :name="tariff.icon"
          class="size-10 text-(--ui-text-dimmed)"
        />

        <div>
          <h2 class="text-2xl leading-tight">
            {{ tariff?.name }}
          </h2>

          <p class="text-sm text-(--ui-text-muted)">
            Выбранный тариф
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { tariffId } = defineProps<{ tariffId: string }>()

const tariffStore = useTariffStore()
const tariff = tariffStore.findTariff(tariffId)
</script>
