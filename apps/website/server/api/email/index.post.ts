import { repository } from '@nextorders/database'
import { render } from '@vue-email/render'
import ConfirmationLink from '~~/server/services/email/ConfirmationLink.vue'
import { getEmailTransporter } from '~~/server/services/email/transport'
import { notify } from '~~/server/services/telegram/bot'
import { emailCreateSchema } from '~~/shared/services/email'

export default defineEventHandler(async (event) => {
  const logger = useLogger('email')
  const { email } = useRuntimeConfig()

  const body = await readBody(event)
  const data = emailCreateSchema.parse(body)

  const { user } = await requireUserSession(event)

  const userInDB = await repository.user.find(user.id)
  if (!userInDB?.quotas) {
    throw createError({
      statusCode: 403,
      statusMessage: 'User quotas not found',
    })
  }

  const emailInDB = await repository.email.findByEmail(data.email, userInDB.id)
  if (emailInDB?.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already exists',
    })
  }

  quotaGuard(userInDB.quotas, 'owned_emails', 1)

  await repository.user.updateUsedQuota(userInDB.id, 'owned_emails', 1)

  const createdEmail = await repository.email.create({
    value: data.email,
    userId: userInDB.id,
  })
  if (!createdEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create email',
    })
  }

  const href = `https://nextorders.ru/api/email/${createdEmail.id}/confirm`

  const subject = 'Ссылка для подтверждения'
  const html = await render(ConfirmationLink, { href }, { pretty: true })
  const text = await render(ConfirmationLink, { href }, { plainText: true })

  const transporter = getEmailTransporter()

  const info = await transporter.sendMail({
    from: email.from,
    to: data.email,
    subject,
    text,
    html,
  })
  logger.log('Response from SMTP server:', info?.accepted?.length > 0 ? 'SUCCESS' : 'FAILED', info?.response, info?.messageId)

  await notify(`New email: ${userInDB.id} - ${data.email}`)

  return {
    ok: true,
  }
})
