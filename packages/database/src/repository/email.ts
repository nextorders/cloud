import type { EmailDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { emails } from '../tables'

export class Email {
  static async find(id: string) {
    return useDatabase().query.emails.findFirst({
      where: (emails, { eq }) => eq(emails.id, id),
    })
  }

  static async findReceiver(id: string) {
    return useDatabase().query.emailReceivers.findFirst({
      where: (emailReceivers, { eq }) => eq(emailReceivers.id, id),
      with: {
        email: true,
      },
    })
  }

  static async findByEmail(email: string) {
    return useDatabase().query.emails.findFirst({
      where: (emails, { eq }) => eq(emails.value, email),
    })
  }

  static async create(data: EmailDraft) {
    const [email] = await useDatabase().insert(emails).values(data).returning()
    return email
  }

  static async setAsActive(id: string) {
    await useDatabase()
      .update(emails)
      .set({ status: 'active' })
      .where(eq(emails.id, id))
  }
}
