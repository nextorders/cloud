import { randomBytes } from 'node:crypto'

export function getToken(): string {
  return randomBytes(32).toString('hex')
}
