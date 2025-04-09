import type { Transporter } from 'nodemailer'
import { createTransport } from 'nodemailer'

let transporter: Transporter | null = null

const { email } = useRuntimeConfig()

export function getEmailTransporter() {
  if (transporter) {
    return transporter
  }

  transporter = createTransport({
    host: email.host,
    port: Number(email.port),
    secure: Number(email.port) === 465,
    tls: {
      rejectUnauthorized: !import.meta.dev,
    },
    auth: { user: email.auth.user, pass: email.auth.pass },
  })

  return transporter
}
