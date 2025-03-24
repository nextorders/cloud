<template>
  <USeparator icon="i-lucide-chef-hat" class="mt-8" />

  <footer>
    <div class="py-8 lg:py-12 border-b border-[var(--ui-border)]">
      <UContainer>
        <nav class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-2">
            <div>
              <h3 class="text-sm font-semibold">
                Навигация
              </h3>
              <ul class="mt-6 space-y-4">
                <li
                  v-for="item in items"
                  :key="item.label"
                  class="relative"
                >
                  <ULink :to="item.to" class="text-sm">
                    {{ item.label }}
                  </ULink>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10 xl:mt-0" />
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
const items = [
  {
    label: 'Цены',
    to: '/pricing',
  },
  {
    label: 'Документация',
    to: '/docs',
  },
  {
    label: 'Оферта',
    to: '/offer',
  },
]
</script>
