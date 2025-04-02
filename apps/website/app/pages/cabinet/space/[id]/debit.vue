<template>
  <CabinetContent>
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
        {{ new Date(row.getValue('createdAt')).toLocaleDateString(locale, { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }) }}
      </template>
      <template #amount-cell="{ row }">
        {{ new Intl.NumberFormat(locale).format(row.getValue('amount')) }}
      </template>
      <template #type-cell="{ row }">
        {{ getBalanceChangeTypeDescription(row.getValue('type')) }}
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
import type { BalanceChange } from '@nextorders/database'
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/table-core'
import { upperFirst } from 'scule'

const { t, locale } = useI18n()
const { params } = useRoute('cabinet-space-id-debit___en')

const { data: space, error } = await useFetch(`/api/space/${params.id}`)
if (error.value) {
  await navigateTo('/cabinet')
}

const filterValue = ref('')
const data = computed<BalanceChange[]>(() => space.value?.balanceChanges.filter((c) => c.type.toLowerCase().includes(filterValue.value.toLowerCase())) ?? [])

const columnVisibility = ref({
  id: false,
})
const rowSelection = ref()
const pagination = ref({
  pageIndex: 0,
  pageSize: 25,
})

const columns: Ref<TableColumn<BalanceChange>[]> = ref([{
  accessorKey: 'id',
  header: 'Id',
}, {
  accessorKey: 'createdAt',
  header: 'Дата',
}, {
  accessorKey: 'amount',
  header: 'Сумма, ₽',
}, {
  accessorKey: 'type',
  header: 'Тип',
}, {
  id: 'action',
  enableSorting: false,
  enableHiding: false,
}])

const table = useTemplateRef('table')
</script>
