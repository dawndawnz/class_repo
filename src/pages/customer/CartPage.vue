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
  <div class="container" style="padding-top:14px;">
    <div class="section-header" style="padding-top:4px;">
      <span class="section-title">🛒 购物车</span>
    </div>

    <div v-if="!cartStore.items.length" class="card" style="text-align:center;padding:48px 0;color:var(--c-text-3);">
      <div style="font-size:40px;margin-bottom:12px;">🛒</div>
      <div>购物车空空如也</div>
      <router-link to="/customer/home">
        <button class="btn btn-primary" style="margin-top:16px;">去选购</button>
      </router-link>
    </div>

    <template v-else>
      <!-- Merchant name -->
      <div class="card" style="margin-bottom:10px;">
        <div style="font-size:13px;color:var(--c-text-3);margin-bottom:4px;">来自</div>
        <div style="font-size:16px;font-weight:700;">{{ cartStore.merchantName }}</div>
      </div>

      <!-- Items -->
      <div class="card" style="padding:0;margin-bottom:10px;">
        <div
          v-for="item in cartStore.items"
          :key="item.dishId"
          style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--c-border);"
        >
          <div>
            <div style="font-weight:600;">{{ item.dishName }}</div>
            <div style="font-size:13px;color:var(--c-text-3);">× {{ item.quantity }}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:700;color:var(--c-accent);">¥{{ item.price * item.quantity }}</span>
            <div style="display:flex;align-items:center;gap:6px;">
              <button class="btn btn-round btn-secondary" @click="cartStore.updateQuantity(item.dishId, item.quantity - 1)">−</button>
              <span style="font-weight:700;min-width:16px;text-align:center;">{{ item.quantity }}</span>
              <button class="btn btn-round btn-add" @click="cartStore.updateQuantity(item.dishId, item.quantity + 1)">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Address -->
      <div class="card" style="margin-bottom:10px;">
        <div style="font-size:13px;color:var(--c-text-3);margin-bottom:8px;">📍 配送地址</div>
        <select v-model.number="selectedAddressId" style="width:100%;">
          <option v-for="address in addresses" :key="address.id" :value="address.id">
            {{ address.label }} — {{ address.detail }}
          </option>
        </select>
      </div>

      <!-- Total + checkout -->
      <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <span style="font-size:13px;color:var(--c-text-3);">合计</span>
          <span style="font-size:20px;font-weight:700;color:var(--c-accent);margin-left:8px;">¥{{ cartStore.totalAmount }}</span>
        </div>
        <button class="btn btn-accent" style="padding:10px 28px;font-size:15px;" @click="checkout">
          去结算
        </button>
      </div>
    </template>
  </div>
</template>
