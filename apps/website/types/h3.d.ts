import type { User } from '@nextorders/database'

declare module 'h3' {
  interface Auth {
    user: User
  }

  interface H3EventContext {
    auth: Auth | null
  }
}

export default {}
