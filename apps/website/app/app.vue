<template>
  <UApp :locale="locales[locale]" :tooltip="{ delayDuration: 0 }">
    <NuxtLoadingIndicator :color="false" class="bg-primary h-0.5" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Metric />
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useSeoMeta({
  ogImage: '/og-image.png',
  twitterImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  htmlAttrs: {
    lang,
    dir,
  },
})

const tariff = useTariffStore()

onMounted(async () => {
  await Promise.all([
    tariff.update(),
  ])
})
</script>
