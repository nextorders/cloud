<template>
  <UModal title="Привязать Telegram бота как получателя заявок">
    <template #body>
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <div class="mb-4 flex flex-row gap-2">
            <UButton
              to="https://t.me/next_order_bot"
              target="_blank"
              color="neutral"
              variant="solid"
              size="lg"
              icon="i-simple-icons:telegram"
              block
              label="@next_order_bot"
            />
            <UButton
              color="neutral"
              variant="subtle"
              size="lg"
              icon="i-lucide-copy"
              class="shrink-0 aspect-square justify-center"
              @click="copy('next_order_bot')"
            />
          </div>

          <p>Шаг 0: Если заявки должны поступать в группу, то вам необходимо сначала пригласить бота в эту группу.</p>
          <p>Шаг 1: Отправьте команду <b>/start</b> в чат или в чат группы. Бот пришлет код в ответ.</p>
          <p>Шаг 2: Скопируйте код в форму ниже.</p>
        </div>

        <FormCreateCheckoutReceiverTelegram
          :service-id="serviceId"
          @submitted="closeAll"
          @success="closeAll"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { UButton } from '#components'

defineProps<{ serviceId: string }>()

const overlay = useOverlay()

function closeAll() {
  for (const o of overlay.overlays) {
    overlay.close(o.id)
  }
}

const toast = useToast()

function copy(value: string) {
  navigator.clipboard.writeText(value)
  toast.add({
    title: 'Значение скопировано',
    duration: 2000,
  })
}
</script>
