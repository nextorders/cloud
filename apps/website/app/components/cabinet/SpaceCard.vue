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
          <p>Тариф "{{ tariffName }}"</p>
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
            {{ endDate }}
          </UBadge>
        </div>
      </template>
    </UCard>
  </ULink>
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
const tariffName = getTariffName(tariffId)

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

function getTariffDailyCost(tariffId: string) {
  switch (tariffId) {
    case 'j7gb38bk5p14jbaffbuzggyh':
      return 0
    case 's49wrykl4wxvmf693tn6lqxn':
      return 9
    case 'uzd1qzders7p6j2idst1td81':
      return 38
    default:
      return 0
  }
}

function getTariffName(tariffId: string) {
  switch (tariffId) {
    case 'j7gb38bk5p14jbaffbuzggyh':
      return 'Нулевой'
    case 's49wrykl4wxvmf693tn6lqxn':
      return 'Старт'
    case 'uzd1qzders7p6j2idst1td81':
      return 'Шеф'
    default:
      return ''
  }
}

function getEndDate(balance: number, tariffId: string): string | null {
  const dailyCost = getTariffDailyCost(tariffId)
  const daysLeft = dailyCost > 0 ? Math.ceil(balance / dailyCost) : 1000
  if (daysLeft >= 1000) {
    return null
  }

  const date = new Date()
  date.setTime(date.getTime() + daysLeft * 24 * 60 * 60 * 1000)

  return `Хватит до ${date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`
}
</script>
