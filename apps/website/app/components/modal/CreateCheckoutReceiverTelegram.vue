<template>
  <UModal title="Привязать Telegram чат">
    <template #body>
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <p>Тут будет инструкция.</p>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ serviceId: string }>()
</script>
