<template>
  <UContainer class="flex flex-col py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24 text-center">
    <div>
      <div class="mb-4 justify-center font-semibold text-(--ui-primary) flex items-center gap-1.5">
        Ранний доступ
      </div>
      <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted)">
        Готовый инструмент для увеличения продаж
      </h1>
      <div class="text-lg sm:text-xl/8 text-(--ui-text-muted) text-balance mt-6">
        Современный и удобный способ для ваших клиентов заказать еду. Доставка и самовывоз.
      </div>

      <div class="mt-8 flex flex-row gap-2 justify-center">
        <UButton
          to="https://demo.nextorders.space"
          target="_blank"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-eye"
        >
          Демо
        </UButton>
      </div>
    </div>

    <div class="relative mx-auto">
      <NuxtImg
        :src="demoImage"
        alt=""
        class="w-full h-auto rounded-xl"
      />
    </div>
  </UContainer>

  <UContainer class="flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16">
    <div>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted) text-center">
        Преимущества и возможности
      </h2>
      <div class="text-base sm:text-lg text-(--ui-text-muted) text-center text-balance mt-6">
        Откройте для себя новый уровень организации доставки еды с нашей облачной платформой.
      </div>
    </div>

    <div class="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard v-for="feature in features" :key="feature.title">
        <UIcon
          :name="feature.icon"
          color="neutral"
          class="size-6"
        />

        <div class="text-base text-pretty font-semibold text-(--ui-text-highlighted)">
          {{ feature.title }}
        </div>
        <div class="text-sm text-pretty text-(--ui-text-muted) mt-1">
          {{ feature.description }}
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'Готовый инструмент для увеличения продаж',
  meta: [
    {
      name: 'description',
      content: 'Современный и удобный способ для ваших клиентов заказать еду. Доставка и самовывоз.',
    },
  ],
})

const colorMode = useColorMode()
const demoImage = computed(() => colorMode.value === 'dark' ? '/img/main-ru-light.png' : '/img/main-ru-dark.png')

const features = [
  {
    icon: 'i-lucide-layers-2',
    title: 'Многостраничная архитектура',
    description: 'У каждого товара есть своя страница. У каждой категории тоже.',
  },
  {
    icon: 'i-lucide-shopping-basket',
    title: 'Удобная корзина',
    description: 'Она всегда на виду. Из нее можно переместиться на конкретный товар.',
  },
  {
    icon: 'i-lucide-tablet-smartphone',
    title: 'Мобильная версия',
    description: 'На смартфоне веб-сайт выглядит как мобильное приложение. На ПК - тоже здорово!',
  },
  {
    icon: 'i-lucide-hand-platter',
    title: 'Доставка и самовывоз',
    description: 'Клиент выбирает способ доставки. Можно выключить при необходимости.',
  },
  {
    icon: 'i-lucide-text-search',
    title: 'Быстрый поиск по каталогу',
    description: 'Клиент может указать часть названия товара и переместиться на его страницу.',
  },
  {
    icon: 'i-lucide-fast-forward',
    title: 'Супер быстрый процесс заказа',
    description: 'Нет принудительной регистрации. Клиент указывает только необходимые данные.',
  },
  {
    icon: 'i-lucide-layers',
    title: 'Разные меню',
    description: 'Можно создать отдельные наборы категорий и товаров, чтобы быстро их переключать.',
  },
  {
    icon: 'i-lucide-message-square-dot',
    title: 'Прием заявок',
    description: 'Можно получать клиентские заявки удобным способом: на Email, в Telegram*, в систему учета*.',
  },
]
</script>
