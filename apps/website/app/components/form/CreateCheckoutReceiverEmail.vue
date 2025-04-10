<template>
  <UForm
    v-if="activeEmails.length"
    :schema="serviceOptionCreateSchema"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField label="Email" name="value">
      <USelect
        v-model="state.value"
        :items="activeEmails"
        placeholder="Выберите"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      variant="solid"
      color="primary"
      size="xl"
      block
      class="mt-3"
      label="Создать"
    />
  </UForm>

  <UButton
    v-else
    variant="solid"
    color="primary"
    size="xl"
    block
    class="mt-3"
    label="Сначала добавьте Email"
    @click="redirectToEmailPage"
  />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ServiceOptionCreateSchema } from '~~/shared/services/service'
import { serviceOptionCreateSchema } from '~~/shared/services/service'

const { serviceId } = defineProps<{ serviceId: string }>()
const emit = defineEmits(['success', 'submitted'])

const space = useSpaceStore()
const user = useUserStore()
const actionToast = useActionToast()

const activeEmails = computed(() =>
  user.emails.filter((email) => email.status === 'active').map((email) => email.value),
)

const state = ref<Partial<ServiceOptionCreateSchema>>({
  key: 'checkout_receiver_email',
  value: undefined,
})

async function redirectToEmailPage() {
  emit('success')
  await navigateTo('/cabinet/email')
}

async function onSubmit(event: FormSubmitEvent<ServiceOptionCreateSchema>) {
  actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/service/${serviceId}/option`, {
      method: 'PATCH',
      body: event.data,
    })

    await space.update()
    actionToast.success('Добавлен!')
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error()
  }
}
</script>
