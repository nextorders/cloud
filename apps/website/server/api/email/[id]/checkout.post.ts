import { repository } from '@nextorders/database'
import { render } from '@vue-email/render'
import { createTransport } from 'nodemailer'
import NewCheckout from '~~/server/services/email/NewCheckout.vue'

export default defineEventHandler(async (event) => {
  try {
    const logger = useLogger('email')
    const { email } = useRuntimeConfig(event)

    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const emailInDB = await repository.email.find(id)
    if (!emailInDB) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Email not found',
      })
    }

    const bearer = getHeader(event, 'Authorization')
    const key = bearer?.replace('Bearer ', '')

    if (!emailInDB.token || !key || emailInDB.token !== key) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      })
    }

    const body = await readBody(event)

    const subject = 'Новая заявка!'
    const html = await render(NewCheckout, body, { pretty: true })
    const text = await render(NewCheckout, body, { plainText: true })

    const transporter = createTransport({
      host: email.host,
      port: Number(email.port),
      secure: Number(email.port) === 465,
      tls: {
        rejectUnauthorized: false,
      },
      auth: { user: email.auth.user, pass: email.auth.pass },
    })

    const info = await transporter.sendMail({
      from: email.from,
      to: emailInDB.to,
      subject,
      text,
      html,
    })
    logger.log('Response from SMTP server:', info?.accepted?.length > 0 ? 'SUCCESS' : 'FAILED', info?.response, info?.messageId)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
