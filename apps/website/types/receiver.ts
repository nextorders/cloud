export interface CheckoutForReceiver {
  id: string
  deliveryMethod: 'DELIVERY' | 'WAREHOUSE'
  time: string
  timeType: 'ASAP' | 'SCHEDULED'
  paymentMethodName: string
  change?: string
  name: string
  phone: string
  note?: string
  totalPrice: number
  items: {
    id: string
    name: string
    variant: string
    quantity: number
    totalPrice: number
  }[]
  warehouseAddress?: string
  address?: {
    street: string
    flat?: string
    doorphone?: string
    entrance?: string
    floor?: string
    addressNote?: string
  }
}
