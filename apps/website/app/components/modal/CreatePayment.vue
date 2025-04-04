<template>
  <UModal title="Создать платеж">
    <template #body>
      <FormCreatePayment
        :space-id="spaceId"
        @submitted="closeAll"
        @success="closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ spaceId: string }>()

const overlay = useOverlay()

function closeAll() {
  for (const o of overlay.overlays) {
    overlay.close(o.id)
  }
}
</script>
