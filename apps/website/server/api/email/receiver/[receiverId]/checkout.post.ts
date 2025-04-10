import { repository } from '@nextorders/database'
import { render } from '@vue-email/render'
import NewCheckout from '~~/server/services/email/NewCheckout.vue'
import { getEmailTransporter } from '~~/server/services/email/transport'

export default defineEventHandler(async (event) => {
  try {
    const logger = useLogger('email')
    const { email } = useRuntimeConfig()

    const receiverId = getRouterParam(event, 'receiverId')
    if (!receiverId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const receiver = await repository.email.findReceiver(receiverId)
    if (!receiver) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Email not found',
      })
    }

    const bearerToken = getHeader(event, 'Authorization')
    const key = bearerToken?.startsWith('Bearer ') ? bearerToken.substring(7) : bearerToken

    if (!receiver.token || !key || receiver.token !== key) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      })
    }

    const body = await readBody(event)
    const checkout = body.checkout

    const subject = 'Новая заявка!'
    const html = await render(NewCheckout, checkout, { pretty: true })
    const text = await render(NewCheckout, checkout, { plainText: true })

    const transporter = getEmailTransporter()

    const info = await transporter.sendMail({
      from: email.from,
      to: receiver.email.value,
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
