<template>
  <PageHeader
    :title="title"
    :description="description"
  >
    <template #top>
      <div class="mb-4 font-semibold text-primary flex items-center justify-center gap-1.5">
        <UBadge color="neutral" variant="soft">
          Открытый код
        </UBadge>
      </div>
    </template>

    <template #bottom>
      <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
        <UButton
          to="https://demo.nextorders.space"
          target="_blank"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-eye"
          label="Демо-версия"
          class="motion-scale-in"
        />

        <UButton
          to="https://github.com/nextorders/food"
          color="neutral"
          variant="outline"
          size="xl"
          trailing-icon="i-simple-icons:github"
          label="GitHub"
          class="motion-scale-in"
        />
      </div>
    </template>
  </PageHeader>

  <UContainer>
    <figure>
      <NuxtImg
        :src="mainImage"
        format="webp"
        densities="x1 x2"
        alt="Демо версия NextOrders: Food"
        class="w-full h-auto rounded-lg motion-preset-slide-up"
      />
      <figcaption class="mt-2 text-center italic text-muted">
        Так выглядит веб-сайт: каталог, удобная корзина
      </figcaption>
    </figure>
  </UContainer>

  <UContainer class="mt-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 lg:grid-cols-2 lg:items-center">
    <div>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted">
        Редактирование веб-сайта
      </h2>
      <p class="text-base sm:text-lg text-muted text-pretty mt-6">
        Удобная панель управления позволит легко управлять меню, товарами и настройками сайта, пока клиенты продолжают заказывать еду.
      </p>

      <ul class="mt-8 grid gap-4">
        <li
          v-for="feature in commandCenterFeatures"
          :key="feature.label"
          class="relative flex items-start gap-2.5"
        >
          <div class="inline-flex items-center justify-center p-0.5">
            <UIcon :name="feature.icon" class="size-6 text-primary" />
          </div>
          <div>{{ feature.label }}</div>
        </li>
      </ul>
    </div>

    <div class="flex flex-col gap-6 items-center">
      <NuxtImg
        :src="commandCenterImage"
        format="webp"
        densities="x1 x2"
        alt="Командный центр"
        class="w-full h-auto rounded-lg motion-preset-slide-left"
      />

      <div class="flex flex-wrap flex-col md:flex-row gap-x-6 gap-y-3 justify-center">
        <UButton
          to="https://demo.nextorders.space/command-center"
          target="_blank"
          color="primary"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-eye"
          class="shrink-0 justify-center"
        >
          Демо-версия
        </UButton>

        <div class="max-w-52 text-center">
          При входе укажите <b>demo</b> как логин и пароль
        </div>
      </div>
    </div>
  </UContainer>

  <UContainer class="flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16">
    <div>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center">
        Преимущества и возможности
      </h2>
      <div class="text-base sm:text-lg text-muted text-center text-balance mt-6">
        Откройте для себя новый уровень организации доставки еды.
      </div>
    </div>

    <div class="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard
        v-for="feature in features"
        :key="feature.title"
        class="rounded-lg motion-preset-slide-up"
      >
        <UIcon
          :name="feature.icon"
          color="neutral"
          class="size-6"
        />

        <h3 class="text-base text-pretty font-semibold text-highlighted">
          {{ feature.title }}
        </h3>
        <div class="text-sm text-pretty text-muted mt-1">
          {{ feature.description }}
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const mainImage = computed(() => colorMode.value === 'dark' ? '/img/main-ru-light.png' : '/img/main-ru-dark.png')
const commandCenterImage = computed(() => colorMode.value === 'dark' ? '/img/command-center-ru-light.png' : '/img/command-center-ru-dark.png')

const commandCenterFeatures = [
  {
    icon: 'i-lucide-settings-2',
    label: 'Добавляйте, редактируйте и удаляйте позиции в один клик',
  },
  {
    icon: 'i-lucide-image-up',
    label: 'Загрузка и оптимизация фото блюд',
  },
  {
    icon: 'i-lucide-calendar-clock',
    label: 'Настройка графика работы',
  },
  {
    icon: 'i-lucide-banknote-arrow-up',
    label: 'Управление способами оплаты и ценовыми настройками',
  },
  {
    icon: 'i-lucide-panels-top-left',
    label: 'Создание страниц, информационных разделов и специальных предложений',
  },
]

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

const title = 'Готовый инструмент для увеличения продаж'
const description = 'Современный и удобный способ для клиентов заказать еду. Доставка и самовывоз.'

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
