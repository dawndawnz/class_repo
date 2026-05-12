import type { DeliveryStatus, OrderStatus } from '../types/models'

export const orderStatusLabel: Record<OrderStatus, string> = {
  placed: '已下单',
  paid: '已支付',
  accepted: '商家已接单',
  delivering: '配送中',
  completed: '已完成',
  canceled: '已取消',
  refunded: '已退款'
}

export const deliveryStatusLabel: Record<DeliveryStatus, string> = {
  ready: '待取餐',
  picked_up: '已取餐',
  delivering: '配送中',
  delivered: '已送达'
}

export const orderTimeline: OrderStatus[] = ['placed', 'paid', 'accepted', 'delivering', 'completed']
