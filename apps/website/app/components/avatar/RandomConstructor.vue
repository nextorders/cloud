<template>
  <UContainer>
    <div class="relative bg-elevated py-16 sm:py-24 rounded-2xl">
      <h2 class="pb-6 md:pb-12 text-center text-3xl sm:text-4xl lg:text-5xl text-pretty text-primary font-bold">
        Онлайн генератор аватара
      </h2>

      <div class="px-4 mx-auto max-w-sm flex flex-col flex-wrap gap-x-6 gap-y-6 justify-center">
        <div class="relative w-full mx-auto group/avatar">
          <img
            v-if="avatarHref"
            :src="avatarHref"
            alt=""
            class="w-full aspect-square rounded-xl motion-preset-slide-down"
          >

          <div class="opacity-0 group-hover/avatar:opacity-100 bg-primary/50 rounded-xl duration-200 absolute inset-0 p-4 flex flex-col gap-2 justify-end">
            <div class="p-4 bg-default rounded-xl flex flex-col gap-2 justify-end">
              <UButton
                color="neutral"
                variant="solid"
                size="xl"
                icon="i-lucide-copy"
                label="Скопировать URL"
                class="w-full justify-center"
                @click="copyAvatarUrl()"
              />

              <UButton
                color="neutral"
                variant="subtle"
                size="lg"
                icon="i-lucide-external-link"
                label="Открыть"
                class="w-full justify-center"
                @click="openAvatar()"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <UButton
            color="primary"
            variant="solid"
            size="xl"
            icon="i-lucide-dices"
            class="w-full justify-center"
            label="Полный рандом"
            @click="handleFullReset()"
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
</template>

<script setup lang="ts">
const { generateAvatar, generateSeed, getHref, availableClothing, availableGenders, availableEmotions } = useAvatar()

const avatarState = ref<AvatarState>({
  seed: '',
  emotion: '5',
  gender: 'male',
  clothing: 'amber',
})
const avatarHref = computed<string>(() => getHref(avatarState.value))

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

function openAvatar() {
  window.open(avatarHref.value, '_blank')
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
</script>
