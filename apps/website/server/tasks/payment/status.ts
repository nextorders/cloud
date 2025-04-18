import { repository } from '@nextorders/database'
import { checkYookassaPayment } from '~~/server/services/payment'
import { notify } from '~~/server/services/telegram/bot'

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
        const status = await checkYookassaPayment(payment.externalId)
        if (status === 'paid' && payment.status !== 'paid') {
          await repository.payment.setAsPaid(payment.id)

          await notify(`Payment: changed status ${payment.id} to ${status} (amount ${payment.amount})`)
          logger.log(`Payment ${payment.id} changed to ${status}`)
        }
      }
    } catch (error) {
      errorResolver(error)
    }

    return { result: true }
  },
})
