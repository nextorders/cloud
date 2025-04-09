<template>
  <Html lang="en">
    <Section>
      <Heading as="h1">
        Новая заявка! #{{ id }}
      </Heading>
      <Heading as="h2">
        {{ method }}
      </Heading>
    </Section>

    <Section>
      <Text>Клиент: {{ name }}, {{ phone }}</Text>
      <Text>Время: {{ timeLocal }}</Text>
    </Section>

    <Section>
      <Text v-if="warehouseAddress">
        Адрес склада-кухни: {{ warehouseAddress }}
      </Text>
      <Text v-if="address">
        Адрес:
        <span>{{ address?.street }} {{ address?.flat }}</span>
        <span v-if="address?.doorphone">, домофон {{ address?.doorphone }}</span>
        <span v-if="address?.entrance">, подъезд {{ address?.entrance }}</span>
        <span v-if="address?.floor">, этаж {{ address?.floor }}</span>
        <span v-if="address?.addressNote">. {{ address?.addressNote }}</span>
      </Text>

      <Text>Метод оплаты: {{ paymentMethodName }}</Text>
      <Text v-if="change">
        Нужна сдача с: {{ change }}
      </Text>

      <Text>Комментарий: {{ note }}</Text>
    </Section>

    <Hr />

    <Heading as="h3">
      Заказанные товары:
    </Heading>
    <Section>
      <Row v-for="item in items" :key="item.id">
        <Text>{{ item.name }} | {{ item.variant }} - x{{ item.quantity }} - {{ item.totalPrice }}</Text>
      </Row>
    </Section>

    <Text>Итого: {{ totalPrice }}</Text>
  </Html>
</template>

<script setup lang="ts">
import type { CheckoutForReceiver } from '~~/types/receiver'
import { Heading, Hr, Html, Row, Section, Text } from '@vue-email/components'

const { deliveryMethod, time, timeType } = defineProps<CheckoutForReceiver>()

const method = deliveryMethod === 'WAREHOUSE' ? 'Самовывоз' : 'Доставка'
const timeLocal = timeType === 'ASAP' ? 'Как можно быстрее' : time
</script>
