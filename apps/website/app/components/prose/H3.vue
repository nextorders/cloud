<template>
  <h3 class="relative text-xl text-(--ui-text-highlighted) font-bold mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(32px+var(--ui-header-height))] [&>a]:focus-visible:outline-(--ui-primary) [&>a>code]:border-dashed hover:[&>a>code]:border-(--ui-primary) hover:[&>a>code]:text-(--ui-primary) [&>a>code]:text-lg/6 [&>a>code]:font-bold">
    <slot />
  </h3>
</template>
