import type { PointDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { points } from '../tables'

export class Point {
  static async find(id: string) {
    return useDatabase().query.points.findFirst({
      where: (points, { eq }) => eq(points.id, id),
    })
  }

  static async list() {
    return useDatabase().query.points.findMany()
  }

  static async create(data: PointDraft) {
    const [point] = await useDatabase().insert(points).values(data).returning()
    return point
  }

  static async update(id: string, data: Partial<PointDraft>) {
    const [point] = await useDatabase()
      .update(points)
      .set(data)
      .where(eq(points.id, id))
      .returning()
    return point
  }

  static async delete(id: string) {
    return useDatabase().delete(points).where(eq(points.id, id))
  }
}
