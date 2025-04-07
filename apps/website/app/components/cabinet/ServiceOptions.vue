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
import { ModalCreateMainWebsiteUrl } from '#components'
import { getServiceOptionData } from '#shared/services/service'

const { serviceId } = defineProps<{ serviceId: string }>()

const space = useSpaceStore()

const options = computed(() => space.services.find((service) => service.id === serviceId)?.options ?? [])
const optionsWithValue = computed(() => options.value?.filter((option) => option.value))
const optionsWithoutValue = computed(() => options.value?.filter((option) => !option.value))

const buttons = computed<{ label: string, icon: string, onClick: () => void }[]>(() =>
  optionsWithoutValue.value
    .map((option) => getServiceOptionDataForButton(option.key as ServiceOptionKey, option.serviceId)),
)

const overlay = useOverlay()
const modalCreateMainWebsiteUrl = overlay.create(ModalCreateMainWebsiteUrl)

const toast = useToast()

function copy(value: string) {
  navigator.clipboard.writeText(value)
  toast.add({
    title: 'Значение скопировано',
    duration: 2000,
  })
}

function getServiceOptionDataForButton(key: ServiceOptionKey, serviceId: string) {
  if (key === 'main_website_url') {
    return {
      label: 'Добавить свой домен',
      icon: 'i-lucide-globe',
      onClick: () => {
        modalCreateMainWebsiteUrl.open({ serviceId })
      },
    }
  }

  return {
    label: '',
    icon: '',
    onClick: () => {},
  }
}
</script>
