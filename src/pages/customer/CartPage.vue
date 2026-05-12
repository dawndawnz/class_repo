<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createOrder, getUserAddresses } from '../../services/mockApi'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import type { UserAddress } from '../../types/models'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const addresses = ref<UserAddress[]>([])
const selectedAddressId = ref<number>(0)
const defaultAddress = computed(() => addresses.value.find((item) => item.isDefault))

onMounted(async () => {
  if (!authStore.currentUser) return
  addresses.value = await getUserAddresses(authStore.currentUser.id)
  selectedAddressId.value = defaultAddress.value?.id ?? addresses.value[0]?.id ?? 0
})

async function checkout() {
  if (!authStore.currentUser || !cartStore.items.length || !selectedAddressId.value) return

  await createOrder({
    userId: authStore.currentUser.id,
    merchantId: cartStore.merchantId,
    merchantName: cartStore.merchantName,
    addressId: selectedAddressId.value,
    items: cartStore.items
  })

  cartStore.clearCart()
  router.push('/customer/orders')
}
</script>

<template>
  <section class="card">
    <h2>购物车 / 结算</h2>
    <p v-if="!cartStore.items.length">购物车为空，请先选择菜品。</p>
    <template v-else>
      <p><strong>商家：</strong>{{ cartStore.merchantName }}</p>
      <div class="card" v-for="item in cartStore.items" :key="item.dishId" style="margin: 8px 0">
        <div class="title-row">
          <span>{{ item.dishName }} × {{ item.quantity }}</span>
          <strong>￥{{ item.price * item.quantity }}</strong>
        </div>
      </div>
      <label>
        配送地址
        <select v-model.number="selectedAddressId">
          <option v-for="address in addresses" :key="address.id" :value="address.id">{{ address.label }} - {{ address.detail }}</option>
        </select>
      </label>
      <p><strong>合计：</strong>￥{{ cartStore.totalAmount }}</p>
      <button @click="checkout">提交订单（模拟支付）</button>
    </template>
  </section>
</template>
