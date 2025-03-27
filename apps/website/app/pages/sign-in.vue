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
              to="/api/auth/yandex"
              external
              icon="i-simple-icons:yandexcloud"
              size="xl"
              label="Войти через Яндекс"
              block
            />

            <UButton
              to="/api/auth/vk"
              external
              icon="i-simple-icons:vk"
              size="xl"
              label="Войти через ВКонтакте"
              block
            />

            <UButton
              to="/api/auth/github"
              external
              icon="i-simple-icons:github"
              size="xl"
              label="Войти через GitHub"
              block
            />

            <UButton
              to="/api/auth/twitch"
              external
              icon="i-simple-icons:twitch"
              size="xl"
              label="Войти через Twitch"
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
})

useHead({
  title: 'Войти в Кабинет',
})

const { loggedIn } = useUserSession()
if (loggedIn.value) {
  await navigateTo('/cabinet')
}
</script>
