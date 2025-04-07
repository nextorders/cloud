<template>
  <CabinetContent>
    <div class="max-w-2xl flex flex-col gap-8">
      <div
        v-for="service in space?.services"
        :key="service.id"
        class="flex flex-col gap-4"
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

        <CabinetServiceOptions :service-id="service.id" />
      </div>
    </div>
  </CabinetContent>
</template>

<script setup lang="ts">
const space = useSpaceStore()
</script>
