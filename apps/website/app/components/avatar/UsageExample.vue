<template>
  <div v-if="avatarState?.seed" class="px-6 py-4 w-fit h-auto rounded-lg border border-default motion-preset-slide-left">
    <div class="flex flex-row items-center gap-4">
      <img
        :src="avatarState?.href"
        alt=""
        class="size-18 rounded-full"
      >

      <div>
        <h4 class="text-lg md:text-xl font-semibold">
          Важный клиент
        </h4>
        <p class="text-muted">
          Оценил на <span class="font-medium">{{ rating }} из 5</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { generateAvatar } = useAvatar()

const avatarState = ref<AvatarOptions>()

const rating = computed(() => avatarState.value?.emotion ? Math.round(avatarState.value?.emotion / 2) : 1)

onMounted(() => {
  avatarState.value = generateAvatar()
})
</script>
