import { repository } from '@nextorders/database'

const logger = useLogger('payment:status')

export default defineTask({
  meta: {
    name: 'payment:status',
    description: 'Watch if payment status changed',
  },
  async run() {
    // Only on prod
    if (import.meta.dev) {
      return { result: true }
    }

    try {
      const payments = await repository.payment.findPending()

      for (const payment of payments) {
        const status = await checkPayment(payment.externalId)
        if (status === 'paid' && payment.status !== 'paid') {
          await repository.payment.setAsPaid(payment.id)

          logger.log(`Payment ${payment.id} changed to ${status}`)
        }
      }
    } catch (error) {
      errorResolver(error)
    }

    return { result: true }
  },
})

async function checkPayment(id: string): Promise<'paid' | 'pending' | null> {
  try {
    const { yookassa } = useRuntimeConfig()
    const credentials = btoa(`${yookassa.shopId}:${yookassa.apiKey}`)
    const res = await fetch(`https://api.yookassa.ru/v3/payments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
    })

    const paymentOnProvider = await res.json()
    if (!paymentOnProvider?.id) {
      return null
    }

    if (paymentOnProvider.status === 'succeeded') {
      return 'paid'
    }
    if (paymentOnProvider.status === 'pending') {
      return 'pending'
    }

    return null
  } catch (err) {
    console.error(err)
    return null
  }
}
