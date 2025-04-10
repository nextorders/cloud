<template>
  <UModal title="Добавить Email">
    <template #body>
      <div class="space-y-4">
        <div class="flex flex-row gap-3 flex-nowrap items-center">
          <UIcon name="i-lucide-mail-warning" class="size-8 shrink-0 text-(--ui-text-dimmed)" />
          <p>На указанный электронный адрес придет письмо с ссылкой. Перейдите по ней для подтверждения.</p>
        </div>
        <FormCreateEmail @submitted="closeAll" @success="closeAll" />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const overlay = useOverlay()

function closeAll() {
  for (const o of overlay.overlays) {
    overlay.close(o.id)
  }
}
</script>
