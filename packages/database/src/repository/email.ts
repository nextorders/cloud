import type { EmailDraft, EmailReceiverDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { emailReceivers, emails } from '../tables'

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

  static async findByEmail(email: string, userId: string) {
    return useDatabase().query.emails.findFirst({
      where: (emails, { eq, and }) => and(eq(emails.value, email), eq(emails.userId, userId)),
    })
  }

  static async create(data: EmailDraft) {
    const [email] = await useDatabase().insert(emails).values(data).returning()
    return email
  }

  static async createReceiver(data: EmailReceiverDraft) {
    const [emailReceiver] = await useDatabase()
      .insert(emailReceivers)
      .values(data)
      .returning()
    return emailReceiver
  }

  static async setAsActive(id: string) {
    await useDatabase()
      .update(emails)
      .set({ status: 'active' })
      .where(eq(emails.id, id))
  }
}
