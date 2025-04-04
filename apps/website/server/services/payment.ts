import { createId } from '@paralleldrive/cuid2'

interface YookassaPaymentData {
  amount: {
    value: number
    currency: 'RUB'
  }
  capture: boolean
  description: string
  metadata: Record<string, string>
  confirmation: {
    type: 'redirect'
    return_url: string
  }
}

interface YookassaPayment {
  id: string
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled'
  confirmation: {
    confirmation_url: string
  }
}

function getYookassaCredentials() {
  const { yookassa } = useRuntimeConfig()
  return btoa(`${yookassa.shopId}:${yookassa.apiKey}`)
}

export async function createYookassaPayment(paymentData: YookassaPaymentData): Promise<YookassaPayment | null> {
  try {
    const credentials = getYookassaCredentials()
    const data = await $fetch<YookassaPayment>(`https://api.yookassa.ru/v3/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
        'Idempotence-Key': createId(),
      },
      body: JSON.stringify(paymentData),
    })
    if (!data.id) {
      return null
    }

    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function checkYookassaPayment(id: string): Promise<'paid' | 'pending' | null> {
  try {
    const credentials = getYookassaCredentials()
    const data = await $fetch<YookassaPayment>(`https://api.yookassa.ru/v3/payments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
    })
    if (!data?.id || !data?.status) {
      return null
    }

    if (data.status === 'succeeded') {
      return 'paid'
    }
    if (data.status === 'pending') {
      return 'pending'
    }

    return null
  } catch (err) {
    console.error(err)
    return null
  }
}
