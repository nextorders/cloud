import type { PaymentDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { payments } from '../tables'
import { Balance } from './balance'
import { Space } from './space'

export class Payment {
  static async find(id: string) {
    return useDatabase().query.payments.findFirst({
      where: (payments, { eq }) => eq(payments.id, id),
    })
  }

  static async findPending() {
    return useDatabase().query.payments.findMany({
      where: (payments, { eq, and, sql }) => and(
        eq(payments.status, 'pending'),
        sql`${payments.createdAt} > now() - interval '4 hours'`,
      ),
    })
  }

  static async create(data: PaymentDraft) {
    const [payment] = await useDatabase().insert(payments).values(data).returning()
    return payment
  }

  static async setAsPaid(id: string) {
    const payment = await Payment.find(id)
    if (!payment) {
      return
    }

    const space = await Space.find(payment.spaceId)
    if (!space) {
      return
    }

    await Balance.change({
      type: 'replenishment',
      spaceId: space?.id,
      amount: payment.amount,
      description: 'Пополнение баланса',
    })

    await useDatabase()
      .update(payments)
      .set({ status: 'paid', updatedAt: sql`now()` })
      .where(eq(payments.id, id))
  }
}
