<template>
  <Page v-if="page">
    <PageHeader
      :title="page.title"
      :description="page.description"
    />

    <div>
      <ContentRenderer v-if="page?.body" :value="page" />

      <USeparator v-if="surround?.length" />
    </div>
  </Page>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  })
})

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})
</script>
