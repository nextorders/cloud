<template>
  <UContainer>
    <UBreadcrumb :items="breadcrumbItems" class="mt-4" />

    <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-10">
      <div class="lg:col-span-8">
        <div class="mb-4 relative border-b border-default py-8">
          <div>
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted">
                {{ city?.title }}
              </h1>
            </div>
            <div class="text-lg text-pretty text-muted mt-4">
              {{ city?.slug }}
            </div>
          </div>
        </div>

        <CompanyUnitBlock
          v-for="unit in companyUnits"
          :key="unit.id"
          :company-unit="unit"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const { params } = useRoute('geo-slug___ru')

const companyStore = useCompanyStore()
const companyUnits = await companyStore.getUnitsByCitySlug(params.slug) ?? []

const cityStore = useCityStore()
const city = computed(() => cityStore.cities.find((city) => city.slug === params.slug))

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: city.value?.title,
    icon: 'i-lucide-map',
  },
])

useHead({
  title: city.value?.title,
})
</script>
