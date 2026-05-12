<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

const navItems = computed(() => {
  if (authStore.role === 'merchant') {
    return [
      { path: '/merchant/dashboard', label: '看板', icon: '📊' },
      { path: '/merchant/dishes', label: '菜品', icon: '🍽️' },
      { path: '/merchant/orders', label: '订单', icon: '📋' },
      { path: '/profile', label: '我的', icon: '👤' }
    ]
  }
  if (authStore.role === 'rider') {
    return [
      { path: '/rider/orders', label: '接单', icon: '🚴' },
      { path: '/profile', label: '我的', icon: '👤' }
    ]
  }
  return [
    { path: '/customer/home', label: '首页', icon: '🏠' },
    { path: '/customer/orders', label: '订单', icon: '📋' },
    { path: '/customer/cart', label: '购物车', icon: '🛒' },
    { path: '/profile', label: '我的', icon: '👤' }
  ]
})
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar-logo">
        <div class="logo-icon">饿</div>
        <span>校园外卖</span>
      </div>
      <div class="topbar-actions">
        <!-- Desktop nav -->
        <nav class="desktop-nav" v-if="route.path !== '/login'">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path">
            {{ item.icon }} {{ item.label }}
          </router-link>
        </nav>
        <router-link to="/login" class="login-link">
          {{ authStore.currentUser ? authStore.currentUser.name : '登录' }}
        </router-link>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <!-- Mobile bottom tab bar -->
    <nav class="bottom-tab-bar" v-if="route.path !== '/login'">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path">
        <span class="tab-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
        <span v-if="item.path === '/customer/cart' && cartStore.totalCount > 0" class="badge-dot">
          {{ cartStore.totalCount }}
        </span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.badge-dot {
  position: absolute;
  top: 4px;
  background: var(--c-accent);
  color: #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 1px solid #fff;
}

.bottom-tab-bar a {
  position: relative;
}
</style>
