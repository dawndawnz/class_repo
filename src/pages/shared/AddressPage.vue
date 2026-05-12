<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserAddresses, setDefaultAddress } from '../../services/mockApi'
import { useAuthStore } from '../../stores/auth'
import type { UserAddress } from '../../types/models'

const authStore = useAuthStore()
const list = ref<UserAddress[]>([])

async function load() {
  if (!authStore.currentUser) return
  list.value = await getUserAddresses(authStore.currentUser.id)
}

async function setDefault(id: number) {
  if (!authStore.currentUser) return
  await setDefaultAddress(id, authStore.currentUser.id)
  await load()
}

onMounted(load)
</script>

<template>
  <section class="card">
    <h2>地址管理</h2>
    <div v-if="list.length" class="grid">
      <div v-for="address in list" :key="address.id" class="card" style="margin: 0">
        <div class="title-row">
          <strong>{{ address.label }}</strong>
          <span v-if="address.isDefault">默认地址</span>
        </div>
        <p>{{ address.detail }}</p>
        <button class="secondary" @click="setDefault(address.id)" :disabled="address.isDefault">设为默认</button>
      </div>
    </div>
    <p v-else>暂无地址数据，请先登录顾客账号查看。</p>
  </section>
</template>
