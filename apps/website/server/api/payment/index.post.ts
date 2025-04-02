export default defineEventHandler(async (event) => {
  const { auth } = event.context
  if (!auth?.user.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return { ok: true }
})
