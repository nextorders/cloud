<template>
  <CabinetContent>
    <div class="max-w-2xl">
      <div class="mb-4">
        <h2 class="text-xl md:text-2xl font-semibold">
          Сервисы
        </h2>
        <p>Вся информация для работы</p>
      </div>

      <UCard variant="soft" class="rounded-xl">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div>
              <div class="text-base font-semibold">
                Веб-сайт
              </div>
              <p class="text-sm">
                Ссылка для клиента. Здесь он может создать заказ.
              </p>
            </div>

            <UInput :value="websiteUrl" size="xl">
              <template #trailing>
                <div class="flex gap-1">
                  <UTooltip text="Скопировать" :content="{ side: 'right' }">
                    <UButton
                      color="neutral"
                      variant="soft"
                      size="sm"
                      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                      @click="copy(websiteUrl)"
                    />
                  </UTooltip>
                  <UTooltip text="Открыть" :content="{ side: 'right' }">
                    <UButton
                      color="neutral"
                      variant="soft"
                      size="sm"
                      :to="websiteUrl"
                      target="_blank"
                      icon="i-lucide-external-link"
                    />
                  </UTooltip>
                </div>
              </template>
            </UInput>
          </div>

          <div class="flex flex-col gap-2">
            <div>
              <div class="text-base font-semibold">
                Панель управления веб-сайтом
              </div>
              <p class="text-sm">
                Откройте ссылку и продолжите работу как администратор.
              </p>
            </div>

            <UInput :value="commandCenterUrl" size="xl">
              <template #trailing>
                <div class="flex gap-1">
                  <UTooltip text="Скопировать" :content="{ side: 'right' }">
                    <UButton
                      color="neutral"
                      variant="soft"
                      size="sm"
                      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                      @click="copy(commandCenterUrl)"
                    />
                  </UTooltip>
                  <UTooltip text="Открыть" :content="{ side: 'right' }">
                    <UButton
                      color="neutral"
                      variant="soft"
                      size="sm"
                      :to="commandCenterUrl"
                      target="_blank"
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
</script>
