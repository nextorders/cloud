import { z } from 'zod'

export const emailCreateSchema = z.object({
  email: z.string().email(),
})

export type EmailCreateSchema = z.output<typeof emailCreateSchema>
