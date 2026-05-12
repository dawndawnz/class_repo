<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { orderStatusLabel, orderTimeline } from '../../constants/status'
import { getOrderDetail } from '../../services/mockApi'
import type { OrderWithItems } from '../../types/models'

const route = useRoute()
const order = ref<OrderWithItems>()
const orderId = computed(() => Number(route.params.id))

onMounted(async () => {
  order.value = await getOrderDetail(orderId.value)
})
</script>

<template>
  <section class="card" v-if="order">
    <h2>订单详情 #{{ order.id }}</h2>
    <p>商家：{{ order.merchantName }} · 金额：￥{{ order.totalAmount }}</p>
    <h3>订单状态</h3>
    <ul>
      <li v-for="status in orderTimeline" :key="status">
        <strong>{{ orderStatusLabel[status] }}</strong>
        <span v-if="orderTimeline.indexOf(status) <= orderTimeline.indexOf(order.status)"> ✓</span>
      </li>
    </ul>
    <h3>商品明细</h3>
    <ul>
      <li v-for="item in order.items" :key="item.id">{{ item.dishName }} x {{ item.quantity }} = ￥{{ item.price * item.quantity }}</li>
    </ul>
    <router-link :to="`/customer/review/${order.id}`" v-if="order.status === 'completed'">
      <button>去评价</button>
    </router-link>
  </section>
</template>
