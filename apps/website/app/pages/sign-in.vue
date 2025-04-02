<template>
  <div class="w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-2">
    <div class="hidden lg:block bg-contain" style="background-image: url('/img/bg-pattern-1.jpg')" />

    <div class="my-4 flex flex-col justify-between items-center">
      <div class="flex-grow flex flex-col justify-center items-center">
        <UContainer class="md:min-w-sm">
          <h1 class="mb-10 text-2xl font-semibold text-center">
            Мы вас заждались!
          </h1>

          <div class="flex flex-col gap-2">
            <UButton
              v-for="provider in providers"
              :key="provider.name"
              :to="`/api/auth/${provider.name}`"
              :icon="provider.icon"
              :label="provider.label"
              size="xl"
              external
              block
            />
          </div>
        </UContainer>
      </div>

      <ColorModeToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['02-guest-only'],
})

useHead({
  title: 'Вход в Кабинет',
})

const providers = ref([
  {
    name: 'yandex',
    icon: 'i-simple-icons:yandexcloud',
    label: 'Войти через Яндекс',
  },
  {
    name: 'vk',
    icon: 'i-simple-icons:vk',
    label: 'Войти через ВКонтакте',
  },
  {
    name: 'github',
    icon: 'i-simple-icons:github',
    label: 'Войти через GitHub',
  },
  {
    name: 'twitch',
    icon: 'i-simple-icons:twitch',
    label: 'Войти через Twitch',
  },
])
</script>
