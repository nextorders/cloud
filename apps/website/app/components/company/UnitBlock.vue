<template>
  <div>
    <h2 class="text-2xl font-semibold">
      {{ city?.title }}
    </h2>

    <CompanyPointCard
      v-for="point in companyUnit.points"
      :key="point.id"
      :point="point"
    />
  </div>
</template>

<script setup lang="ts">
import type { CompanyUnit, Point } from '@nextorders/database'

const { companyUnit } = defineProps<{ companyUnit: CompanyUnit & { points: Point[] } }>()

const cityStore = useCityStore()

const city = computed(() => cityStore.cities.find((city) => city.id === companyUnit.cityId))
</script>
