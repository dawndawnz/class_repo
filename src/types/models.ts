export type UserRole = 'customer' | 'merchant' | 'rider'

export type OrderStatus =
  | 'placed'
  | 'paid'
  | 'accepted'
  | 'delivering'
  | 'completed'
  | 'canceled'
  | 'refunded'

export type DeliveryStatus = 'ready' | 'picked_up' | 'delivering' | 'delivered'

export interface User {
  id: number
  name: string
  role: UserRole
  phone: string
  campus: string
}

export interface Merchant {
  id: number
  name: string
  campus: string
  category: string
  description: string
  rating: number
  imageUrl?: string
  deliveryTime?: number
  deliveryFee?: number
  minOrder?: number
  monthSales?: number
}

export interface Promotion {
  id: number
  merchantId: number
  title: string
  description: string
}

export interface Dish {
  id: number
  merchantId: number
  name: string
  price: number
  stock: number
  description: string
  imageUrl?: string
  salesCount?: number
}

export interface UserAddress {
  id: number
  userId: number
  label: string
  detail: string
  isDefault: boolean
}

export interface OrderItem {
  id: number
  orderId: number
  dishId: number
  dishName: string
  price: number
  quantity: number
}

export interface Order {
  id: number
  userId: number
  merchantId: number
  merchantName: string
  status: OrderStatus
  totalAmount: number
  createdAt: string
  addressId: number
}

export interface Delivery {
  id: number
  orderId: number
  riderId: number | null
  riderName?: string
  status: DeliveryStatus
  note: string
}

export interface Review {
  id: number
  orderId: number
  userId: number
  merchantId: number
  score: number
  content: string
  createdAt: string
}

export interface OrderWithItems extends Order {
  items: OrderItem[]
  delivery?: Delivery
}
