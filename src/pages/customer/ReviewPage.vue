<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { createReview, getOrderDetail } from '../../services/mockApi'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const score = ref(5)
const content = ref('')
const done = ref(false)

async function submitReview() {
  if (!authStore.currentUser) return
  const order = await getOrderDetail(Number(route.params.orderId))
  if (!order) return

  await createReview({
    orderId: order.id,
    userId: authStore.currentUser.id,
    merchantId: order.merchantId,
    score: score.value,
    content: content.value
  })

  done.value = true
}
</script>

<template>
  <section class="card">
    <h2>订单评价</h2>
    <div class="grid" v-if="!done">
      <label>评分（1-5）<input type="number" min="1" max="5" v-model.number="score" /></label>
      <label>评价内容<textarea rows="4" v-model="content" placeholder="说说你的体验..." /></label>
      <button @click="submitReview">提交评价</button>
    </div>
    <p v-else>评价提交成功，感谢反馈！</p>
  </section>
</template>
