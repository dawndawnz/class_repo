<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getDishesByMerchant, getMerchantById } from '../../services/mockApi'
import { useCartStore } from '../../stores/cart'
import type { Dish, Merchant } from '../../types/models'

const route = useRoute()
const cartStore = useCartStore()
const merchant = ref<Merchant>()
const dishes = ref<Dish[]>([])
const merchantId = computed(() => Number(route.params.id))

onMounted(async () => {
  merchant.value = await getMerchantById(merchantId.value)
  dishes.value = await getDishesByMerchant(merchantId.value)
})

function addToCart(dish: Dish) {
  if (!merchant.value) return
  cartStore.addItem(
    { dishId: dish.id, dishName: dish.name, price: dish.price },
    merchant.value.id,
    merchant.value.name
  )
}
</script>

<template>
  <section class="card" v-if="merchant">
    <h2>{{ merchant.name }}</h2>
    <p>{{ merchant.description }}</p>
    <div class="grid cols-2">
      <div v-for="dish in dishes" :key="dish.id" class="card" style="margin: 0">
        <div class="title-row">
          <strong>{{ dish.name }}</strong>
          <span>￥{{ dish.price }}</span>
        </div>
        <p>{{ dish.description }}</p>
        <p>库存：{{ dish.stock }}</p>
        <button @click="addToCart(dish)">加入购物车</button>
      </div>
    </div>
    <router-link to="/customer/cart"><button style="margin-top: 10px">去结算</button></router-link>
  </section>
</template>
