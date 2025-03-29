import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  email: varchar('email').notNull().unique(),
  name: varchar('name').notNull(),
  avatarUrl: varchar('avatar_url'),
})

export const spaces = pgTable('spaces', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  paidTo: timestamp('paid_to', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  status: varchar('status').notNull().default('active'),
  name: varchar('name').notNull(),
  balance: integer('balance').notNull().default(0),
  tariffId: cuid2('tariff_id').notNull().references(() => tariffs.id),
  ownerId: cuid2('owner_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const spaceMembers = pgTable('space_members', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  roles: text('roles').array().notNull().default([]),
  spaceId: cuid2('space_id').notNull().references(() => spaces.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const tariffs = pgTable('tariffs', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  description: text('description').notNull(),
  dailyCost: integer('daily_cost').notNull().default(0),
})

export const balanceChanges = pgTable('balance_changes', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  amount: integer('amount').notNull(),
  type: varchar('type').notNull(),
  description: text('description').notNull(),
  spaceId: cuid2('space_id').notNull().references(() => spaces.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const payments = pgTable('payments', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  amount: integer('amount').notNull(),
  externalId: varchar('external_id').notNull(),
  provider: varchar('provider').notNull(),
  status: varchar('status').notNull(),
  description: text('description').notNull(),
  spaceId: cuid2('space_id').notNull().references(() => spaces.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const usersRelations = relations(users, ({ many }) => ({
  spaces: many(spaces),
  memberInSpaces: many(spaceMembers),
  payments: many(payments),
}))

export const spacesRelations = relations(spaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [spaces.ownerId],
    references: [users.id],
  }),
  members: many(spaceMembers),
  tariff: one(tariffs, {
    fields: [spaces.tariffId],
    references: [tariffs.id],
  }),
  balanceChanges: many(balanceChanges),
  payments: many(payments),
}))

export const spaceMembersRelations = relations(spaceMembers, ({ one }) => ({
  space: one(spaces, {
    fields: [spaceMembers.spaceId],
    references: [spaces.id],
  }),
  user: one(users, {
    fields: [spaceMembers.userId],
    references: [users.id],
  }),
}))

export const tariffsRelations = relations(tariffs, ({ many }) => ({
  spaces: many(spaces),
}))

export const balanceChangesRelations = relations(balanceChanges, ({ one }) => ({
  space: one(spaces, {
    fields: [balanceChanges.spaceId],
    references: [spaces.id],
  }),
}))

export const paymentsRelations = relations(payments, ({ one }) => ({
  space: one(spaces, {
    fields: [payments.spaceId],
    references: [spaces.id],
  }),
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}))
