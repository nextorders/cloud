<template>
  <CabinetHeader title="Кабинет" />

  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CabinetSpaceCard
        v-for="space in user.spaces"
        :key="space.id"
        :name="space.name"
        :tariff-id="space.tariffId"
        :members="space.members"
      />
      <CabinetCreateSpaceCard />
    </div>
  </CabinetContent>
</template>

<script setup lang="ts">
const user = useUserStore()
</script>
