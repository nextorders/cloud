import { createId } from '@paralleldrive/cuid2'

export async function createYookassaPayment(paymentData: any) {
  try {
    const { yookassa } = useRuntimeConfig()
    const credentials = btoa(`${yookassa.shopId}:${yookassa.apiKey}`)
    const res = await fetch(`https://api.yookassa.ru/v3/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
        'Idempotence-Key': createId(),
      },
      body: JSON.stringify(paymentData),
    })

    return res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function checkYookassaPayment(id: string): Promise<'paid' | 'pending' | null> {
  try {
    const { yookassa } = useRuntimeConfig()
    const credentials = btoa(`${yookassa.shopId}:${yookassa.apiKey}`)
    const res = await fetch(`https://api.yookassa.ru/v3/payments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
    })

    const paymentOnProvider = await res.json()
    if (!paymentOnProvider?.id) {
      return null
    }

    if (paymentOnProvider.status === 'succeeded') {
      return 'paid'
    }
    if (paymentOnProvider.status === 'pending') {
      return 'pending'
    }

    return null
  } catch (err) {
    console.error(err)
    return null
  }
}
