<template>
  <CabinetContent>
    <div
      v-for="service in services"
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
            :key="option.name"
            class="flex flex-col gap-2"
          >
            <div>
              <div class="text-sm font-semibold">
                {{ option.name }}
              </div>
              <p class="text-sm">
                {{ option.description }}
              </p>
            </div>

            <UInput
              :value="option.value"
              :ui="{ trailing: 'pr-1.5' }"
              size="lg"
            >
              <template #trailing>
                <div class="flex gap-1">
                  <UTooltip text="Скопировать" :content="{ side: 'right' }">
                    <UButton
                      color="neutral"
                      variant="subtle"
                      size="sm"
                      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                      @click="copy(option.value)"
                    />
                  </UTooltip>
                  <UTooltip text="Открыть" :content="{ side: 'right' }">
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
const { params } = useRoute('cabinet-space-id___en')

const { data: space, error } = await useFetch(`/api/space/${params.id}`)
if (error.value) {
  await navigateTo('/cabinet')
}

const websiteUrl = computed(() => `https://${space.value?.id}.c1.nextorders.ru`)
const commandCenterUrl = computed(() => `${websiteUrl.value}/command-center`)

const copied = ref(false)

function copy(value: string) {
  navigator.clipboard.writeText(value)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const services = ref([
  {
    id: '1',
    name: 'NextOrders: Food',
    version: '0.7.0',
    options: [
      {
        name: 'Веб-сайт',
        description: 'Ссылка для клиента. Здесь он может создать заказ.',
        value: websiteUrl.value,
      },
      {
        name: 'Панель управления веб-сайтом',
        description: 'Откройте ссылку и продолжите работу как администратор.',
        value: commandCenterUrl.value,
      },
    ],
  },
])
</script>
