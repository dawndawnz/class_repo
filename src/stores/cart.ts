import { defineStore } from 'pinia'

export interface CartItem {
  dishId: number
  dishName: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    merchantId: 0,
    merchantName: '',
    items: [] as CartItem[]
  }),
  getters: {
    totalAmount: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  actions: {
    addItem(item: Omit<CartItem, 'quantity'>, merchantId: number, merchantName: string) {
      if (this.merchantId && this.merchantId !== merchantId) {
        this.clearCart()
      }
      this.merchantId = merchantId
      this.merchantName = merchantName
      const existing = this.items.find((it) => it.dishId === item.dishId)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    updateQuantity(dishId: number, quantity: number) {
      if (quantity <= 0) {
        this.items = this.items.filter((item) => item.dishId !== dishId)
        return
      }
      this.items = this.items.map((item) => (item.dishId === dishId ? { ...item, quantity } : item))
    },
    clearCart() {
      this.merchantId = 0
      this.merchantName = ''
      this.items = []
    }
  }
})
