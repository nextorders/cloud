<template>
  <CabinetContent>
    <div
      v-for="service in space?.services"
      :key="service.id"
      class="max-w-2xl flex flex-col gap-4"
    >
      <div class="flex flex-col md:flex-row gap-2 justify-between">
        <div>
          <h2 class="text-xl md:text-2xl font-semibold">
            {{ service.name }}
          </h2>
          <div class="flex flex-row gap-1 items-center">
            Сервис функционирует нормально <UIcon name="i-lucide-heart-pulse" class="size-5 animate-pulse text-(--ui-success)" />
          </div>
        </div>

        <div>
          <UBadge variant="soft" color="neutral">
            версия {{ service.version }}
          </UBadge>
        </div>
      </div>

      <UCard variant="subtle" class="rounded-xl">
        <div class="flex flex-col gap-6">
          <div
            v-for="option in service.options"
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
                      @click="copy(option.value)"
                    />
                  </UTooltip>
                  <UTooltip
                    v-if="option.type === 'link'"
                    :content="{ side: 'right' }"
                    text="Открыть в новом окне"
                  >
                    <UButton
                      :to="option.value"
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
    </div>
  </CabinetContent>
</template>

<script setup lang="ts">
import type { ServiceOptionKey } from '@nextorders/database'
import { getServiceOptionData } from '#shared/services/service'

const { params } = useRoute('cabinet-space-id___en')

const { data: space, error } = await useFetch(`/api/space/${params.id}`)
if (error.value) {
  await navigateTo('/cabinet')
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
