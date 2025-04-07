<template>
  <CabinetContent>
    <div class="max-w-md">
      <CabinetSpaceTariffCard v-if="space.tariffId" :tariff-id="space.tariffId" />
    </div>
  </CabinetContent>
</template>

<script lang="ts" setup>
const space = useSpaceStore()
</script>
