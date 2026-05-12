<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { deliveryStatusLabel } from '../../constants/status'
import { getDeliveryDetail, updateDeliveryStatus } from '../../services/mockApi'
import type { Delivery, DeliveryStatus, Order } from '../../types/models'

const route = useRoute()
const detail = ref<Delivery & { order: Order }>()
const deliveryId = computed(() => Number(route.params.id))

const statuses: DeliveryStatus[] = ['picked_up', 'delivering', 'delivered']

async function load() {
  detail.value = await getDeliveryDetail(deliveryId.value)
}

async function setStatus(status: DeliveryStatus) {
  await updateDeliveryStatus(deliveryId.value, status)
  await load()
}

onMounted(load)
</script>

<template>
  <section class="card" v-if="detail">
    <h2>配送详情 #{{ detail.id }}</h2>
    <p>订单 #{{ detail.order.id }} · 状态：{{ deliveryStatusLabel[detail.status] }}</p>
    <p>备注：{{ detail.note }}</p>
    <div class="title-row">
      <button class="secondary" v-for="status in statuses" :key="status" @click="setStatus(status)">
        更新为{{ deliveryStatusLabel[status] }}
      </button>
    </div>
  </section>
</template>
