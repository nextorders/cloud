import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from './tables'

export type { Database } from './connection'

export type User = InferSelectModel<typeof tables.users>
export type UserDraft = InferInsertModel<typeof tables.users>

export type UserQuota = InferSelectModel<typeof tables.userQuotas>
export type UserQuotaDraft = InferInsertModel<typeof tables.userQuotas>
export type UserQuotaKey = 'owned_spaces'

export type Space = InferSelectModel<typeof tables.spaces>
export type SpaceDraft = InferInsertModel<typeof tables.spaces>

export type SpaceMember = InferSelectModel<typeof tables.spaceMembers>
export type SpaceMemberDraft = InferInsertModel<typeof tables.spaceMembers>

export type Tariff = InferSelectModel<typeof tables.tariffs>
export type TariffDraft = InferInsertModel<typeof tables.tariffs>

export type BalanceChange = InferSelectModel<typeof tables.balanceChanges>
export type BalanceChangeDraft = InferInsertModel<typeof tables.balanceChanges>

export type Payment = InferSelectModel<typeof tables.payments>
export type PaymentDraft = InferInsertModel<typeof tables.payments>

export type Cluster = InferSelectModel<typeof tables.clusters>
export type ClusterDraft = InferInsertModel<typeof tables.clusters>

export type Bucket = InferSelectModel<typeof tables.buckets>
export type BucketDraft = InferInsertModel<typeof tables.buckets>
