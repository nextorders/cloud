import { useDatabase } from '../database'

export class Email {
  static async find(id: string) {
    return useDatabase().query.emails.findFirst({
      where: (emails, { eq }) => eq(emails.id, id),
    })
  }
}
