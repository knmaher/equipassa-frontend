import { ref } from 'vue'
import type { LoginRequest, AuthResponse } from '@/infrastructure/api'
import { login as loginRequest } from '@/infrastructure/api'
import { useAuthStore } from '../store'
import { extractErrorMessage } from '@/utils/errors'

export function useLogin() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<AuthResponse | null>(null)
  const authStore = useAuthStore()

  async function login(payload: LoginRequest) {
    loading.value = true
    error.value = null
    try {
      const { data: resp } = await loginRequest({
        body: payload,
        throwOnError: true,
        responseStyle: 'data',
      })

      result.value = resp
      authStore.setTokens(resp.token ?? null, resp.refreshToken ?? null)
      authStore.setUserInfo(resp.userRole ?? null, resp.email ?? null)
      return resp
    } catch (e) {
      error.value = extractErrorMessage(e, 'Login failed')
      throw e
    } finally {
      loading.value = false
    }
  }

  return { login, loading, error, result }
}
