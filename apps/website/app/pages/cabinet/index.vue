<template>
  <CabinetHeader title="Кабинет" />

  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="member in user.memberInSpaces"
        :key="member.space.id"
        :to="`/cabinet/space/${member.space.id}`"
      >
        <CabinetSpaceCard
          :name="member.space.name"
          :tariff-id="member.space.tariffId"
          :balance="member.space.balance"
          :members="member.space.members"
        />
      </NuxtLink>
      <CabinetCreateSpaceCard v-if="canCreateNewSpace" />
    </div>

    <UContainer class="mt-32 md:mt-48 max-w-3xl">
      <UIcon name="i-lucide-book-marked" class="-mb-4 size-10 text-(--ui-text-dimmed)" />
      <ProseH3>Немного теории</ProseH3>

      <ProseP>
        Пространство – это изолированная среда, в которой разворачиваются все
        связанные сервисы. Затраты Пространства привязаны к выбранному тарифу.
      </ProseP>
    </UContainer>
  </CabinetContent>
</template>

<script setup lang="ts">
const user = useUserStore()
const ownedSpacesQuota = computed(() => user.quotas.find((q) => q.key === 'owned_spaces'))
const canCreateNewSpace = computed<boolean>(() => ownedSpacesQuota.value !== undefined && ownedSpacesQuota.value.used < ownedSpacesQuota.value.limit)
</script>
