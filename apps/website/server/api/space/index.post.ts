import { repository } from '@nextorders/database'
import { createId } from '@paralleldrive/cuid2'
import { spaceCreateSchema } from '~~/shared/services/space'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const data = spaceCreateSchema.parse(body)
    const id = createId()

    const space = await repository.space.create({
      ...data,
      id,
    })

    return {
      ok: true,
      result: space,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
