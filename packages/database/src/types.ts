import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from './tables'

export type { Database } from './connection'

export type User = InferSelectModel<typeof tables.users>
export type UserDraft = InferInsertModel<typeof tables.users>

export type UserQuota = InferSelectModel<typeof tables.userQuotas>
export type UserQuotaDraft = InferInsertModel<typeof tables.userQuotas>
export type UserQuotaKey = 'owned_spaces' | 'owned_emails'

export type Space = InferSelectModel<typeof tables.spaces>
export type SpaceDraft = InferInsertModel<typeof tables.spaces>

export type SpaceMember = InferSelectModel<typeof tables.spaceMembers>
export type SpaceMemberDraft = InferInsertModel<typeof tables.spaceMembers>

export type Tariff = InferSelectModel<typeof tables.tariffs>
export type TariffDraft = InferInsertModel<typeof tables.tariffs>

export type BalanceChange = InferSelectModel<typeof tables.balanceChanges>
export type BalanceChangeDraft = InferInsertModel<typeof tables.balanceChanges>
export type BalanceChangeType = 'replenishment' | 'daily_tariff_debit' | 'bonus'

export type Payment = InferSelectModel<typeof tables.payments>
export type PaymentDraft = InferInsertModel<typeof tables.payments>

export type Cluster = InferSelectModel<typeof tables.clusters>
export type ClusterDraft = InferInsertModel<typeof tables.clusters>

export type Bucket = InferSelectModel<typeof tables.buckets>
export type BucketDraft = InferInsertModel<typeof tables.buckets>

export type Service = InferSelectModel<typeof tables.services>
export type ServiceDraft = InferInsertModel<typeof tables.services>
export type ServiceType = 'public' | 'private'

export type ServiceOption = InferSelectModel<typeof tables.serviceOptions>
export type ServiceOptionDraft = InferInsertModel<typeof tables.serviceOptions>
export type ServiceOptionStatus = 'on_moderation' | 'active' | 'can_be_composed'
export type ServiceOptionType = 'string' | 'link' | 'secret'
export type ServiceOptionKey =
  'primary_website_url' |
  'primary_command_center_url' |
  'main_website_url' |
  'main_command_center_url' |
  'checkout_receiver_email' |
  'checkout_receiver_telegram'

export type Email = InferSelectModel<typeof tables.emails>
export type EmailDraft = InferInsertModel<typeof tables.emails>
export type EmailStatus = 'active' | 'inactive'

export type EmailReceiver = InferSelectModel<typeof tables.emailReceivers>
export type EmailReceiverDraft = InferInsertModel<typeof tables.emailReceivers>
export type EmailReceiverStatus = 'active' | 'inactive'
