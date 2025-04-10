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

export const userQuotas = pgTable('user_quotas', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  key: varchar('key').notNull(),
  used: integer('used').notNull().default(0),
  limit: integer('limit').notNull().default(0),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
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
  clusterId: cuid2('cluster_id').notNull().references(() => clusters.id),
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
  icon: varchar('icon').notNull(),
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

export const clusters = pgTable('clusters', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  balancerIp: varchar('balancer_ip').notNull(),
  server: varchar('server').notNull(),
  certificateAuthorityData: text('certificate_authority_data').notNull(),
  clientCertificateData: text('client_certificate_data'),
  clientKeyData: text('client_key_data'),
  userToken: text('user_token'),
})

export const buckets = pgTable('buckets', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  region: varchar('region').notNull(),
  endpoint: varchar('endpoint').notNull(),
  accessKeyId: varchar('access_key_id').notNull(),
  secretAccessKey: varchar('secret_access_key').notNull(),
  publicUrl: varchar('public_url').notNull(),
  sizeGb: integer('size_gb').notNull(),
  status: varchar('status').notNull().default('ready'),
  serviceId: cuid2('service_id').references(() => services.id),
})

export const services = pgTable('services', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  image: varchar('image').notNull(),
  version: varchar('version').notNull(),
  type: varchar('type').notNull(),
  apiToken: varchar('api_token'),
  spaceId: cuid2('space_id').notNull().references(() => spaces.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const serviceOptions = pgTable('service_options', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  key: varchar('key').notNull(),
  value: varchar('value'),
  status: varchar('status').notNull().default('on_moderation'),
  type: varchar('type').notNull(),
  serviceId: cuid2('service_id').notNull().references(() => services.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const emails = pgTable('emails', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  value: varchar('value').notNull(),
  status: varchar('status').notNull().default('inactive'),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const emailReceivers = pgTable('email_receivers', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).notNull().defaultNow(),
  token: varchar('token').notNull(),
  status: varchar('status').notNull().default('active'),
  emailId: cuid2('email_id').notNull().references(() => emails.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  serviceId: cuid2('service_id').notNull().references(() => services.id),
})

export const usersRelations = relations(users, ({ many }) => ({
  spaces: many(spaces),
  memberInSpaces: many(spaceMembers),
  payments: many(payments),
  quotas: many(userQuotas),
  emails: many(emails),
}))

export const userQuotasRelations = relations(userQuotas, ({ one }) => ({
  user: one(users, {
    fields: [userQuotas.userId],
    references: [users.id],
  }),
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
  cluster: one(clusters, {
    fields: [spaces.clusterId],
    references: [clusters.id],
  }),
  services: many(services),
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

export const clustersRelations = relations(clusters, ({ many }) => ({
  spaces: many(spaces),
}))

export const bucketsRelations = relations(buckets, ({ one }) => ({
  service: one(services, {
    fields: [buckets.serviceId],
    references: [services.id],
  }),
}))

export const servicesRelations = relations(services, ({ one, many }) => ({
  space: one(spaces, {
    fields: [services.spaceId],
    references: [spaces.id],
  }),
  buckets: many(buckets),
  options: many(serviceOptions),
  emailReceivers: many(emailReceivers),
}))

export const serviceOptionsRelations = relations(serviceOptions, ({ one }) => ({
  service: one(services, {
    fields: [serviceOptions.serviceId],
    references: [services.id],
  }),
}))

export const emailsRelations = relations(emails, ({ one, many }) => ({
  user: one(users, {
    fields: [emails.userId],
    references: [users.id],
  }),
  receivers: many(emailReceivers),
}))

export const emailReceiversRelations = relations(emailReceivers, ({ one }) => ({
  email: one(emails, {
    fields: [emailReceivers.emailId],
    references: [emails.id],
  }),
  service: one(services, {
    fields: [emailReceivers.serviceId],
    references: [services.id],
  }),
}))
