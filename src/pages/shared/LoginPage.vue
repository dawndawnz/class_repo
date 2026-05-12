<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import type { UserRole } from '../../types/models'

const role = ref<UserRole>('customer')
const authStore = useAuthStore()
const router = useRouter()

const defaultPath: Record<UserRole, string> = {
  customer: '/customer/home',
  merchant: '/merchant/dashboard',
  rider: '/rider/orders'
}

async function submit() {
  await authStore.login(role.value)
  router.push(defaultPath[role.value])
}
</script>

<template>
  <section class="card" style="max-width: 420px; margin: 48px auto">
    <h2>登录（角色切换）</h2>
    <p>用于模拟顾客/商家/骑手三端入口。</p>
    <div class="grid">
      <label>
        当前角色
        <select v-model="role">
          <option value="customer">顾客</option>
          <option value="merchant">商家</option>
          <option value="rider">骑手</option>
        </select>
      </label>
      <button @click="submit">进入系统</button>
    </div>
  </section>
</template>
