<template>
  <UPageHero
    orientation="vertical"
    :title="title"
    :description="description"
    :ui="{
      wrapper: 'lg:px-8',
    }"
  >
    <template #headline>
      <UBadge color="neutral" variant="soft">
        Открытый код
      </UBadge>
    </template>

    <div class="mx-auto">
      <AvatarRandomBlock />
    </div>
  </UPageHero>

  <UContainer>
    <div class="bg-elevated py-16 sm:py-24 lg:py-32 rounded-2xl">
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
            <USelect
              v-model="avatarState.emotion"
              :items="availableEmotions"
              size="xl"
              class="w-full"
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
    </div>
  </UContainer>

  <UPageSection
    orientation="horizontal"
    title="Где можно использовать"
    description="Никаких сложных настроек — просто вставьте ссылку и наслаждайтесь результатом. Вы можете легко настроить внешний вид аватара прямо через URL."
    :features="whoUsesFeatures"
  >
    <div class="flex flex-col gap-6">
      <AvatarUsageExample class="motion-preset-oscillate-sm motion-duration-3000" />
      <AvatarUsageExample class="self-end md:mr-[15%] motion-preset-wobble motion-duration-2000" />
      <AvatarUsageExample class="self-start md:ml-[15%] motion-preset-wiggle motion-preset-seesaw motion-duration-1000" />
    </div>
  </UPageSection>

  <UPageSection
    orientation="horizontal"
    reverse
    title="Нужно разместить у себя?"
    description="Без проблем, так как это open source проект. Библиотеку можно установить в свой проект из NPM."
    :links="[
      {
        label: 'Код на GitHub',
        to: 'https://github.com/nextorders/avatar',
        target: '_blank',
        icon: 'simple-icons:github',
        size: 'xl',
      },
    ]"
  >
    <div class="w-full h-full">
      <div class="p-4 h-full bg-elevated rounded-lg flex items-center justify-center">
        <p class="text-xl font-semibold">
          npm i @nextorders/avatar
        </p>
      </div>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
const { generateAvatar, generateSeed, getHref, availableClothing, availableGenders, availableEmotions } = useAvatar()

const avatarState = ref<AvatarState>({
  seed: '',
  emotion: '5',
  gender: 'male',
  clothing: 'amber',
})
const avatarHref = computed(() => getHref(avatarState.value))

watch(() => avatarState.value.seed, () => {
  if (!avatarState.value.seed) {
    avatarState.value.seed = generateSeed()
  }
})

function copyAvatarUrl() {
  navigator.clipboard.writeText(avatarHref.value)

  useToast().add({
    title: 'Ссылка скопирована',
    description: 'Теперь используйте ее в своем приложении!',
    icon: 'i-lucide-check',
    duration: 2000,
    color: 'success',
  })
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
    title: 'Системы управления клиентами (CRM)',
  },
  {
    icon: 'i-lucide-messages-square',
    title: 'Социальные сети и форумы',
  },
  {
    icon: 'i-lucide-gamepad-2',
    title: 'Игровые платформы',
  },
  {
    icon: 'i-lucide-factory',
    title: 'Корпоративные порталы',
  },
  {
    icon: 'i-lucide-panels-top-left',
    title: 'Веб-сервисы с регистрацией пользователей',
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
