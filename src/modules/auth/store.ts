import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const userRole = ref<string | null>(localStorage.getItem('userRole'))
  const userEmail = ref<string | null>(localStorage.getItem('userEmail'))

  function setTokens(newToken: string | null, newRefreshToken: string | null) {
    token.value = newToken
    refreshToken.value = newRefreshToken
  }

  function clearTokens() {
    token.value = null
    refreshToken.value = null
  }

  function setUserInfo(role: string | null, email: string | null) {
    userRole.value = role
    userEmail.value = email
  }

  function clearUserInfo() {
    userRole.value = null
    userEmail.value = null
  }

  function logout() {
    clearTokens()
    clearUserInfo()
  }

  watch(token, (val) => {
    if (val) localStorage.setItem('token', val)
    else localStorage.removeItem('token')
  })

  watch(refreshToken, (val) => {
    if (val) localStorage.setItem('refreshToken', val)
    else localStorage.removeItem('refreshToken')
  })

  watch(userRole, (val) => {
    if (val) localStorage.setItem('userRole', val)
    else localStorage.removeItem('userRole')
  })

  watch(userEmail, (val) => {
    if (val) localStorage.setItem('userEmail', val)
    else localStorage.removeItem('userEmail')
  })

  return {
    token,
    refreshToken,
    userRole,
    userEmail,
    setTokens,
    clearTokens,
    setUserInfo,
    clearUserInfo,
    logout,
  }
})
