<template>
  <UModal title="Добавить свой домен">
    <template #body>
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <p>Чтобы добавить домен к сервису, в качестве <b>A-записи домена</b> укажите IP-адрес:</p>
          <UButton
            color="neutral"
            variant="soft"
            block
            class="font-semibold text-lg"
            :label="space.cluster?.balancerIp"
            @click="copy(space.cluster?.balancerIp ?? '')"
          />

          <p>Управлять DNS-записями необходимо на стороне держателя NS-серверов или регистратора. Обновление данных обычно занимает от 15 минут до 3 часов.</p>
        </div>
        <FormCreateMainWebsiteUrl
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

const space = useSpaceStore()
const toast = useToast()

function copy(value: string) {
  navigator.clipboard.writeText(value)
  toast.add({
    title: 'Значение скопировано',
    duration: 2000,
  })
}
</script>
