<template>
  <CabinetContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CabinetSpaceBalanceCard :balance="space?.balance ?? 0" />
      <CabinetSpaceEndDateCard :balance="space?.balance ?? 0" :tariff-id="space?.tariffId ?? ''" />
    </div>

    <h2 class="mt-8 text-xl md:text-2xl font-semibold">
      История платежей
    </h2>

    <div class="flex flex-wrap items-center justify-between gap-1.5">
      <UInput
        v-model="filterValue"
        :placeholder="$t('common.filter')"
        class="max-w-sm"
        icon="i-lucide-search"
      />

      <div class="flex flex-wrap items-center gap-1.5">
        <UDropdownMenu
          :items="
            table?.tableApi
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                label: upperFirst(column.id),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e?: Event) {
                  e?.preventDefault()
                },
              }))
          "
          :content="{ align: 'end' }"
        >
          <UButton
            :label="$t('common.columns')"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-settings-2"
          />
        </UDropdownMenu>
      </div>
    </div>

    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:row-selection="rowSelection"
      v-model:pagination="pagination"
      :data="data"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="shrink-0"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-1 bg-(--ui-bg-elevated)/50 first:rounded-l-[calc(var(--ui-radius)*2)] last:rounded-r-[calc(var(--ui-radius)*2)] border-y border-(--ui-border) first:border-l last:border-r',
        td: 'border-b border-(--ui-border)',
      }"
    >
      <template #id-cell="{ row }">
        {{ row.getValue('id') }}
      </template>
      <template #createdAt-cell="{ row }">
        {{ formatDateTime(row.getValue('createdAt')) }}
      </template>
      <template #status-cell="{ row }">
        {{ row.getValue('status') }}
      </template>
      <template #amount-cell="{ row }">
        {{ formatAmount(row.getValue('amount')) }}
      </template>
      <template #description-cell="{ row }">
        {{ row.getValue('description') }}
      </template>
    </UTable>

    <div class="flex items-center justify-between gap-3 border-t border-(--ui-border) pt-4 mt-auto">
      <div class="text-sm text-(--ui-text-muted)">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} {{ t('common.table.rows-selected', table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0) }}
        {{ $t('common.table.rows-from') }} {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }}
      </div>

      <div class="flex items-center gap-1.5">
        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>
  </CabinetContent>
</template>

<script setup lang="ts">
import type { Payment } from '@nextorders/database'
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/table-core'
import { upperFirst } from 'scule'

const { t } = useI18n()
const { params } = useRoute('cabinet-space-id-balance___ru')

const { data: space, error } = await useFetch(`/api/space/${params.id}`)
if (error.value) {
  await navigateTo('/cabinet')
}

const filterValue = ref('')
const data = computed<Payment[]>(() => space.value?.payments.filter((c) => c.description.toLowerCase().includes(filterValue.value.toLowerCase())) ?? [])

const columnVisibility = ref({
  id: false,
})
const rowSelection = ref()
const pagination = ref({
  pageIndex: 0,
  pageSize: 25,
})

const columns: Ref<TableColumn<Payment>[]> = ref([{
  accessorKey: 'id',
  header: 'Id',
}, {
  accessorKey: 'createdAt',
  header: 'Дата',
}, {
  accessorKey: 'status',
  header: 'Статус',
}, {
  accessorKey: 'amount',
  header: 'Сумма, ₽',
}, {
  accessorKey: 'description',
  header: 'Комментарий',
}, {
  id: 'action',
  enableSorting: false,
  enableHiding: false,
}])

const table = useTemplateRef('table')
</script>
