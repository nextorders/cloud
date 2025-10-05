<template>
  <UPageHero
    orientation="vertical"
    :title="title"
    :description="description"
    :ui="{
      wrapper: 'lg:px-8',
    }"
  >
    <template #headline>
      <UBadge color="neutral" variant="soft">
        Открытый код
      </UBadge>
    </template>

    <div class="mx-auto">
      <AvatarRandomBlock />
    </div>
  </UPageHero>

  <AvatarRandomConstructor />
  <AvatarWhereToUse />
  <AvatarSelfHostedBlock />
</template>

<script setup lang="ts">
const title = 'Персонализированные аватары в один клик'
const description = 'Удобный сервис для генерации персонализированных SVG-аватаров по уникальному URL. Больше не нужно хранить изображения в базе данных — просто используйте ссылку для отображения аватара в вашем приложении или на сайте.'

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
})
</script>
