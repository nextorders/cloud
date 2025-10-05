<template>
  <UPageSection
    orientation="horizontal"
    title="Где можно использовать"
    description="Никаких сложных настроек — просто вставьте ссылку и наслаждайтесь результатом. Вы можете легко настроить внешний вид аватара прямо через URL."
    :features="whoUsesFeatures"
  >
    <div class="flex flex-col gap-6">
      <AvatarUsageExample class="motion-preset-oscillate-sm motion-duration-3000" />
      <AvatarUsageExample class="self-end md:mr-[15%] motion-preset-wobble motion-duration-2000" />
      <AvatarUsageExample class="self-start md:ml-[15%] motion-preset-wiggle motion-preset-seesaw motion-duration-1000" />
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
const whoUsesFeatures = [
  {
    icon: 'i-lucide-users-round',
    title: 'Системы управления клиентами (CRM)',
  },
  {
    icon: 'i-lucide-messages-square',
    title: 'Социальные сети и форумы',
  },
  {
    icon: 'i-lucide-gamepad-2',
    title: 'Игровые платформы',
  },
  {
    icon: 'i-lucide-factory',
    title: 'Корпоративные порталы',
  },
  {
    icon: 'i-lucide-panels-top-left',
    title: 'Веб-сервисы с регистрацией пользователей',
  },
]
</script>
