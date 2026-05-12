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
  { id: 2, name: '黄焖鸡外卖店', role: 'merchant', phone: '13800002222', campus: '南校区' },
  { id: 3, name: '张骑手', role: 'rider', phone: '13800003333', campus: '南校区' }
]

export const merchants: Merchant[] = [
  {
    id: 101,
    name: '老街黄焖鸡米饭',
    campus: '南校区',
    category: '盖饭',
    description: '招牌黄焖鸡，学生最爱，每日现烹',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/merchant101/800/400',
    deliveryTime: 25,
    deliveryFee: 2,
    minOrder: 15,
    monthSales: 1200
  },
  {
    id: 102,
    name: '轻食实验室',
    campus: '南校区',
    category: '轻食',
    description: '健康低脂，高蛋白轻食，健身党首选',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/merchant102/800/400',
    deliveryTime: 20,
    deliveryFee: 0,
    minOrder: 20,
    monthSales: 860
  },
  {
    id: 103,
    name: '蜀味川菜馆',
    campus: '南校区',
    category: '川菜',
    description: '正宗川菜，麻辣鲜香，实惠管饱',
    rating: 4.6,
    imageUrl: 'https://picsum.photos/seed/merchant103/800/400',
    deliveryTime: 30,
    deliveryFee: 3,
    minOrder: 18,
    monthSales: 950
  },
  {
    id: 104,
    name: '湾仔码头港式茶餐厅',
    campus: '北校区',
    category: '港式',
    description: '港式叉烧饭、奶茶，还原正宗香港味道',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/seed/merchant104/800/400',
    deliveryTime: 35,
    deliveryFee: 4,
    minOrder: 25,
    monthSales: 700
  },
  {
    id: 105,
    name: '一鸣面馆',
    campus: '南校区',
    category: '面食',
    description: '手工现拉面条，汤底鲜美，营养均衡',
    rating: 4.5,
    imageUrl: 'https://picsum.photos/seed/merchant105/800/400',
    deliveryTime: 22,
    deliveryFee: 2,
    minOrder: 12,
    monthSales: 1050
  },
  {
    id: 106,
    name: '嗒嗒奶茶铺',
    campus: '南校区',
    category: '饮品',
    description: '鲜制奶茶、果茶，每日新鲜制作',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/merchant106/800/400',
    deliveryTime: 15,
    deliveryFee: 0,
    minOrder: 10,
    monthSales: 2000
  }
]

export const promotions: Promotion[] = [
  { id: 1, merchantId: 101, title: '满20减5', description: '校园拼单优惠' },
  { id: 2, merchantId: 102, title: '第二份半价', description: '指定沙拉可参与' },
  { id: 3, merchantId: 103, title: '新用户立减8元', description: '首单优惠' },
  { id: 4, merchantId: 104, title: '满30减8', description: '午餐高峰优惠' },
  { id: 5, merchantId: 105, title: '免配送费', description: '本周限定' },
  { id: 6, merchantId: 106, title: '买二送一', description: '指定饮品参与' }
]

export const dishes: Dish[] = [
  {
    id: 1001, merchantId: 101, name: '黄焖鸡米饭（大份）', price: 22, stock: 99,
    description: '招牌畅销，土鸡烹制，肉嫩汁浓',
    imageUrl: 'https://picsum.photos/seed/dish1001/400/300',
    salesCount: 5800
  },
  {
    id: 1002, merchantId: 101, name: '香菇鸡腿饭', price: 20, stock: 88,
    description: '新品推荐，香菇提鲜，鸡腿软烂',
    imageUrl: 'https://picsum.photos/seed/dish1002/400/300',
    salesCount: 2300
  },
  {
    id: 1003, merchantId: 101, name: '土豆牛腩饭', price: 25, stock: 60,
    description: '慢炖牛腩，土豆绵软，分量十足',
    imageUrl: 'https://picsum.photos/seed/dish1003/400/300',
    salesCount: 1900
  },
  {
    id: 1004, merchantId: 102, name: '鸡胸肉藜麦沙拉', price: 22, stock: 56,
    description: '低脂健身之选，蛋白充足',
    imageUrl: 'https://picsum.photos/seed/dish1004/400/300',
    salesCount: 1200
  },
  {
    id: 1005, merchantId: 102, name: '牛油果金枪鱼沙拉', price: 28, stock: 33,
    description: '高蛋白套餐，omega-3丰富',
    imageUrl: 'https://picsum.photos/seed/dish1005/400/300',
    salesCount: 880
  },
  {
    id: 1006, merchantId: 102, name: '紫薯燕麦碗', price: 18, stock: 40,
    description: '全谷物营养餐，低GI饱腹',
    imageUrl: 'https://picsum.photos/seed/dish1006/400/300',
    salesCount: 650
  },
  {
    id: 1007, merchantId: 103, name: '夫妻肺片', price: 16, stock: 80,
    description: '麻辣鲜香，正宗川味',
    imageUrl: 'https://picsum.photos/seed/dish1007/400/300',
    salesCount: 2100
  },
  {
    id: 1008, merchantId: 103, name: '麻婆豆腐套餐', price: 18, stock: 70,
    description: '豆腐嫩滑，麻辣下饭',
    imageUrl: 'https://picsum.photos/seed/dish1008/400/300',
    salesCount: 1800
  },
  {
    id: 1009, merchantId: 104, name: '港式叉烧饭', price: 28, stock: 50,
    description: '蜜汁叉烧，港式风味',
    imageUrl: 'https://picsum.photos/seed/dish1009/400/300',
    salesCount: 900
  },
  {
    id: 1010, merchantId: 104, name: '港式奶茶（热/冰）', price: 12, stock: 100,
    description: '丝袜奶茶，浓郁顺滑',
    imageUrl: 'https://picsum.photos/seed/dish1010/400/300',
    salesCount: 3200
  },
  {
    id: 1011, merchantId: 105, name: '番茄鸡蛋面', price: 14, stock: 99,
    description: '经典搭配，汤底鲜美',
    imageUrl: 'https://picsum.photos/seed/dish1011/400/300',
    salesCount: 4500
  },
  {
    id: 1012, merchantId: 105, name: '红烧牛肉面', price: 22, stock: 60,
    description: '大块牛肉，浓郁汤底',
    imageUrl: 'https://picsum.photos/seed/dish1012/400/300',
    salesCount: 2800
  },
  {
    id: 1013, merchantId: 106, name: '珍珠奶茶', price: 12, stock: 200,
    description: '经典珍珠，Q弹爽滑',
    imageUrl: 'https://picsum.photos/seed/dish1013/400/300',
    salesCount: 8800
  },
  {
    id: 1014, merchantId: 106, name: '芋泥波波奶茶', price: 16, stock: 150,
    description: '芋泥香浓，多种波波',
    imageUrl: 'https://picsum.photos/seed/dish1014/400/300',
    salesCount: 5600
  }
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
    merchantName: '老街黄焖鸡米饭',
    status: 'delivering',
    totalAmount: 42,
    createdAt: '2026-05-10 12:15',
    addressId: 1
  },
  {
    id: 5002,
    userId: 1,
    merchantId: 102,
    merchantName: '轻食实验室',
    status: 'completed',
    totalAmount: 22,
    createdAt: '2026-05-09 18:02',
    addressId: 2
  },
  {
    id: 5003,
    userId: 1,
    merchantId: 106,
    merchantName: '嗒嗒奶茶铺',
    status: 'completed',
    totalAmount: 40,
    createdAt: '2026-05-08 15:30',
    addressId: 1
  }
]

export const orderItems: OrderItem[] = [
  { id: 1, orderId: 5001, dishId: 1001, dishName: '黄焖鸡米饭（大份）', price: 22, quantity: 1 },
  { id: 2, orderId: 5001, dishId: 1002, dishName: '香菇鸡腿饭', price: 20, quantity: 1 },
  { id: 3, orderId: 5002, dishId: 1004, dishName: '鸡胸肉藜麦沙拉', price: 22, quantity: 1 },
  { id: 4, orderId: 5003, dishId: 1013, dishName: '珍珠奶茶', price: 12, quantity: 2 },
  { id: 5, orderId: 5003, dishId: 1014, dishName: '芋泥波波奶茶', price: 16, quantity: 1 }
]

export const deliveries: Delivery[] = [
  { id: 7001, orderId: 5001, riderId: 3, riderName: '张骑手', status: 'delivering', note: '教学楼门口交付' },
  { id: 7002, orderId: 5002, riderId: 3, riderName: '张骑手', status: 'delivered', note: '已签收' },
  { id: 7003, orderId: 5003, riderId: 3, riderName: '张骑手', status: 'delivered', note: '宿舍楼下' }
]

export const reviews: Review[] = [
  { id: 1, orderId: 5002, userId: 1, merchantId: 102, score: 5, content: '很新鲜，配送快！', createdAt: '2026-05-09 19:10' },
  { id: 2, orderId: 5003, userId: 1, merchantId: 106, score: 5, content: '奶茶超好喝，下次还来！', createdAt: '2026-05-08 16:00' }
]
