<template>
  <UContainer class="flex flex-col py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24 text-center">
    <div>
      <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted)">
        Цены на услуги
      </h1>
      <div class="text-lg sm:text-xl/8 text-(--ui-text-muted) text-balance mt-6">
        Доступно всем. Все максимально просто.
      </div>
    </div>
  </UContainer>

  <UContainer>
    <div
      class="flex flex-col gap-y-8 lg:grid lg:grid-cols-[repeat(var(--count),minmax(0,1fr))] gap-x-8 lg:gap-x-13"
      style="--count: 3;"
    >
      <PricingPlan
        title="Старт 🍳"
        description="Для начинающих"
        price="290 ₽"
        billing-cycle="/месяц"
        :features="[
          'Веб-сайт',
          'Панель управления меню и товарами',
          'До 500 фотографий',
          'Заявки на Email или Telegram',
          'Поддержка через Telegram',
        ]"
        :button="{
          label: 'Сделать предзаказ',
          to: 'https://t.me/hmbanan666',
        }"
        highlight
        scale
      />

      <PricingPlan
        title="Шеф 🧑‍🍳"
        description="Для тех, у кого поток"
        price="1190 ₽"
        billing-cycle="/месяц"
        :features="[
          'Все из тарифа Старт',
          'Панель приема заявок',
          'База клиентов',
          'Отзывы клиентов / Фидбек',
          'Аналитика, статистика и отчеты',
          'Интеграция с другим софтом',
        ]"
        :button="{
          label: 'В разработке / 3 квартал 2025 года',
          to: 'https://t.me/hmbanan666',
        }"
      />

      <PricingPlan
        title="Премиум 👑"
        description="Индивидуальный подход"
        price="По запросу"
        billing-cycle=""
        :features="[
          'Выделенная инфраструктура',
          'Разработка дополнительных модулей',
          'Техническая поддержка',
        ]"
        :button="{
          label: 'Написать',
          to: 'https://t.me/hmbanan666',
        }"
      />
    </div>
  </UContainer>

  <UContainer class="max-w-3xl flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16">
    <div>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted) text-center">
        Часто задаваемые вопросы
      </h2>
      <div class="mt-6 flex flex-row justify-center">
        <UButton
          to="https://t.me/hmbanan666"
          target="_blank"
          color="primary"
          variant="solid"
          size="lg"
          trailing-icon="i-simple-icons:telegram"
        >
          Задайте вопрос в Telegram
        </UButton>
      </div>
    </div>

    <UAccordion :items="questionItems" />
  </UContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'Цены на услуги',
})

const questionItems = ref([
  {
    label: 'Можно ли протестировать платформу перед оплатой?',
    icon: 'i-lucide-message-circle-question',
    content: 'Да, доступен 7-дневный пробный период.',
  },
  {
    label: 'Как происходит оплата сервиса?',
    icon: 'i-lucide-message-circle-question',
    content: 'Путем пополнения баланса в личном кабинете на любую удобную сумму. С баланса регулярно происходят списания за использование платформы и других услуг.',
  },
  {
    label: 'Включена ли поддержка в тарифы?',
    icon: 'i-lucide-message-circle-question',
    content: 'О всех проблемах можно сообщать в Telegram. Мы оперативно отвечаем на вопросы и предлагаем решения.',
  },
])
</script>
