<template>
  <UContainer>
    <UBreadcrumb :items="breadcrumbItems" class="mt-4" />

    <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-10">
      <div class="lg:col-span-8">
        <div class="mb-4 relative border-b border-default py-8">
          <div>
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted">
                {{ company?.title }}
              </h1>

              <div class="text-2xl font-semibold">
                {{ company.rating }}
              </div>
            </div>
            <div class="text-lg text-pretty text-muted mt-4">
              {{ company?.description }}
            </div>
          </div>
        </div>

        <CompanyUnitBlock
          v-for="unit in company.companyUnits"
          :key="unit.id"
          :company-unit="unit"
        />
      </div>

      <aside class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height) py-8 lg:ps-4 lg:-ms-4 lg:pe-6.5 lg:col-span-2">
        <UNavigationMenu orientation="vertical" :items="navigationItems" />
      </aside>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const { params } = useRoute('org-slug___ru')

const companyStore = useCompanyStore()
const company = await companyStore.getCompanyBySlug(params.slug)
if (!company) {
  throw createError({
    statusCode: 404,
    message: 'Компания не найдена',
  })
}

const navigationItems = ref([
  {
    label: 'Информация',
    icon: 'i-lucide-book-open',
  },
  {
    label: 'Отзывы',
    icon: 'i-lucide-star',
  },
  {
    label: 'Контакты',
    icon: 'i-lucide-phone',
  },
  {
    label: 'Вопросы и ответы',
    icon: 'i-lucide-help-circle',
  },
  {
    label: 'Франшиза',
    icon: 'i-lucide-briefcase',
  },
])

const breadcrumbItems = ref<BreadcrumbItem[]>([
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Компании',
    icon: 'i-lucide-building-2',
    to: '/org',
  },
  {
    label: company.title,
    icon: 'i-lucide-layers-2',
  },
])

useHead({
  title: company?.title,
  meta: [
    {
      name: 'description',
      content: company?.description,
    },
  ],
})
</script>
