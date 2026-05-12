<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getMerchants, getPromotions } from '../../services/mockApi'
import type { Merchant, Promotion } from '../../types/models'

const router = useRouter()
const merchants = ref<Merchant[]>([])
const promotions = ref<Promotion[]>([])
const searchQuery = ref('')
const activeCategory = ref('全部')
const currentBanner = ref(0)

const banners = [
  { id: 1, title: '🎉 校园专享满30减10', subtitle: '仅限今天，快来抢！', bg: 'linear-gradient(135deg,#ff7c43 0%,#f9484a 100%)' },
  { id: 2, title: '🆕 新店开张免配送费', subtitle: '周边新商家上线啦', bg: 'linear-gradient(135deg,#1677ff 0%,#0050b3 100%)' },
  { id: 3, title: '🧋 饮品第二杯半价', subtitle: '指定门店参与活动', bg: 'linear-gradient(135deg,#00b578 0%,#007750 100%)' }
]

const categories = [
  { label: '全部', icon: '🍴' },
  { label: '盖饭', icon: '🍚' },
  { label: '面食', icon: '🍜' },
  { label: '川菜', icon: '🌶️' },
  { label: '港式', icon: '🫖' },
  { label: '轻食', icon: '🥗' },
  { label: '饮品', icon: '🧋' },
  { label: '小吃', icon: '🍢' }
]

let bannerTimer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  merchants.value = await getMerchants()
  promotions.value = await getPromotions()
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.length
  }, 3000)
})

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer)
})

const filteredMerchants = () => {
  let list = merchants.value
  if (activeCategory.value !== '全部') {
    list = list.filter(m => m.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
  }
  return list
}

const getMerchantPromos = (merchantId: number) =>
  promotions.value.filter(p => p.merchantId === merchantId)

function goToMerchant(id: number) {
  router.push(`/customer/merchant/${id}`)
}
</script>

<template>
  <div>
    <!-- Search + Location bar -->
    <div style="background:var(--c-primary);padding:10px 14px 14px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
        <span style="font-size:13px;font-weight:600;white-space:nowrap;">📍 南校区</span>
        <div class="search-bar" style="flex:1;">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" placeholder="搜索商家或菜品..." type="text" />
        </div>
      </div>
    </div>

    <div class="container" style="padding-top:12px;">
      <!-- Banner carousel -->
      <div class="banner-carousel" style="margin-bottom:14px;">
        <div
          v-for="(banner, i) in banners"
          :key="banner.id"
          class="banner-slide"
          :class="{ active: i === currentBanner }"
          :style="{ background: banner.bg }"
        >
          <div style="color:#fff;">
            <div style="font-size:18px;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,0.3);">{{ banner.title }}</div>
            <div style="font-size:13px;opacity:0.9;margin-top:4px;">{{ banner.subtitle }}</div>
          </div>
        </div>
        <div class="banner-dots">
          <div
            v-for="(_, i) in banners"
            :key="i"
            class="banner-dot"
            :class="{ active: i === currentBanner }"
            @click="currentBanner = i"
          />
        </div>
      </div>

      <!-- Category grid -->
      <div class="card" style="padding:10px 8px;">
        <div class="category-grid">
          <div
            v-for="cat in categories"
            :key="cat.label"
            class="category-item"
            :style="activeCategory === cat.label ? 'background:var(--c-primary-light);' : ''"
            @click="activeCategory = cat.label"
          >
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-label" :style="activeCategory === cat.label ? 'color:var(--c-primary-dark);font-weight:700;' : ''">{{ cat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Merchant list -->
      <div class="section-header">
        <span class="section-title">🏪 附近商家</span>
        <span class="section-muted text-muted text-sm">共 {{ filteredMerchants().length }} 家</span>
      </div>

      <div v-if="filteredMerchants().length === 0" class="card" style="text-align:center;color:var(--c-text-3);padding:32px;">
        暂无符合条件的商家
      </div>

      <div
        v-for="merchant in filteredMerchants()"
        :key="merchant.id"
        class="merchant-card"
        @click="goToMerchant(merchant.id)"
      >
        <img
          class="merchant-card-img"
          :src="merchant.imageUrl || `https://picsum.photos/seed/m${merchant.id}/800/400`"
          :alt="merchant.name"
          loading="lazy"
        />
        <div class="merchant-card-body">
          <div class="merchant-card-name">{{ merchant.name }}</div>
          <div class="merchant-card-meta">
            <span class="rating">⭐ {{ merchant.rating }}</span>
            <span>·</span>
            <span>月售 {{ merchant.monthSales ?? '--' }}</span>
            <span>·</span>
            <span>🕐 {{ merchant.deliveryTime ?? '--' }} 分钟</span>
            <span>·</span>
            <span>{{ merchant.deliveryFee === 0 ? '免配送费' : `配送 ¥${merchant.deliveryFee}` }}</span>
          </div>
          <div class="merchant-card-tags">
            <span class="tag tag-red" v-for="promo in getMerchantPromos(merchant.id)" :key="promo.id">
              {{ promo.title }}
            </span>
            <span class="tag tag-green" v-if="merchant.deliveryFee === 0">免配送费</span>
            <span class="tag tag-blue">{{ merchant.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
