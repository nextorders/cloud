import type { User, UserQuota } from '@nextorders/database'

declare module 'h3' {
  interface Auth {
    user: User & {
      quotas: UserQuota[]
    }
  }

  interface H3EventContext {
    auth: Auth | null
  }
}

export default {}
