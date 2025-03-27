<template>
  <CabinetHeader title="Кабинет" />

  {{ user.spaces }}
</template>

<script setup lang="ts">
const user = useUserStore()
</script>
