<template>
  <!DOCTYPE html>
  <Html lang="en">
    <Head>
      <title>Подтверждение почты</title>
    </Head>

    <Section>
      <Heading as="h1">
        Подтверждение почты
      </Heading>
      <Heading as="h2">
        Перейдите по ссылке ниже, чтобы подтвердить почту.
      </Heading>
    </Section>

    <Link :href="href">
      {{ href }}
    </Link>
  </Html>
</template>

<script setup lang="ts">
import { Head, Heading, Html, Link, Section } from '@vue-email/components'

defineProps<{ href: string }>()
</script>
