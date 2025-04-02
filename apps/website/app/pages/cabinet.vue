<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
  middleware: ['01-auth-only'],
})

useHead({
  title: 'Кабинет',
})
</script>
