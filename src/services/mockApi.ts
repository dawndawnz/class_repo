import { deliveries, dishes, merchants, orderItems, orders, promotions, reviews, users, addresses } from '../mocks/data'
import type {
  Delivery,
  DeliveryStatus,
  Dish,
  Merchant,
  Order,
  OrderStatus,
  OrderWithItems,
  Review,
  User,
  UserAddress,
  UserRole
} from '../types/models'

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

let localDishes = clone(dishes)
let localOrders = clone(orders)
let localOrderItems = clone(orderItems)
let localDeliveries = clone(deliveries)
let localReviews = clone(reviews)
let localAddresses = clone(addresses)

export async function loginByRole(role: UserRole): Promise<User> {
  await wait()
  const user = users.find((item) => item.role === role)
  return clone(user ?? users[0])
}

export async function getMerchants(): Promise<Merchant[]> {
  await wait()
  return clone(merchants)
}

export async function getPromotions(): Promise<typeof promotions> {
  await wait()
  return clone(promotions)
}

export async function getMerchantById(merchantId: number): Promise<Merchant | undefined> {
  await wait()
  return clone(merchants.find((m) => m.id === merchantId))
}

export async function getDishesByMerchant(merchantId: number): Promise<Dish[]> {
  await wait()
  return clone(localDishes.filter((dish) => dish.merchantId === merchantId))
}

export async function getUserOrders(userId: number): Promise<OrderWithItems[]> {
  await wait()
  return clone(
    localOrders
      .filter((order) => order.userId === userId)
      .map((order) => ({
        ...order,
        items: localOrderItems.filter((item) => item.orderId === order.id),
        delivery: localDeliveries.find((delivery) => delivery.orderId === order.id)
      }))
  )
}

export async function getOrderDetail(orderId: number): Promise<OrderWithItems | undefined> {
  await wait()
  const order = localOrders.find((item) => item.id === orderId)
  if (!order) return undefined
  return clone({
    ...order,
    items: localOrderItems.filter((item) => item.orderId === order.id),
    delivery: localDeliveries.find((delivery) => delivery.orderId === order.id)
  })
}

export async function createOrder(input: {
  userId: number
  merchantId: number
  merchantName: string
  addressId: number
  items: Array<{ dishId: number; dishName: string; price: number; quantity: number }>
}): Promise<Order> {
  await wait()
  const nextId = Math.max(...localOrders.map((item) => item.id)) + 1
  const order: Order = {
    id: nextId,
    userId: input.userId,
    merchantId: input.merchantId,
    merchantName: input.merchantName,
    status: 'paid',
    totalAmount: input.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    addressId: input.addressId
  }

  localOrders = [order, ...localOrders]
  localOrderItems = [
    ...localOrderItems,
    ...input.items.map((item, index) => ({
      id: localOrderItems.length + index + 1,
      orderId: order.id,
      ...item
    }))
  ]
  localDeliveries = [
    {
      id: Math.max(...localDeliveries.map((item) => item.id)) + 1,
      orderId: order.id,
      riderId: null,
      status: 'ready',
      note: '等待骑手接单'
    },
    ...localDeliveries
  ]

  return clone(order)
}

export async function createReview(payload: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  await wait()
  const review: Review = {
    ...payload,
    id: localReviews.length + 1,
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
  }
  localReviews = [review, ...localReviews]
  return clone(review)
}

export async function getMerchantOrders(merchantId: number): Promise<OrderWithItems[]> {
  await wait()
  return clone(
    localOrders
      .filter((order) => order.merchantId === merchantId)
      .map((order) => ({
        ...order,
        items: localOrderItems.filter((item) => item.orderId === order.id)
      }))
  )
}

export async function updateOrderStatus(orderId: number, status: OrderStatus): Promise<void> {
  await wait()
  localOrders = localOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
}

export async function getMerchantDishes(merchantId: number): Promise<Dish[]> {
  await wait()
  return clone(localDishes.filter((dish) => dish.merchantId === merchantId))
}

export async function updateDishStock(dishId: number, stock: number): Promise<void> {
  await wait()
  localDishes = localDishes.map((dish) => (dish.id === dishId ? { ...dish, stock } : dish))
}

export async function getAvailableDeliveries(): Promise<Array<Delivery & { order: Order }>> {
  await wait()
  return clone(
    localDeliveries
      .filter((delivery) => delivery.riderId === null || delivery.status !== 'delivered')
      .map((delivery) => ({
        ...delivery,
        order: localOrders.find((order) => order.id === delivery.orderId) as Order
      }))
  )
}

export async function assignDelivery(deliveryId: number, rider: User): Promise<void> {
  await wait()
  localDeliveries = localDeliveries.map((delivery) =>
    delivery.id === deliveryId ? { ...delivery, riderId: rider.id, riderName: rider.name, status: 'picked_up' } : delivery
  )
}

export async function getDeliveryDetail(deliveryId: number): Promise<(Delivery & { order: Order }) | undefined> {
  await wait()
  const delivery = localDeliveries.find((item) => item.id === deliveryId)
  if (!delivery) return undefined
  const order = localOrders.find((item) => item.id === delivery.orderId)
  if (!order) return undefined
  return clone({ ...delivery, order })
}

export async function updateDeliveryStatus(deliveryId: number, status: DeliveryStatus): Promise<void> {
  await wait()
  localDeliveries = localDeliveries.map((delivery) => (delivery.id === deliveryId ? { ...delivery, status } : delivery))
}

export async function getReviewsByMerchant(merchantId: number): Promise<Review[]> {
  await wait()
  return clone(localReviews.filter((r) => r.merchantId === merchantId))
}

export async function getUserAddresses(userId: number): Promise<UserAddress[]> {
  await wait()
  return clone(localAddresses.filter((address) => address.userId === userId))
}

export async function setDefaultAddress(addressId: number, userId: number): Promise<void> {
  await wait()
  localAddresses = localAddresses.map((address) => {
    if (address.userId !== userId) return address
    return { ...address, isDefault: address.id === addressId }
  })
}
