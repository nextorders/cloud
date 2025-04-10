<template>
  <CabinetHeader title="Электронная почта" />

  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CabinetEmailCard
        v-for="email in user.emails"
        :key="email.id"
        :email="email.value"
        :status="email.status"
      />
      <CabinetCreateEmailCard v-if="canCreate" />
    </div>

    <UContainer class="mt-32 md:mt-48 max-w-3xl">
      <UIcon name="i-lucide-book-marked" class="-mb-4 size-10 text-(--ui-text-dimmed)" />
      <ProseH3>Немного теории</ProseH3>

      <ProseP>
        Email адреса привязываются к учетной записи. При добавлении нового адреса на
        него будет отправлено письмо с ссылкой для подтверждения.
      </ProseP>
      <ProseP>
        Активные адреса вы можете использовать в некоторых сервисах. Например, для получения
        уведомлений о новых заявках от клиентов.
      </ProseP>
    </UContainer>
  </CabinetContent>
</template>

<script setup lang="ts">
const user = useUserStore()
const ownedEmailsQuota = computed(() => user.quotas.find((q) => q.key === 'owned_emails'))
const canCreate = computed<boolean>(() => ownedEmailsQuota.value !== undefined && ownedEmailsQuota.value.used < ownedEmailsQuota.value.limit)
</script>
