<template>
  <DocsPageHeader :title="title" :description="description" />

  <ProseP>
    <b>NextOrders: Food</b> – это передовое онлайн-решение для доставки еды, созданное с целью сделать процесс заказа максимально простым и приятным для каждого пользователя. Благодаря продуманному интерфейсу и интуитивно понятному управлению, ваши клиенты смогут легко просматривать меню, выбирать любимые блюда и оформлять заказы в несколько кликов.
  </ProseP>

  <ProseP>
    Комплексное решение для всех участников процесса доставки: клиентов, ресторанов и курьеров.
  </ProseP>

  <ProseH2>Клиент получает</ProseH2>
  <ProseUl>
    <ProseLi>Удобный веб-сайт с быстрой загрузкой материалов</ProseLi>
    <ProseLi>Подробную информацию о блюдах и их составе</ProseLi>
    <ProseLi>Наглядные фотографии блюд</ProseLi>
    <ProseLi>Систему поиска по названию и категории</ProseLi>
    <ProseLi>Корзину, которая всегда на виду</ProseLi>
  </ProseUl>

  <ProseH2>Ресторан и сотрудники получают</ProseH2>
  <ProseUl>
    <ProseLi>Готовые заявки от клиентов, в которых есть: список заказанных блюд, контактные данные, время</ProseLi>
    <ProseLi>Отзывы от клиентов, которые помогут выявить все проблемные места</ProseLi>
    <ProseLi>Статистику и аналитику</ProseLi>
  </ProseUl>
</template>

<script setup lang="ts">
const title = 'Вступление'
const description = 'Краткая информация о продукте.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})
</script>
