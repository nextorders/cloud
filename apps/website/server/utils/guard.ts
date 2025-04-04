import type { UserQuota, UserQuotaKey } from '@nextorders/database'

export function quotaGuard(quotas: UserQuota[], key: UserQuotaKey, need: number = 1): void {
  if (need <= 0) {
    throw createError({
      statusMessage: 'Invalid quota need value',
      statusCode: 400,
    })
  }

  if (!quotas || !Array.isArray(quotas)) {
    throw createError({
      statusMessage: 'User quotas not available',
      statusCode: 403,
    })
  }

  const quota = quotas.find((q) => q.key === key)
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
