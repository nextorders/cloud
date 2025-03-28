<template>
  <UForm
    :schema="spaceCreateSchema"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField
      label="Название"
      name="name"
      description="Короткое, но понятное. Например: «Обеды на колёсах»"
    >
      <UInput
        v-model="state.name"
        size="xl"
        class="w-full items-center justify-center"
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
import type { SpaceCreateSchema } from '~~/shared/services/space'
import { spaceCreateSchema } from '~~/shared/services/space'

const emit = defineEmits(['success', 'submitted'])

const actionToast = useActionToast()
const user = useUserStore()

const state = ref<Partial<SpaceCreateSchema>>({
  name: undefined,
  tariffId: 'j7gb38bk5p14jbaffbuzggyh',
  ownerId: user.id,
})

async function onSubmit(event: FormSubmitEvent<SpaceCreateSchema>) {
  actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/space', {
      method: 'POST',
      body: event.data,
    })

    await user.update()
    actionToast.success('Пространство создано!')
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error()
  }
}
</script>
