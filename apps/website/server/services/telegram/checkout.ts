export function formatCheckout(checkout: CheckoutForReceiver): string {
  // 1. Client info
  let text = `Новая заявка! #${checkout.id} \n\n`
  text += `👤 Имя: ${checkout.name} \n`
  text += `📞 Телефон: ${checkout.phone}`
  text += `\n\n`

  // 2. Address
  if (checkout.deliveryMethod === 'WAREHOUSE') {
    text += `📍 Адрес склада-кухни: ${checkout.warehouseAddress} \n`
  }
  if (checkout.deliveryMethod === 'DELIVERY') {
    text += formatAddress(checkout.address)
  }

  // 3. Time
  if (checkout.timeType === 'ASAP') {
    text += `🕒 Время доставки: Как можно быстрее`
  }
  if (checkout.timeType === 'SCHEDULED') {
    text += `🕒 Время доставки: ${checkout.time}`
  }
  text += `\n\n`

  // 4. Payment
  text += `💵 Сумма заказа: ${checkout.totalPrice} \n`
  text += `💳 Оплата: ${checkout.paymentMethodName} \n`
  if (checkout.change) {
    text += `💰 Нужна сдача с: ${checkout.change} \n`
  }
  text += `\n`

  if (checkout.note) {
    text += `📝 Комментарий: ${checkout.note} \n\n`
  }

  // 5. Items
  text += formatItems(checkout.items)

  return text
}

function formatAddress(address: CheckoutForReceiver['address']): string {
  if (!address) {
    return '📍 Адрес: Не указан \n'
  }

  let text = `📍 Адрес: ${address.street}`
  if (address?.flat) {
    text += `, кв./офис ${address.flat}`
  }
  if (address?.entrance) {
    text += `, подъезд ${address.entrance}`
  }
  if (address?.floor) {
    text += `, этаж ${address.floor}`
  }
  if (address?.doorphone) {
    text += `, домофон ${address.doorphone}`
  }
  text += `\n`

  if (address?.addressNote) {
    text += `Комментарий для курьера: ${address.addressNote} \n`
  }

  return text
}

function formatItems(items: CheckoutForReceiver['items']): string {
  let text = '🛒 Заказанные товары: \n\n'

  for (const item of items) {
    text += `${item.name} [${item.variant}] \n`
    text += `${item.quantity} шт. на сумму ${item.totalPrice} \n\n`
  }

  return text
}
