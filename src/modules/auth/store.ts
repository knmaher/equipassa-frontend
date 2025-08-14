// src/modules/auth/store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/infrastructure/http/ApiClient'
import type { MeResponses } from '@/infrastructure/api'

export const useAuthStore = defineStore('auth', () => {
  const userRole = ref<string | null>(null)
  const userEmail = ref<string | null>(null)
  const initialized = ref(false)

  function setUserInfo(role: string, email: string) {
    userRole.value = role
    userEmail.value = email
  }
  function clearAuth() {
    userRole.value = null
    userEmail.value = null
  }

  async function init() {
    if (initialized.value) return
    initialized.value = true
    try {
      const data = await apiClient.request<MeResponses, unknown, true, 'data'>({
        url: '/api/auth/me',
        method: 'GET',
        responseStyle: 'data',
        credentials: 'include',
        throwOnError: true,
      })
      setUserInfo(data.userRole as string, data.email as string)
    } catch (e: any) {
      if (e?.response?.status === 401) {
        clearAuth()
      } else {
        throw e
      }
    }
  }

  async function logout() {
    await apiClient.request({
      url: '/api/auth/logout',
      method: 'POST',
      credentials: 'include',
    })
    clearAuth()
    initialized.value = false
  }

  const isAuthenticated = computed(() => !!userRole.value)

  return { userRole, userEmail, initialized, isAuthenticated, init, setUserInfo, clearAuth, logout }
})
