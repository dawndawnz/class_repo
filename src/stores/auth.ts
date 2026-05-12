import { defineStore } from 'pinia'
import { loginByRole } from '../services/mockApi'
import type { User, UserRole } from '../types/models'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as User | null
  }),
  getters: {
    role: (state) => state.currentUser?.role ?? 'customer'
  },
  actions: {
    async login(role: UserRole) {
      this.currentUser = await loginByRole(role)
    }
  }
})
