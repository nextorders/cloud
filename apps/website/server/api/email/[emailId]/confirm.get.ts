import { repository } from '@nextorders/database'
import { notify } from '~~/server/services/telegram/bot'

export default defineEventHandler(async (event) => {
  const emailId = getRouterParam(event, 'emailId')
  if (!emailId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email id is required',
    })
  }

  const email = await repository.email.find(emailId)
  if (!email?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Email not found',
    })
  }

  if (email.status !== 'active') {
    await repository.email.setAsActive(email.id)

    await notify(`Email updated: active ${email.id} - ${email.value}`)
  }

  return sendRedirect(event, '/')
})
