<template>
  <ULink to="/cabinet" class="relative w-full h-full">
    <UCard
      variant="outline"
      :ui="{
        header: 'border-0',
        body: 'border-0',
      }"
      class="h-full flex flex-col justify-between hover:scale-95 duration-200"
    >
      <template #header>
        <UIcon name="i-lucide-hexagon" class="size-8 text-(--ui-text-dimmed)" />
      </template>

      <div>
        <p class="text-sm text-(--ui-text-muted)">
          Пространство
        </p>
        <h3 class="text-2xl">
          {{ name }}
        </h3>
      </div>

      <template #footer>
        <div class="text-(--ui-text-toned) text-sm flex flex-row justify-between items-center">
          <div>{{ tariff }}</div>

          <UAvatarGroup :max="3" size="sm">
            <UAvatar
              v-for="member in members"
              :key="member.id"
              :src="member.user.avatarUrl ?? undefined"
              :alt="member.user.name"
            />
          </UAvatarGroup>
        </div>
      </template>
    </UCard>
  </ULink>
</template>

<script setup lang="ts">
import type { SpaceMember, User } from '@nextorders/database'

defineProps<{
  name: string
  tariffId: string
  members: (SpaceMember & { user: User })[]
}>()

const tariff = '290 ₽ / месяц'
</script>
