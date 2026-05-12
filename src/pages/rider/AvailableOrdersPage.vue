<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { deliveryStatusLabel } from '../../constants/status'
import { assignDelivery, getAvailableDeliveries } from '../../services/mockApi'
import { useAuthStore } from '../../stores/auth'
import type { Delivery, Order } from '../../types/models'

const authStore = useAuthStore()
const router = useRouter()
const deliveries = ref<Array<Delivery & { order: Order }>>([])

async function load() {
  deliveries.value = await getAvailableDeliveries()
}

async function take(deliveryId: number) {
  if (!authStore.currentUser) return
  await assignDelivery(deliveryId, authStore.currentUser)
  router.push(`/rider/delivery/${deliveryId}`)
}

onMounted(load)
</script>

<template>
  <section class="card">
    <h2>可接配送订单</h2>
    <div class="card" v-for="delivery in deliveries" :key="delivery.id" style="margin: 8px 0">
      <div class="title-row">
        <strong>配送单 #{{ delivery.id }}</strong>
        <span>{{ deliveryStatusLabel[delivery.status] }}</span>
      </div>
      <p>关联订单 #{{ delivery.order.id }} · 金额 ￥{{ delivery.order.totalAmount }}</p>
      <button @click="take(delivery.id)">接单并查看</button>
    </div>
  </section>
</template>
