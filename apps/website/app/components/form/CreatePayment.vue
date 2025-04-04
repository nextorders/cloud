<template>
  <UForm
    :schema="paymentCreateSchema"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField label="Сумма, ₽" name="amount">
      <UInputNumber
        v-model="state.amount"
        :min="10"
        :max="999999"
        orientation="vertical"
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
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { PaymentCreateSchema } from '~~/shared/services/payment'
import { paymentCreateSchema } from '~~/shared/services/payment'

const { spaceId } = defineProps<{ spaceId: string }>()
const emit = defineEmits(['success', 'submitted'])

const actionToast = useActionToast()

const state = ref<Partial<PaymentCreateSchema>>({
  amount: 1000,
  spaceId,
})

async function onSubmit(event: FormSubmitEvent<PaymentCreateSchema>) {
  actionToast.start()
  emit('submitted')

  try {
    const data = await $fetch('/api/payment', {
      method: 'POST',
      body: event.data,
    })

    actionToast.success('Платеж создан!')
    emit('success')

    await navigateTo(data.result, { external: true })
  } catch (error) {
    console.error(error)
    actionToast.error()
  }
}
</script>
