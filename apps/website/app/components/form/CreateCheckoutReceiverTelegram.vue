<template>
  <UForm
    :schema="serviceOptionCreateSchema"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField label="Код от бота" name="value">
      <UInput
        v-model="state.value"
        placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
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
      label="Привязать"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ServiceOptionCreateSchema } from '~~/shared/services/service'
import { serviceOptionCreateSchema } from '~~/shared/services/service'

const { serviceId } = defineProps<{ serviceId: string }>()
const emit = defineEmits(['success', 'submitted'])

const space = useSpaceStore()
const actionToast = useActionToast()

const state = ref<Partial<ServiceOptionCreateSchema>>({
  key: 'checkout_receiver_telegram',
  value: undefined,
})

async function onSubmit(event: FormSubmitEvent<ServiceOptionCreateSchema>) {
  actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/service/${serviceId}/option`, {
      method: 'PATCH',
      body: event.data,
    })

    await space.update()
    actionToast.success('Бот активирован!')
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error()
  }
}
</script>
