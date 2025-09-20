<template>
  <USeparator icon="i-lucide-chef-hat" class="mt-16" />

  <footer>
    <div class="py-8 lg:py-12 border-b border-[var(--ui-border)]">
      <UContainer>
        <nav class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-12 md:gap-8 xl:col-span-2">
            <div v-for="column in columns" :key="column.label">
              <h3 class="text-sm font-semibold">
                {{ column.label }}
              </h3>
              <ul class="mt-6 space-y-4">
                <li
                  v-for="item in column.children"
                  :key="item.label"
                  class="relative"
                >
                  <ULink
                    :to="item.to"
                    :target="item.target"
                    class="text-base"
                  >
                    {{ item.label }}
                  </ULink>

                  <p v-if="item?.description" class="text-xs text-(--ui-text-dimmed)">
                    {{ item.description }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </UContainer>
    </div>

    <UContainer class="mt-8 mb-20 flex flex-col gap-1 justify-center items-center text-(--ui-text-muted)">
      <p class="flex flex-row items-center gap-1">
        Создается с <UIcon name="fluent-emoji-flat:red-heart" class="size-5" /> и с <UIcon name="fluent-emoji-flat:fire" class="size-5" /> в глазах
      </p>
      <div class="text-sm">
        © 2025, ИП Косарев Н.Н.
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const columns: { label: string, children: { label: string, to: string, target?: string, description?: string }[] }[] = [{
  label: 'Навигация',
  children: [
    {
      label: 'Документация',
      to: '/docs',
    },
    {
      label: 'Оферта',
      to: '/offer',
    },
  ],
},
{
  label: 'Демо-версии',
  children: [
    {
      label: 'Веб-сайт',
      to: 'https://demo.nextorders.space',
      target: '_blank',
      description: 'Продающий инструмент для клиентов',
    },
    {
      label: 'Панель управления',
      to: 'https://demo.nextorders.space/command-center',
      target: '_blank',
      description: 'При входе укажите demo как логин и пароль',
    },
  ],
}]
</script>
