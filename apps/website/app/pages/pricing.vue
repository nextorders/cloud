<template>
  <PageHeader title="Цены на услуги" description="Доступно всем. Все максимально просто." />

  <UContainer>
    <div
      class="flex flex-col gap-y-8 lg:grid lg:grid-cols-[repeat(var(--count),minmax(0,1fr))] gap-x-8 lg:gap-x-13"
      style="--count: 3;"
    >
      <PricingPlan
        title="Глазунья"
        title-icon="fluent-emoji-flat:cooking"
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
          label: 'Создать Пространство',
          to: '/cabinet',
        }"
        highlight
        scale
      />

      <PricingPlan
        title="Фондю"
        title-icon="fluent-emoji-flat:fondue"
        description="Для тех, у кого поток"
        price="1190 ₽"
        billing-cycle="/месяц"
        :features="[
          'Все из тарифа «Глазунья»',
          'Панель приема заявок',
          'База клиентов',
          'Отзывы клиентов / Фидбек',
          'Аналитика, статистика и отчеты',
          'Интеграция с другим софтом',
        ]"
        :button="{
          label: 'В разработке / 3 квартал 2025 года',
          to: 'https://t.me/hmbanan666',
          target: '_blank',
        }"
      />

      <PricingPlan
        title="Лобстер"
        title-icon="fluent-emoji-flat:lobster"
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
          target: '_blank',
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
          variant="soft"
          size="lg"
          trailing-icon="i-simple-icons:telegram"
        >
          Задайте вопрос в Telegram
        </UButton>
      </div>
    </div>

    <UAccordion :items="questionItems" :ui="{ trigger: 'text-lg' }" />
  </UContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'Цены на услуги',
  meta: [
    {
      name: 'description',
      content: 'Доступно всем. Все максимально просто. От 290 рублей в месяц.',
    },
  ],
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
    content: 'Путем пополнения Баланса в личном кабинете на любую удобную сумму. С Баланса регулярно происходят списания согласно выбранному тарифу.',
  },
  {
    label: 'Включена ли поддержка в тарифы?',
    icon: 'i-lucide-message-circle-question',
    content: 'О всех проблемах можно сообщать в Telegram. Мы оперативно отвечаем на вопросы и предлагаем решения.',
  },
])
</script>
