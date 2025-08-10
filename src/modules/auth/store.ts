// src/modules/auth/store.ts
import { defineStore } from 'pinia'
import { ref }          from 'vue'
import { apiClient }    from '@/infrastructure/http/ApiClient'

export const useAuthStore = defineStore('auth', () => {
  const userRole  = ref<string | null>(null)
  const userEmail = ref<string | null>(null)
  const initialized = ref(false)

  function setUserInfo(role: string, email: string) {
    console.log('store+++++', userRole, role, email)
    userRole.value  = role
    userEmail.value = email
  }

  function clearAuth() {
    userRole.value  = null
    userEmail.value = null
  }

  async function init() {
    if (initialized.value) return
    initialized.value = true

    try {
      // Make a GET to /api/auth/me (must be implemented server-side)
      const { data } = await apiClient.request({
        url:           '/api/auth/me',
        method:        'GET',
        responseStyle: 'data',
        credentials:   'include',
      })
      setUserInfo(data.userRole, data.email)
    } catch {
      // not logged in, leave everything null
      clearAuth()
    }
  }

  async function logout() {
    clearAuth()
    await apiClient.request({
      url:         '/api/auth/logout',
      method:      'POST',
      credentials: 'include',
    })
  }

  return { userRole, userEmail, init, setUserInfo, clearAuth, logout }
})
