import type { BalanceChange, Cluster, Payment, Service, ServiceOption } from '@nextorders/database'

type ServiceWithOptions = Service & { options: ServiceOption[] }

export const useSpaceStore = defineStore('space', () => {
  const id = ref('')
  const balance = ref(0)
  const tariffId = ref<string | undefined>(undefined)
  const name = ref('')
  const services = ref<ServiceWithOptions[]>([])
  const balanceChanges = ref<BalanceChange[]>([])
  const payments = ref<Payment[]>([])
  const cluster = ref<Pick<Cluster, 'balancerIp'> | null>(null)

  async function update(spaceId?: string) {
    try {
      const data = await $fetch(`/api/space/${spaceId ?? id.value}`, {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      id.value = data.id
      balance.value = data.balance
      tariffId.value = data.tariffId
      name.value = data.name
      services.value = data.services
      balanceChanges.value = data.balanceChanges
      payments.value = data.payments
      cluster.value = data.cluster
    } catch (error) {
      if (error instanceof Error) {
        // Do nothing
      }
    }
  }

  return {
    id,
    balance,
    tariffId,
    name,
    services,
    balanceChanges,
    payments,
    cluster,

    update,
  }
})
