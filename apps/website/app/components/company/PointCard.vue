<template>
  <div class="p-4 border border-default rounded-lg">
    {{ point.address }}
  </div>
</template>

<script setup lang="ts">
import type { Point } from '@nextorders/database'

defineProps<{ point: Point }>()
</script>
