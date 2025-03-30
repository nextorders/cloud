import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { buckets } from '../tables'

export class Bucket {
  static async getReadyForUse() {
    return useDatabase().query.buckets.findFirst({
      where: (buckets, { eq }) => eq(buckets.status, 'ready'),
    })
  }

  static async setAsInUse(id: string) {
    await useDatabase()
      .update(buckets)
      .set({ status: 'in_use' })
      .where(eq(buckets.id, id))
  }
}
