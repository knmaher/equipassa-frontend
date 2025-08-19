import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/infrastructure/http/ApiClient'
import { me, logout as apiLogout } from '@/infrastructure/api'

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
      const data = await me({
        client: apiClient,
        responseStyle: 'data',
        credentials: 'include',
        throwOnError: true,
      })
      setUserInfo(data.userRole!, data.email!)
    } catch {
      clearAuth()
    }
  }

  async function logout() {
    clearAuth()
    initialized.value = false
    await apiLogout({ client: apiClient, credentials: 'include' })
  }

  const isAuthenticated = computed(() => !!userRole.value)

  return { userRole, userEmail, initialized, isAuthenticated, init, setUserInfo, clearAuth, logout }
})
