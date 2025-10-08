<template>
  <UPageHero
    orientation="vertical"
    :title="title"
    :description="description"
    :ui="{
      wrapper: 'lg:px-8',
      title: 'wrap-break-word',
      description: 'mx-auto max-w-4xl',
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
  <AvatarFeatures />
  <AvatarWhereToUse />
  <AvatarSelfHostedBlock />
</template>

<script setup lang="ts">
const title = 'Персонализированные аватары в один клик'
const description = 'Забудьте о хранении тысяч аватаров на сервере. Генератор SVG-изображений сделает свою работу! Вам остается лишь вставить итоговый URL в приложение. Настройте внешность, эмоции и стиль через параметры запроса.'

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
