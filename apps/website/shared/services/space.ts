import { z } from 'zod'

export const spaceCreateSchema = z.object({
  name: z.string().min(2).max(50),
  tariffId: z.string(),
})

export type SpaceCreateSchema = z.output<typeof spaceCreateSchema>

export const spaceUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
})

export type SpaceUpdateSchema = z.output<typeof spaceUpdateSchema>
