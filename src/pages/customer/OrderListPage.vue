<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserOrders } from '../../services/mockApi'
import { orderStatusLabel } from '../../constants/status'
import { useAuthStore } from '../../stores/auth'
import type { OrderWithItems } from '../../types/models'

const authStore = useAuthStore()
const orders = ref<OrderWithItems[]>([])

onMounted(async () => {
  if (!authStore.currentUser) return
  orders.value = await getUserOrders(authStore.currentUser.id)
})
</script>

<template>
  <section class="card">
    <h2>订单列表</h2>
    <div v-for="order in orders" :key="order.id" class="card" style="margin: 8px 0">
      <div class="title-row">
        <strong>#{{ order.id }} {{ order.merchantName }}</strong>
        <span>{{ orderStatusLabel[order.status] }}</span>
      </div>
      <p>下单时间：{{ order.createdAt }} · 总价：￥{{ order.totalAmount }}</p>
      <router-link :to="`/customer/orders/${order.id}`"><button class="secondary">查看详情</button></router-link>
    </div>
  </section>
</template>
