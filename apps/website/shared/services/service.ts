import type { ServiceOptionKey } from '@nextorders/database'

export function getServiceOptionData(key: ServiceOptionKey) {
  switch (key) {
    case 'primary_website_url':
      return {
        title: 'Веб-сайт',
        description: 'Базовая ссылка. Здесь клиент может создать заказ.',
      }
    case 'primary_command_center_url':
      return {
        title: 'Панель управления веб-сайтом',
        description: 'Базовая ссылка. Откройте и продолжите работу как администратор.',
      }
    case 'main_website_url':
      return {
        title: 'Веб-сайт',
        description: 'Основная ссылка. Здесь клиент может создать заказ.',
      }
    case 'main_command_center_url':
      return {
        title: 'Панель управления веб-сайтом',
        description: 'Основная ссылка. Откройте и продолжите работу как администратор.',
      }
    default:
      return null
  }
}
