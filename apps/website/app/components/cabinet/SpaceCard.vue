<template>
  <UCard
    variant="subtle"
    :ui="{
      header: 'border-0',
      body: 'border-0',
    }"
    class="h-full flex flex-col justify-between hover:scale-95 active:scale-90 duration-200"
  >
    <template #header>
      <UAvatarGroup :max="5" size="md">
        <UTooltip
          v-for="member in members"
          :key="member.id"
          :text="`${member.user.name}, ${getFirstRoleInfo(member.roles)}`"
        >
          <UAvatar
            :src="member.user.avatarUrl ?? undefined"
            :alt="member.user.name"
          />
        </UTooltip>
      </UAvatarGroup>
    </template>

    <div>
      <div class="text-sm text-(--ui-text-muted) flex flex-row items-center gap-1.5">
        <p>Пространство</p>
        <UIcon name="i-lucide-hexagon" class="size-4" />
        <p>Тариф "{{ tariff?.name }}"</p>
      </div>
      <h3 class="text-2xl">
        {{ name }}
      </h3>
    </div>

    <template #footer>
      <div class="flex flex-row gap-2 items-center">
        <UBadge variant="soft" icon="i-lucide-wallet">
          Баланс: {{ balance }} ₽
        </UBadge>
        <UBadge v-if="endDate" variant="soft">
          до {{ endDate }}
        </UBadge>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { SpaceMember, User } from '@nextorders/database'

const { tariffId, balance } = defineProps<{
  name: string
  tariffId: string
  balance: number
  members: (SpaceMember & { user: User })[]
}>()

const endDate = getEndDate(balance, tariffId)
const tariff = getTariffData(tariffId)

function getFirstRoleInfo(roles: string[]) {
  switch (roles[0]) {
    case 'owner':
      return 'владелец'
    case 'admin':
      return 'администратор'
    default:
      return 'участник'
  }
}
</script>
