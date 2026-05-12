<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { orderStatusLabel } from '../../constants/status'
import { getMerchantOrders, updateOrderStatus } from '../../services/mockApi'
import type { OrderStatus, OrderWithItems } from '../../types/models'

const orders = ref<OrderWithItems[]>([])
const nextStatus: OrderStatus[] = ['accepted', 'delivering', 'completed']

async function load() {
  orders.value = await getMerchantOrders(101)
}

async function changeStatus(orderId: number, status: OrderStatus) {
  await updateOrderStatus(orderId, status)
  await load()
}

onMounted(load)
</script>

<template>
  <section class="card">
    <h2>订单管理</h2>
    <div class="card" v-for="order in orders" :key="order.id" style="margin: 8px 0">
      <div class="title-row">
        <strong>#{{ order.id }}</strong>
        <span>{{ orderStatusLabel[order.status] }}</span>
      </div>
      <p>金额：￥{{ order.totalAmount }} · 时间：{{ order.createdAt }}</p>
      <div class="title-row">
        <button v-for="status in nextStatus" :key="status" class="secondary" @click="changeStatus(order.id, status)">
          设为{{ orderStatusLabel[status] }}
        </button>
      </div>
    </div>
  </section>
</template>
