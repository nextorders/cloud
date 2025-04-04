<template>
  <div v-confetti="{ stageHeight: height, stageWidth: width, particleCount: 200, duration: 5000 }" class="block w-full mx-auto" />
</template>

<script setup lang="ts">
import { vConfetti } from '@neoconfetti/vue'

const { width, height } = useWindowSize()
</script>
