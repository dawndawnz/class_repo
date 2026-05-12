<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const navItems = computed(() => {
  const shared = [
    { path: '/profile', label: '个人资料' },
    { path: '/addresses', label: '地址管理' }
  ]

  if (authStore.role === 'merchant') {
    return [
      { path: '/merchant/dashboard', label: '商家看板' },
      { path: '/merchant/dishes', label: '菜品管理' },
      { path: '/merchant/orders', label: '订单管理' },
      ...shared
    ]
  }

  if (authStore.role === 'rider') {
    return [{ path: '/rider/orders', label: '可接订单' }, ...shared]
  }

  return [
    { path: '/customer/home', label: '首页/商家' },
    { path: '/customer/cart', label: '购物车' },
    { path: '/customer/orders', label: '我的订单' },
    ...shared
  ]
})
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <h1>校园外卖聚合系统 MVP</h1>
      <router-link to="/login" class="login-link">角色登录</router-link>
    </header>

    <nav class="tabs" v-if="route.path !== '/login'">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="tab">{{ item.label }}</router-link>
    </nav>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>
