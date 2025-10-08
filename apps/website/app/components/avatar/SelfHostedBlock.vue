<template>
  <UPageSection
    orientation="horizontal"
    reverse
    title="Нужно разместить у себя?"
    description="Без проблем, так как это open source проект. Библиотеку можно установить в свой продукт из NPM."
    :links="[
      {
        label: 'Код на GitHub',
        to: 'https://github.com/nextorders/avatar',
        target: '_blank',
        icon: 'simple-icons:github',
        size: 'xl',
        class: 'w-full md:w-fit justify-center',
      },
    ]"
  >
    <div class="w-full h-full">
      <div class="p-4 h-full bg-elevated rounded-lg flex items-center justify-center">
        <p class="text-xl font-semibold">
          npm i @nextorders/avatar
        </p>
      </div>
    </div>
  </UPageSection>
</template>
