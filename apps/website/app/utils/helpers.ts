export function getTariffsForSelect(): { value: string, label: string, icon: string, disabled?: boolean }[] {
  return [
    { value: 's49wrykl4wxvmf693tn6lqxn', label: 'Глазунья / 290 ₽ в месяц', icon: 'fluent-emoji-flat:cooking' },
    { value: 'uzd1qzders7p6j2idst1td81', label: 'Фондю / В разработке', icon: 'fluent-emoji-flat:fondue', disabled: true },
  ]
}

export function getTariffName(id: string) {
  switch (id) {
    case 'j7gb38bk5p14jbaffbuzggyh':
      return 'Нулевой'
    case 's49wrykl4wxvmf693tn6lqxn':
      return 'Глазунья'
    case 'uzd1qzders7p6j2idst1td81':
      return 'Фондю'
    default:
      return ''
  }
}

export function getTariffDailyCost(id: string) {
  switch (id) {
    case 'j7gb38bk5p14jbaffbuzggyh':
      return 0
    case 's49wrykl4wxvmf693tn6lqxn':
      return 9
    case 'uzd1qzders7p6j2idst1td81':
      return 38
    default:
      return 0
  }
}
