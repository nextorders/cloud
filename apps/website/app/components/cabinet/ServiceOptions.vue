<template>
  <UCard variant="subtle" class="rounded-xl">
    <div class="flex flex-col gap-6">
      <div v-if="buttons.length" class="flex flex-row gap-2.5">
        <UButton
          v-for="button in buttons"
          :key="button.label"
          :icon="button.icon"
          :label="button.label"
          color="neutral"
          variant="solid"
          size="lg"
          @click="button.onClick"
        />
      </div>

      <div
        v-for="option in optionsWithValue"
        :key="option.id"
        class="flex flex-col gap-2"
      >
        <div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-sm font-semibold">
              {{ getServiceOptionData(option.key as ServiceOptionKey)?.title }}
            </div>
            <UBadge
              v-if="option.status === 'on_moderation'"
              color="info"
              size="sm"
            >
              На модерации
            </UBadge>
          </div>
          <p class="text-sm">
            {{ getServiceOptionData(option.key as ServiceOptionKey)?.description }}
          </p>
        </div>

        <UInput
          :value="option.value"
          :ui="{ trailing: 'pr-1.5' }"
          :type="option.type === 'secret' ? 'password' : 'text'"
          size="lg"
        >
          <template #trailing>
            <div class="flex gap-1">
              <UTooltip
                v-if="option.type === 'string' || option.type === 'link'"
                :content="{ side: 'right' }"
                text="Скопировать"
              >
                <UButton
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  icon="i-lucide-copy"
                  @click="copy(option.value as string)"
                />
              </UTooltip>
              <UTooltip
                v-if="option.type === 'link'"
                :content="{ side: 'right' }"
                text="Открыть в новом окне"
              >
                <UButton
                  :to="option.value as string"
                  target="_blank"
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  icon="i-lucide-external-link"
                />
              </UTooltip>
            </div>
          </template>
        </UInput>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { ServiceOptionKey } from '@nextorders/database'
import { ModalCreateCheckoutReceiverEmail, ModalCreateCheckoutReceiverTelegram, ModalCreateMainWebsiteUrl } from '#components'
import { getServiceOptionData } from '#shared/services/service'

const { serviceId } = defineProps<{ serviceId: string }>()

const space = useSpaceStore()

const options = computed(() => space.services.find((service) => service.id === serviceId)?.options ?? [])
const optionsWithValue = computed(() => options.value?.filter((option) => option.value))
const optionsWithoutValue = computed(() => options.value?.filter((option) => !option.value))

type ServiceOptionButton = {
  label: string
  icon: string
  onClick: () => void
}

const buttons = computed<ServiceOptionButton[]>(() => {
  const res: ServiceOptionButton[] = []

  for (const option of optionsWithoutValue.value) {
    const data = getServiceOptionDataForButton(option.key as ServiceOptionKey, serviceId)
    if (!data) {
      continue
    }

    res.push(data)
  }

  return res
})

const overlay = useOverlay()
const modalCreateMainWebsiteUrl = overlay.create(ModalCreateMainWebsiteUrl)
const modalCreateCheckoutReceiverEmail = overlay.create(ModalCreateCheckoutReceiverEmail)
const modalCreateCheckoutReceiverTelegram = overlay.create(ModalCreateCheckoutReceiverTelegram)

const toast = useToast()

function copy(value: string) {
  navigator.clipboard.writeText(value)
  toast.add({
    title: 'Значение скопировано',
    duration: 2000,
  })
}

function getServiceOptionDataForButton(key: ServiceOptionKey, serviceId: string): ServiceOptionButton | null {
  switch (key) {
    case 'main_website_url':
      return {
        label: 'Добавить свой домен',
        icon: 'i-lucide-globe',
        onClick: () => {
          modalCreateMainWebsiteUrl.open({ serviceId })
        },
      }
    case 'checkout_receiver_email':
      return {
        label: 'Создать Email получателя заявок',
        icon: 'i-lucide-mail',
        onClick: () => {
          modalCreateCheckoutReceiverEmail.open({ serviceId })
        },
      }
    case 'checkout_receiver_telegram':
      return {
        label: 'Создать Telegram получателя заявок',
        icon: 'i-simple-icons:telegram',
        onClick: () => {
          modalCreateCheckoutReceiverTelegram.open({ serviceId })
        },
      }
    default:
      return null
  }
}
</script>
