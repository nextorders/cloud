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

    <UContainer class="mt-32 md:mt-48 max-w-3xl">
      <UIcon name="i-lucide-book-marked" class="-mb-4 size-10 text-(--ui-text-dimmed)" />
      <ProseH3>Немного теории</ProseH3>

      <ProseP>
        Квоты представляют собой установленные ограничения на использование ресурсов платформы.
        При необходимости эти ограничения могут быть скорректированы после обращения в службу поддержки.
      </ProseP>
      <ProseP>
        Допустим, вы столкнулись с ситуацией, когда требуется создать дополнительное Пространство,
        но доступные квоты исчерпаны. В этом случае следует обратиться к специалистам поддержки с
        запросом об увеличении необходимых квот.
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
