<template>
  <CabinetHeader title="Кабинет" />

  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CabinetSpaceCard
        v-for="member in user.memberInSpaces"
        :key="member.space.id"
        :name="member.space.name"
        :tariff-id="member.space.tariffId"
        :balance="member.space.balance"
        :members="member.space.members"
      />
      <CabinetCreateSpaceCard />
    </div>

    <UContainer class="mt-32 max-w-xl text-center">
      <UIcon name="i-lucide-book-marked" class="-mb-4 size-10 text-(--ui-text-dimmed)" />
      <ProseH3>Немного теории</ProseH3>

      <ProseP>
        Пространство – это изолированная среда, в которой разворачивается все
        связанное программное обеспечение. Затраты пространства привязаны к выбранному тарифу.
      </ProseP>
    </UContainer>
  </CabinetContent>
</template>

<script setup lang="ts">
const user = useUserStore()
</script>
