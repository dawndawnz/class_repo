<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMerchants, getPromotions } from '../../services/mockApi'
import type { Merchant, Promotion } from '../../types/models'

const merchants = ref<Merchant[]>([])
const promotions = ref<Promotion[]>([])

onMounted(async () => {
  merchants.value = await getMerchants()
  promotions.value = await getPromotions()
})
</script>

<template>
  <section class="card">
    <h2>校园商家列表</h2>
    <div class="grid cols-2">
      <div v-for="merchant in merchants" :key="merchant.id" class="card" style="margin: 0">
        <div class="title-row">
          <strong>{{ merchant.name }}</strong>
          <span>⭐ {{ merchant.rating }}</span>
        </div>
        <p>{{ merchant.category }} · {{ merchant.campus }}</p>
        <p>{{ merchant.description }}</p>
        <router-link :to="`/customer/merchant/${merchant.id}`">
          <button>查看菜品</button>
        </router-link>
      </div>
    </div>
  </section>

  <section class="card">
    <h3>促销活动</h3>
    <ul>
      <li v-for="promo in promotions" :key="promo.id">{{ promo.title }} - {{ promo.description }}</li>
    </ul>
  </section>
</template>
