<template>
  <div class="grid grid-cols-3 gap-6 min-h-32">
    <div v-for="avatar in avatarsState" :key="avatar.seed">
      <img
        :src="getHref(avatar)"
        alt=""
        class="h-18 md:h-32 aspect-square rounded-2xl motion-preset-slide-down motion-preset-pop"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const { generateAvatar, getHref } = useAvatar()

const avatarsState = ref<AvatarState[]>([])

onMounted(() => {
  setInterval(() => {
    if (avatarsState.value.length < 3) {
      // Create new avatar
      avatarsState.value.push(generateAvatar())
      return
    }

    // Change random avatar
    avatarsState.value[getRandInteger(0, avatarsState.value.length - 1)] = generateAvatar()
  }, 2500)
})
</script>
