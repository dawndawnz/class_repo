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

const statusChipClass = (status: string) => `status-chip status-chip-${status}`
</script>

<template>
  <div class="container" style="padding-top:14px;">
    <div class="section-header" style="padding-top:4px;">
      <span class="section-title">📋 我的订单</span>
    </div>

    <div v-if="orders.length === 0" class="card" style="text-align:center;color:var(--c-text-3);padding:48px 0;">
      <div style="font-size:40px;margin-bottom:12px;">🛵</div>
      <div>暂无订单，去下单吧！</div>
    </div>

    <div v-for="order in orders" :key="order.id" class="card" style="padding:14px;">
      <!-- Order header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div>
          <span style="font-size:15px;font-weight:700;">{{ order.merchantName }}</span>
          <span style="font-size:12px;color:var(--c-text-3);margin-left:8px;">#{{ order.id }}</span>
        </div>
        <span :class="statusChipClass(order.status)">{{ orderStatusLabel[order.status] }}</span>
      </div>

      <!-- Order items preview -->
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
        <span
          v-for="item in order.items"
          :key="item.id"
          style="background:var(--c-bg);border-radius:6px;padding:3px 8px;font-size:13px;color:var(--c-text-2);"
        >
          {{ item.dishName }} ×{{ item.quantity }}
        </span>
      </div>

      <!-- Footer -->
      <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--c-border);padding-top:10px;">
        <span style="font-size:12px;color:var(--c-text-3);">{{ order.createdAt }}</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-weight:700;color:var(--c-accent);font-size:15px;">¥{{ order.totalAmount }}</span>
          <router-link :to="`/customer/orders/${order.id}`">
            <button class="btn btn-secondary btn-small">查看详情</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
