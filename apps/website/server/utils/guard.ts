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
