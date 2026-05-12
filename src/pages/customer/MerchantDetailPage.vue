<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDishesByMerchant, getMerchantById, getPromotions, getReviewsByMerchant } from '../../services/mockApi'
import { useCartStore } from '../../stores/cart'
import type { Dish, Merchant, Promotion, Review } from '../../types/models'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const merchant = ref<Merchant>()
const dishes = ref<Dish[]>([])
const promos = ref<Promotion[]>([])
const reviews = ref<Review[]>([])
const activeTab = ref<'menu' | 'reviews'>('menu')
const merchantId = computed(() => Number(route.params.id))

onMounted(async () => {
  merchant.value = await getMerchantById(merchantId.value)
  dishes.value = await getDishesByMerchant(merchantId.value)
  const allPromos = await getPromotions()
  promos.value = allPromos.filter(p => p.merchantId === merchantId.value)
  reviews.value = await getReviewsByMerchant(merchantId.value)
})

function addToCart(dish: Dish) {
  if (!merchant.value) return
  cartStore.addItem(
    { dishId: dish.id, dishName: dish.name, price: dish.price },
    merchant.value.id,
    merchant.value.name
  )
}

function getCartQty(dishId: number) {
  return cartStore.items.find(i => i.dishId === dishId)?.quantity ?? 0
}

function removeFromCart(dish: Dish) {
  const qty = getCartQty(dish.id)
  if (qty > 0) cartStore.updateQuantity(dish.id, qty - 1)
}
</script>

<template>
  <div v-if="merchant">
    <!-- Hero header with image -->
    <div class="hero-header">
      <img
        :src="merchant.imageUrl || `https://picsum.photos/seed/m${merchant.id}/800/400`"
        :alt="merchant.name"
      />
      <div class="hero-overlay">
        <div style="flex:1;">
          <div style="font-size:20px;font-weight:700;margin-bottom:4px;">{{ merchant.name }}</div>
          <div style="font-size:13px;opacity:0.9;display:flex;align-items:center;gap:10px;">
            <span>⭐ {{ merchant.rating }}</span>
            <span>·</span>
            <span>月售 {{ merchant.monthSales ?? '--' }}</span>
            <span>·</span>
            <span>🕐 {{ merchant.deliveryTime ?? '--' }} 分钟</span>
          </div>
        </div>
      </div>
      <a class="hero-back" @click="router.back()">‹</a>
    </div>

    <!-- Merchant info card -->
    <div class="card" style="margin:0;border-radius:0;border-bottom:1px solid var(--c-border);">
      <div style="font-size:13px;color:var(--c-text-3);margin-bottom:8px;">
        {{ merchant.description }} · {{ merchant.campus }}
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        <span class="tag tag-green" v-if="merchant.deliveryFee === 0">免配送费</span>
        <span class="tag tag-yellow" v-else>配送费 ¥{{ merchant.deliveryFee }}</span>
        <span class="tag tag-blue">起送 ¥{{ merchant.minOrder ?? '--' }}</span>
        <span v-for="promo in promos" :key="promo.id" class="tag tag-red">{{ promo.title }}</span>
      </div>
    </div>

    <!-- Page tabs -->
    <div class="page-tabs">
      <div class="page-tab" :class="{ active: activeTab === 'menu' }" @click="activeTab = 'menu'">🍽️ 菜单</div>
      <div class="page-tab" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">
        💬 评价 ({{ reviews.length }})
      </div>
    </div>

    <!-- Menu tab -->
    <div v-show="activeTab === 'menu'" class="card" style="padding:0;margin:10px 12px;">
      <div
        v-for="dish in dishes"
        :key="dish.id"
        class="dish-card"
      >
        <img
          class="dish-card-img"
          :src="dish.imageUrl || `https://picsum.photos/seed/dish${dish.id}/400/300`"
          :alt="dish.name"
          loading="lazy"
        />
        <div class="dish-card-info">
          <div class="dish-card-name">{{ dish.name }}</div>
          <div class="dish-card-desc">{{ dish.description }}</div>
          <div v-if="dish.salesCount" class="text-sm text-muted" style="margin-bottom:6px;">
            月销 {{ dish.salesCount }}
          </div>
          <div class="dish-card-footer">
            <span class="dish-price"><span class="unit">¥</span>{{ dish.price }}</span>
            <div style="display:flex;align-items:center;gap:6px;">
              <button
                v-if="getCartQty(dish.id) > 0"
                class="btn btn-round btn-secondary"
                @click.stop="removeFromCart(dish)"
              >−</button>
              <span v-if="getCartQty(dish.id) > 0" style="font-weight:700;min-width:16px;text-align:center;">
                {{ getCartQty(dish.id) }}
              </span>
              <button class="btn btn-round btn-add" @click.stop="addToCart(dish)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews tab -->
    <div v-show="activeTab === 'reviews'" style="padding:12px;">
      <div v-if="reviews.length === 0" class="card" style="text-align:center;color:var(--c-text-3);padding:32px;">
        暂无评价
      </div>
      <div v-for="review in reviews" :key="review.id" class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <span style="color:#fa8c16;font-size:15px;">{{ '⭐'.repeat(review.score) }}</span>
          <span class="text-sm text-muted">{{ review.createdAt }}</span>
        </div>
        <div>{{ review.content }}</div>
      </div>
    </div>

    <!-- Cart floating button -->
    <router-link to="/customer/cart" class="cart-float" v-if="cartStore.totalCount > 0">
      🛒
      <span class="badge">{{ cartStore.totalCount }}</span>
    </router-link>
  </div>

  <div v-else class="container" style="text-align:center;padding-top:60px;color:var(--c-text-3);">
    加载中...
  </div>
</template>
