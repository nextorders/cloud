<template>
  <PageHeader
    :title="title"
    :description="description"
  >
    <template #top>
      <div class="mb-4 font-semibold text-primary flex items-center justify-center gap-1.5">
        <UBadge color="neutral" variant="soft">
          Открытый код
        </UBadge>
      </div>
    </template>

    <template #bottom>
      <div class="mt-10 mx-auto">
        <AvatarRandomBlock />
      </div>
    </template>
  </PageHeader>

  <UContainer class="bg-elevated py-16 sm:py-24 lg:py-32 rounded-2xl">
    <div class="mx-auto max-w-sm flex flex-col flex-wrap gap-x-6 gap-y-6 justify-center">
      <div class="mx-auto size-2/3">
        <img
          v-if="avatarHref"
          :src="avatarHref"
          alt=""
          class="aspect-square rounded-2xl motion-preset-slide-down"
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <UButton
          color="primary"
          variant="soft"
          size="lg"
          icon="i-lucide-dices"
          class="justify-center"
          label="Рандом"
          @click="handleFullReset()"
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
                @click="handleSeedReset()"
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
            color="secondary"
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
  </UContainer>

  <UContainer class="mt-0 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 lg:grid-cols-2 lg:items-center">
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

    <div class="flex flex-col gap-6">
      <AvatarUsageExample class="motion-preset-oscillate-sm motion-duration-3000" />
      <AvatarUsageExample class="self-end md:mr-[15%] motion-preset-wobble motion-duration-2000" />
      <AvatarUsageExample class="self-start md:ml-[15%] motion-preset-wiggle motion-preset-seesaw motion-duration-1000" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const { generateAvatar, generateSeed, getHref, availableClothing, availableGenders } = useAvatar()

const avatarState = ref<AvatarOptions>({
  seed: '',
  emotion: 5,
  gender: 'male',
  clothing: 'amber',
  href: '',
})
const avatarHref = computed(() => getHref(avatarState.value))

function copyAvatarUrl() {
  navigator.clipboard.writeText(avatarState.value.href)
}

function handleFullReset() {
  avatarState.value = generateAvatar()
}

function handleSeedReset() {
  avatarState.value.seed = generateSeed()
}

onMounted(() => {
  avatarState.value = generateAvatar()
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
