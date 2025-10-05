<template>
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
