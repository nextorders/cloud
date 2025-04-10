<template>
  <UModal title="Создать Email получателя заявок">
    <template #body>
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <p>На указанный электронный адрес будут приходить письма с заявками от клиентов.</p>
        </div>
        <FormCreateCheckoutReceiverEmail
          :service-id="serviceId"
          @submitted="closeAll"
          @success="closeAll"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ serviceId: string }>()

const overlay = useOverlay()

function closeAll() {
  for (const o of overlay.overlays) {
    overlay.close(o.id)
  }
}
</script>
