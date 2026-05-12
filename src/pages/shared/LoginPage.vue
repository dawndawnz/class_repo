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

const roleOptions: Array<{ value: UserRole; label: string; icon: string; desc: string }> = [
  { value: 'customer', label: '顾客', icon: '🧑‍🎓', desc: '浏览商家、下单、查看订单' },
  { value: 'merchant', label: '商家', icon: '🏪', desc: '管理菜品、接单、查看看板' },
  { value: 'rider', label: '骑手', icon: '🛵', desc: '接取配送、更新配送状态' }
]

async function submit() {
  await authStore.login(role.value)
  router.push(defaultPath[role.value])
}
</script>

<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--c-bg);padding:20px;">
    <div style="width:100%;max-width:400px;">
      <!-- Logo -->
      <div style="text-align:center;margin-bottom:32px;">
        <div style="width:64px;height:64px;background:var(--c-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;margin:0 auto 12px;color:var(--c-text);">饿</div>
        <div style="font-size:22px;font-weight:700;">校园外卖</div>
        <div style="font-size:13px;color:var(--c-text-3);margin-top:4px;">校园周边外卖群聚合平台</div>
      </div>

      <!-- Role selector -->
      <div class="card">
        <div style="font-size:14px;color:var(--c-text-3);margin-bottom:12px;">选择角色进入系统</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
          <div
            v-for="opt in roleOptions"
            :key="opt.value"
            @click="role = opt.value"
            style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;border:2px solid var(--c-border);transition:all 0.15s;"
            :style="role === opt.value ? 'border-color:var(--c-primary-dark);background:var(--c-primary-light);' : ''"
          >
            <span style="font-size:28px;">{{ opt.icon }}</span>
            <div>
              <div style="font-weight:600;font-size:15px;">{{ opt.label }}</div>
              <div style="font-size:12px;color:var(--c-text-3);">{{ opt.desc }}</div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" style="width:100%;padding:13px;font-size:16px;border-radius:10px;" @click="submit">
          进入系统 →
        </button>
      </div>
    </div>
  </div>
</template>
