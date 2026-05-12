<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.currentUser)
</script>

<template>
  <section class="card">
    <h2>用户资料</h2>
    <template v-if="user">
      <p><strong>姓名：</strong>{{ user.name }}</p>
      <p><strong>角色：</strong>{{ user.role }}</p>
      <p><strong>手机号：</strong>{{ user.phone }}</p>
      <p><strong>校区：</strong>{{ user.campus }}</p>
    </template>
    <p v-else>请先登录。</p>
  </section>
</template>
