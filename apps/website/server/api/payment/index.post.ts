import { repository } from '@nextorders/database'
import { createId } from '@paralleldrive/cuid2'
import { createYookassaPayment } from '~~/server/services/payment'
import { paymentCreateSchema } from '~~/shared/services/payment'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = paymentCreateSchema.parse(body)

  const { user } = await getUserSession(event)
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const space = await repository.space.find(data.spaceId)
  if (!space?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Space not found',
    })
  }

  const paymentId = createId()
  const description = `Пополнение баланса ${space.id} пользователем ${user.id}`

  const paymentData = {
    amount: {
      value: data.amount,
      currency: 'RUB',
    },
    capture: true,
    description,
    metadata: {
      spaceId: space.id,
      userId: user.id,
    },
    confirmation: {
      type: 'redirect',
      return_url: `https://nextorders.ru/cabinet/space/${space.id}/balance?payment=${paymentId}`,
    },
  }

  const paymentOnProvider = await createYookassaPayment(paymentData)
  if (!paymentOnProvider?.id || !paymentOnProvider?.confirmation) {
    throw createError({
      status: 400,
      message: 'Payment creation error',
    })
  }

  const redirectUrl: string = paymentOnProvider.confirmation?.confirmation_url ?? '/'

  await repository.payment.create({
    id: paymentId,
    externalId: paymentOnProvider.id,
    provider: 'yookassa',
    status: 'pending',
    amount: data.amount,
    description,
    spaceId: space.id,
    userId: user.id,
  })

  return {
    ok: true,
    result: redirectUrl,
  }
})
