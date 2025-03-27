<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
  middleware: ['01-auth'],
})
defineRouteRules({
  prerender: false,
  robots: false,
})

useHead({
  title: 'Кабинет',
})
</script>
