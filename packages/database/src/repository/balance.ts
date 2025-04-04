import type { BalanceChangeDraft, BalanceChangeType } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { balanceChanges, spaces } from '../tables'

export class Balance {
  static async change(data: BalanceChangeDraft & { type: BalanceChangeType }) {
    return useDatabase().transaction(
      async (tx) => {
        // Transaction: make change on Space balance
        const sign = Balance.getSignByType(data.type)
        const amount = data.amount * sign

        await tx
          .update(spaces)
          .set({ balance: sql`${spaces.balance} + ${amount}` })
          .where(eq(spaces.id, data.spaceId))

        // and create BalanceChange
        await tx.insert(balanceChanges).values(data)
      },
    )
  }

  static getSignByType(type: BalanceChangeType): 0 | 1 | -1 {
    switch (type) {
      case 'bonus':
      case 'replenishment':
        return 1
      case 'daily_tariff_debit':
        return -1
      default:
        return 0
    }
  }
}
