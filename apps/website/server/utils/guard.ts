import type { UserQuotaKey } from '@nextorders/database'
import type { Auth, H3Event } from 'h3'

export function accessAuthGuard(event: H3Event): Auth {
  const { auth } = event.context

  if (!auth) {
    throw createError({
      statusMessage: 'Forbidden',
      statusCode: 403,
    })
  }

  return auth
}

export function quotaGuard(event: H3Event, key: UserQuotaKey, need: number = 1): void {
  const auth = accessAuthGuard(event)
  const quota = auth.user.quotas.find((q) => q.key === key)
  if (!quota) {
    throw createError({
      statusMessage: 'User quota not found',
      statusCode: 403,
    })
  }

  if (quota.used >= quota.limit || quota.used + need > quota.limit) {
    throw createError({
      statusCode: 403,
      statusMessage: 'User quota limit exceeded',
    })
  }
}
