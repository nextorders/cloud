<template>
  <UPageSection
    reverse
    orientation="horizontal"
    title="Ключевые особенности"
    :features="features"
  >
    <div class="flex flex-col gap-6">
      <AvatarUsageExample class="motion-preset-oscillate-sm motion-duration-3000" />
      <AvatarUsageExample class="self-end mr-[5%] md:mr-[15%] motion-preset-wobble-sm motion-duration-2000" />
      <AvatarUsageExample class="self-start md:ml-[15%] motion-preset-wiggle motion-preset-seesaw motion-duration-1000" />
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'i-lucide-scaling',
    title: 'SVG формат — масштабируется без потери качества',
    description: 'Имеют малый вес и отлично смотрятся на любых устройствах',
  },
  {
    icon: 'i-lucide-git-pull-request-arrow',
    title: 'Open Source — используйте в любом проекте',
    description: 'Проект с открытым исходным кодом: адаптируйте под свои задачи',
  },
  {
    icon: 'i-lucide-infinity',
    title: 'API без ограничений — генерируйте сколько угодно',
    description: 'Генерируйте тысячи аватаров хоть каждый день!',
  },
  {
    icon: 'i-lucide-package-open',
    title: 'Лёгкая интеграция — 1 строка кода',
    description: 'Не нужно тратить часы на интеграцию. Добавьте NPM библиотеку в свой продукт.',
  },
  {
    icon: 'i-lucide-combine',
    title: 'Настраиваемые параметры — тысячи комбинаций',
    description: 'Гибкая настройка: комбинируйте пол, эмоции, одежду и другие опции',
  },
]
</script>
