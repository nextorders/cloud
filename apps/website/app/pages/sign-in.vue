<template>
  <div class="w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-2">
    <div class="hidden lg:block bg-contain" style="background-image: url('/img/bg-pattern-1.jpg')" />

    <div class="my-4 flex flex-col justify-between items-center">
      <div class="flex-grow flex flex-col justify-center items-center">
        <UContainer>
          <h1 class="mb-10 text-2xl font-semibold text-center">
            Мы вас заждались!
          </h1>

          <div class="mx-auto max-w-[260px]">
            <form class="space-y-4" @submit="signIn()">
              123
            </form>
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

const { user, fetch: refreshSession } = useUserSession()
if (user.value?.id) {
  await navigateTo('/')
}

const toast = useToast()

const { execute: signIn } = await useFetch('/api/auth/sign-in', {
  method: 'POST',
  body: {},
  immediate: false,
  watch: false,
  onResponse: async ({ response }) => {
    if (response.ok) {
      await refreshSession()
      await navigateTo('/')
    }
  },
  onResponseError: async ({ response }) => {
    toast.add({
      title: 'Error',
      description: response.statusText,
    })
  },
})
</script>
