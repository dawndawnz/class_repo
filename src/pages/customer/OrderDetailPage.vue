<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orderStatusLabel, orderTimeline } from '../../constants/status'
import { getOrderDetail } from '../../services/mockApi'
import type { OrderWithItems } from '../../types/models'

const route = useRoute()
const router = useRouter()
const order = ref<OrderWithItems>()
const orderId = computed(() => Number(route.params.id))

onMounted(async () => {
  order.value = await getOrderDetail(orderId.value)
})

function getStepState(status: string) {
  if (!order.value) return 'pending'
  const currentIdx = orderTimeline.indexOf(order.value.status as any)
  const stepIdx = orderTimeline.indexOf(status as any)
  if (stepIdx < currentIdx) return 'done'
  if (stepIdx === currentIdx) return 'active'
  return 'pending'
}

const statusIcons: Record<string, string> = {
  placed: '📝',
  paid: '💳',
  accepted: '👨‍🍳',
  delivering: '🛵',
  completed: '✅'
}
</script>

<template>
  <div v-if="order" class="container" style="padding-top:14px;">
    <!-- Status banner -->
    <div class="card" style="background:var(--c-primary);padding:20px 16px;text-align:center;margin-bottom:12px;">
      <div style="font-size:32px;margin-bottom:6px;">
        {{ order.status === 'delivering' ? '🛵' : order.status === 'completed' ? '✅' : '📋' }}
      </div>
      <div style="font-size:18px;font-weight:700;color:var(--c-text);">{{ orderStatusLabel[order.status] }}</div>
      <div style="font-size:13px;color:var(--c-text-2);margin-top:4px;">
        {{ order.delivery?.riderName ? `骑手：${order.delivery.riderName}` : '等待骑手接单' }}
      </div>
    </div>

    <!-- Order info -->
    <div class="card" style="margin-bottom:10px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-size:16px;font-weight:700;">{{ order.merchantName }}</span>
        <span style="color:var(--c-text-3);font-size:13px;">#{{ order.id }}</span>
      </div>
      <div style="font-size:13px;color:var(--c-text-3);margin-bottom:4px;">下单时间：{{ order.createdAt }}</div>
      <div style="font-size:13px;color:var(--c-text-3);">
        配送备注：{{ order.delivery?.note ?? '无' }}
      </div>
    </div>

    <!-- Timeline -->
    <div class="card" style="margin-bottom:10px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:14px;">📍 订单进度</div>
      <div class="timeline">
        <div
          v-for="status in orderTimeline"
          :key="status"
          class="timeline-item"
          :class="getStepState(status)"
        >
          <div class="timeline-dot" />
          <div style="display:flex;align-items:center;gap:6px;">
            <span>{{ statusIcons[status] }}</span>
            <span>{{ orderStatusLabel[status] }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Item list -->
    <div class="card" style="margin-bottom:10px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;">🍽️ 商品明细</div>
      <div
        v-for="item in order.items"
        :key="item.id"
        style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--c-border);"
      >
        <div>
          <span>{{ item.dishName }}</span>
          <span style="color:var(--c-text-3);font-size:13px;margin-left:6px;">×{{ item.quantity }}</span>
        </div>
        <span style="font-weight:600;color:var(--c-accent);">¥{{ item.price * item.quantity }}</span>
      </div>
      <div style="display:flex;justify-content:flex-end;padding-top:10px;font-size:15px;font-weight:700;">
        合计：<span style="color:var(--c-accent);">¥{{ order.totalAmount }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div style="display:flex;gap:10px;">
      <button class="btn btn-secondary" style="flex:1;" @click="router.back()">返回</button>
      <router-link :to="`/customer/review/${order.id}`" style="flex:1;" v-if="order.status === 'completed'">
        <button class="btn btn-primary" style="width:100%;">去评价</button>
      </router-link>
    </div>
  </div>

  <div v-else class="container" style="text-align:center;padding-top:60px;color:var(--c-text-3);">
    加载中...
  </div>
</template>
