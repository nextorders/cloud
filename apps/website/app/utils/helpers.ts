export function getTariffsForSelect(): { value: string, label: string, icon: string, disabled?: boolean }[] {
  return [
    { value: 's49wrykl4wxvmf693tn6lqxn', label: 'Глазунья / 290 ₽ в месяц', icon: 'fluent-emoji-flat:cooking' },
    { value: 'uzd1qzders7p6j2idst1td81', label: 'Фондю / В разработке', icon: 'fluent-emoji-flat:fondue', disabled: true },
  ]
}

export function getTariffData(id: string): { name: string, icon: string, dailyCost: number } | undefined {
  switch (id) {
    case 'j7gb38bk5p14jbaffbuzggyh':
      return { name: 'Нулевой', icon: 'fluent-emoji-flat:chicken', dailyCost: 0 }
    case 's49wrykl4wxvmf693tn6lqxn':
      return { name: 'Глазунья', icon: 'fluent-emoji-flat:cooking', dailyCost: 9 }
    case 'uzd1qzders7p6j2idst1td81':
      return { name: 'Фондю', icon: 'fluent-emoji-flat:fondue', dailyCost: 38 }
    default:
      return undefined
  }
}

export function getEndDate(balance: number, tariffId: string): string | null {
  const tariff = getTariffData(tariffId)
  const dailyCost = tariff?.dailyCost ?? 0
  const daysLeft = dailyCost > 0 ? Math.ceil(balance / dailyCost) : 1000
  if (daysLeft >= 1000) {
    return null
  }

  const date = new Date()
  date.setTime(date.getTime() + daysLeft * 24 * 60 * 60 * 1000)

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: date.getFullYear() > new Date().getFullYear() ? 'numeric' : undefined,
  })
}

export function getBalanceChangeTypeDescription(type: string): string {
  switch (type) {
    case 'daily_tariff_debit':
      return 'Ежедневное списание согласно тарифу'
    case 'bonus':
      return 'Приветственный бонус'
    default:
      return type
  }
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('ru').format(amount)
}
