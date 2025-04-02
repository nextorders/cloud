<template>
  <CabinetContent>
    <div class="max-w-md">
      <CabinetSpaceTariffCard v-if="space?.tariffId" :tariff-id="space.tariffId" />
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
