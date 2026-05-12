import type {
  Delivery,
  Dish,
  Merchant,
  Order,
  OrderItem,
  Promotion,
  Review,
  User,
  UserAddress
} from '../types/models'

export const users: User[] = [
  { id: 1, name: '小林同学', role: 'customer', phone: '13800001111', campus: '南校区' },
  { id: 2, name: '食堂档口A', role: 'merchant', phone: '13800002222', campus: '南校区' },
  { id: 3, name: '张骑手', role: 'rider', phone: '13800003333', campus: '南校区' }
]

export const merchants: Merchant[] = [
  { id: 101, name: '食堂档口A', campus: '南校区', category: '盖饭', description: '学生高性价比套餐', rating: 4.7 },
  { id: 102, name: '轻食沙拉铺', campus: '南校区', category: '轻食', description: '低脂高蛋白', rating: 4.8 }
]

export const promotions: Promotion[] = [
  { id: 1, merchantId: 101, title: '满20减5', description: '校园拼单优惠' },
  { id: 2, merchantId: 102, title: '第二份半价', description: '指定沙拉可参与' }
]

export const dishes: Dish[] = [
  { id: 1001, merchantId: 101, name: '黄焖鸡米饭', price: 18, stock: 99, description: '招牌畅销' },
  { id: 1002, merchantId: 101, name: '香菇鸡腿饭', price: 20, stock: 88, description: '新品推荐' },
  { id: 1003, merchantId: 102, name: '鸡胸肉藜麦沙拉', price: 22, stock: 56, description: '健身轻食' },
  { id: 1004, merchantId: 102, name: '牛油果金枪鱼沙拉', price: 25, stock: 33, description: '高蛋白套餐' }
]

export const addresses: UserAddress[] = [
  { id: 1, userId: 1, label: '宿舍', detail: '南校区 3号楼 302', isDefault: true },
  { id: 2, userId: 1, label: '图书馆', detail: '南校区 图书馆东门', isDefault: false }
]

export const orders: Order[] = [
  {
    id: 5001,
    userId: 1,
    merchantId: 101,
    merchantName: '食堂档口A',
    status: 'delivering',
    totalAmount: 38,
    createdAt: '2026-05-10 12:15',
    addressId: 1
  },
  {
    id: 5002,
    userId: 1,
    merchantId: 102,
    merchantName: '轻食沙拉铺',
    status: 'completed',
    totalAmount: 22,
    createdAt: '2026-05-09 18:02',
    addressId: 2
  }
]

export const orderItems: OrderItem[] = [
  { id: 1, orderId: 5001, dishId: 1001, dishName: '黄焖鸡米饭', price: 18, quantity: 1 },
  { id: 2, orderId: 5001, dishId: 1002, dishName: '香菇鸡腿饭', price: 20, quantity: 1 },
  { id: 3, orderId: 5002, dishId: 1003, dishName: '鸡胸肉藜麦沙拉', price: 22, quantity: 1 }
]

export const deliveries: Delivery[] = [
  { id: 7001, orderId: 5001, riderId: 3, riderName: '张骑手', status: 'delivering', note: '教学楼门口交付' },
  { id: 7002, orderId: 5002, riderId: 3, riderName: '张骑手', status: 'delivered', note: '已签收' }
]

export const reviews: Review[] = [
  { id: 1, orderId: 5002, userId: 1, merchantId: 102, score: 5, content: '很新鲜，配送快！', createdAt: '2026-05-09 19:10' }
]
