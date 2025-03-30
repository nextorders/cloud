<template>
  <CabinetHeader title="Квоты" />

  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CabinetQuotaCard
        v-for="quota in user.quotas"
        :key="quota.name"
        :name="quota.name"
        :limit="quota.limit"
        :used="quota.used"
        :icon="quota.icon"
      />
    </div>

    <UContainer class="mt-32 max-w-xl text-center">
      <UIcon name="i-lucide-book-marked" class="-mb-4 size-10 text-(--ui-text-dimmed)" />
      <ProseH3>Немного теории</ProseH3>

      <ProseP>
        Квоты – организационные ограничения, которые можно изменить по запросу в техническую поддержку.
        Например, если вам нужно создать еще одно Пространство, но у вас нет доступных квот. Обратитесь
        в поддержку, расскажите какие потребляемые квоты нужно увеличить и на сколько.
      </ProseP>
    </UContainer>
  </CabinetContent>
</template>

<script setup lang="ts">
useHead({
  title: 'Квоты',
})

const user = useUserStore()
</script>
