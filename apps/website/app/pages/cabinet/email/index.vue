<template>
  <CabinetHeader title="Электронная почта" />

  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CabinetEmailCard
        v-for="email in user.emails"
        :key="email.id"
        :email="email.value"
        :status="email.status"
      />

      <CabinetCreateEmailCard />
    </div>
  </CabinetContent>
</template>

<script setup lang="ts">
const user = useUserStore()
</script>
