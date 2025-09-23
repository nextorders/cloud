<template>
  <PageHeader
    :title="title"
    :description="description"
  >
    <template #top>
      <div class="mb-4 font-semibold text-(--ui-primary) flex items-center justify-center gap-1.5">
        <UBadge color="neutral" variant="soft">
          Открытый код
        </UBadge>
      </div>
    </template>

    <template #bottom>
      <div class="mt-10 mx-auto min-w-sm max-w-sm flex flex-col flex-wrap gap-x-6 gap-y-6 justify-center">
        <div class="mx-auto size-2/3">
          <img
            v-if="avatarHref && avatarState.seed"
            :src="avatarHref"
            alt=""
            class="shrink-0 aspect-square rounded-2xl motion-preset-slide-down"
          >
        </div>

        <div class="grid grid-cols-2 gap-2">
          <UButton
            color="neutral"
            variant="subtle"
            size="lg"
            icon="i-lucide-dices"
            class="justify-center"
            label="Рандом"
            @click="generate()"
          />

          <UButton
            color="neutral"
            variant="solid"
            size="lg"
            icon="i-lucide-copy"
            label="Скопировать"
            class="justify-center"
            @click="copyAvatarUrl()"
          />
        </div>

        <div class="flex flex-col gap-4">
          <UFormField
            v-if="avatarState?.seed"
            label="Любой идентификатор"
            hint="Id, токен, сид и т.п."
            name="seed"
            required
          >
            <UInput
              v-model="avatarState.seed"
              placeholder="Обязательно"
              size="xl"
              class="w-full"
              :ui="{ trailing: 'pr-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="xl"
                  icon="i-lucide-dices"
                  aria-label="Generate Seed"
                  @click="generateSeed()"
                />
              </template>
            </UInput>
          </UFormField>

          <UFormField
            v-if="avatarState?.emotion"
            label="Уровень настроения"
            hint="От 1 до 10"
            name="emotion"
          >
            <USlider
              v-model="avatarState.emotion"
              :min="1"
              :max="10"
            />
          </UFormField>

          <UFormField
            v-if="avatarState?.gender"
            label="Пол"
            hint="Мужской или женский"
            name="gender"
          >
            <USelect
              v-model="avatarState.gender"
              :items="availableGenders"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField
            v-if="avatarState?.clothing"
            label="Одежда"
            hint="Цветовая гамма"
            name="clothing"
          >
            <USelect
              v-model="avatarState.clothing"
              :items="availableClothing"
              size="xl"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>
    </template>
  </PageHeader>

  <UContainer class="mt-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 lg:grid-cols-2 lg:items-center">
    <div>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted">
        Где можно использовать
      </h2>
      <p class="text-base sm:text-lg text-muted text-pretty mt-6">
        Никаких сложных настроек — просто вставьте ссылку и наслаждайтесь результатом. Вы можете легко настроить внешний вид аватара прямо через URL.
      </p>

      <ul class="mt-8 grid gap-4">
        <li
          v-for="feature in whoUsesFeatures"
          :key="feature.label"
          class="relative flex items-start gap-2.5"
        >
          <div class="inline-flex items-center justify-center p-0.5">
            <UIcon :name="feature.icon" class="size-6 text-primary" />
          </div>
          <div>{{ feature.label }}</div>
        </li>
      </ul>
    </div>

    <NuxtImg
      src="/img/avatar-example.jpg"
      format="webp"
      densities="x1 x2"
      alt="Пример использования аватаров"
      class="w-full h-auto rounded-lg motion-preset-slide-left"
    />
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const hostUrl = 'https://avatar.nextorders.ru'

type State = {
  seed: string
  emotion: number
  gender: string
  clothing: string
}

const avatarState = ref<State>({
  seed: '',
  emotion: 5,
  gender: 'male',
  clothing: 'amber',
})
const avatarHref = computed<string>(() => {
  if (!avatarState.value?.seed) {
    generateSeed()
  }

  const url = new URL(`/${avatarState.value.seed}`, hostUrl)

  url.searchParams.set('emotion', avatarState.value?.emotion.toString())
  url.searchParams.set('gender', avatarState.value?.gender)
  url.searchParams.set('clothing', avatarState.value?.clothing)

  return url.href
})

function generate() {
  generateSeed()
  avatarState.value.emotion = getRandInteger(1, 10)
  avatarState.value.gender = getRandInteger(0, 1) === 0 ? 'male' : 'female'
  avatarState.value.clothing = getRandomClothing()
}

function generateSeed() {
  avatarState.value.seed = getRandomSeed()
}

const availableGenders = ['male', 'female']
const availableClothing = ['teal', 'amber', 'green', 'blue', 'pink', 'violet']

function getRandomClothing() {
  return availableClothing[getRandInteger(0, availableClothing.length - 1)] ?? 'amber'
}

function getRandomSeed() {
  return getRandInteger(100000, 1000000).toString()
}

function copyAvatarUrl() {
  navigator.clipboard.writeText(avatarHref.value)
}

onMounted(() => {
  generate()
})

const whoUsesFeatures = [
  {
    icon: 'i-lucide-users-round',
    label: 'Системы управления клиентами (CRM)',
  },
  {
    icon: 'i-lucide-messages-square',
    label: 'Социальные сети и форумы',
  },
  {
    icon: 'i-lucide-gamepad-2',
    label: 'Игровые платформы',
  },
  {
    icon: 'i-lucide-factory',
    label: 'Корпоративные порталы',
  },
  {
    icon: 'i-lucide-panels-top-left',
    label: 'Веб-сервисы с регистрацией пользователей',
  },
]

const title = 'Персонализированные аватары в один клик'
const description = 'Удобный сервис для генерации персонализированных SVG-аватаров по уникальному URL. Больше не нужно хранить изображения в базе данных — просто используйте ссылку для отображения аватара в вашем приложении или на сайте.'

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
})
</script>
