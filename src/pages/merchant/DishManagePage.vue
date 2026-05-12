<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMerchantDishes, updateDishStock } from '../../services/mockApi'
import type { Dish } from '../../types/models'

const dishes = ref<Dish[]>([])

async function load() {
  dishes.value = await getMerchantDishes(101)
}

async function changeStock(dish: Dish, value: number) {
  await updateDishStock(dish.id, value)
  await load()
}

onMounted(load)
</script>

<template>
  <section class="card">
    <h2>菜品管理</h2>
    <div class="card" v-for="dish in dishes" :key="dish.id" style="margin: 8px 0">
      <div class="title-row">
        <strong>{{ dish.name }}</strong>
        <span>￥{{ dish.price }}</span>
      </div>
      <p>库存：{{ dish.stock }}</p>
      <div class="title-row">
        <button class="secondary" @click="changeStock(dish, Math.max(0, dish.stock - 1))">库存-1</button>
        <button @click="changeStock(dish, dish.stock + 1)">库存+1</button>
      </div>
    </div>
  </section>
</template>
