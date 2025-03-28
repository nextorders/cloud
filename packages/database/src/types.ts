import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from './tables'

export type { Database } from './connection'

export type User = InferSelectModel<typeof tables.users>
export type UserDraft = InferInsertModel<typeof tables.users>

export type Space = InferSelectModel<typeof tables.spaces>
export type SpaceDraft = InferInsertModel<typeof tables.spaces>

export type SpaceMember = InferSelectModel<typeof tables.spaceMembers>
export type SpaceMemberDraft = InferInsertModel<typeof tables.spaceMembers>

export type Tariff = InferSelectModel<typeof tables.tariffs>
export type TariffDraft = InferInsertModel<typeof tables.tariffs>
