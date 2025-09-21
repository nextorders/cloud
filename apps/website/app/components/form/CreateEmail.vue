<template>
  <UForm
    :schema="emailCreateSchema"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
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
      label="Добавить"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { EmailCreateSchema } from '#shared/services/email'
import type { FormSubmitEvent } from '@nuxt/ui'
import { emailCreateSchema } from '#shared/services/email'

const emit = defineEmits(['success', 'submitted'])

const user = useUserStore()
const actionToast = useActionToast()

const state = ref<Partial<EmailCreateSchema>>({
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<EmailCreateSchema>) {
  actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/email', {
      method: 'POST',
      body: event.data,
    })

    await user.update()
    actionToast.success('Добавлен!')
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error()
  }
}
</script>
