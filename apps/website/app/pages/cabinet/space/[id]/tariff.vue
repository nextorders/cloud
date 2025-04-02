<template>
  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      <CabinetSpaceTariffCard :tariff-id="space?.tariffId ?? ''" />
    </div>
  </CabinetContent>
</template>

<script lang="ts" setup>
const { params } = useRoute('cabinet-space-id-tariff___en')

const { data: space, error } = await useFetch(`/api/space/${params.id}`)
if (error.value) {
  await navigateTo('/cabinet')
}
</script>
