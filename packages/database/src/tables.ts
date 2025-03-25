import { cuid2 } from 'drizzle-cuid2/postgres'
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  email: varchar('email').notNull().unique(),
  name: varchar('name').notNull(),
  avatarUrl: varchar('avatar_url'),
})
