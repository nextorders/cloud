import { z } from 'zod'

export const paymentCreateSchema = z.object({
  amount: z.number().min(10).max(999999),
  spaceId: z.string(),
})

export type PaymentCreateSchema = z.output<typeof paymentCreateSchema>
