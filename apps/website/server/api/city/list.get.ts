import { repository } from '@nextorders/database'

export default defineEventHandler(() => {
  return repository.city.list()
})
