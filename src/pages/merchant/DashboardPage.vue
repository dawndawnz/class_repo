<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getMerchantOrders } from '../../services/mockApi'
import { useAuthStore } from '../../stores/auth'
import type { OrderWithItems } from '../../types/models'

const authStore = useAuthStore()
const orders = ref<OrderWithItems[]>([])

onMounted(async () => {
  if (!authStore.currentUser) return
  orders.value = await getMerchantOrders(101)
})

const totalSales = computed(() => orders.value.filter((item) => item.status === 'completed').reduce((sum, item) => sum + item.totalAmount, 0))
</script>

<template>
  <section class="card">
    <h2>商家看板</h2>
    <p><strong>登录商家：</strong>{{ authStore.currentUser?.name ?? '-' }}</p>
    <p><strong>订单总数：</strong>{{ orders.length }}</p>
    <p><strong>已完成销售额：</strong>￥{{ totalSales }}</p>
  </section>
</template>
