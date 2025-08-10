import { ref } from 'vue'
import type { LoginRequest } from '@/infrastructure/api'
import { login as loginRequest } from '@/infrastructure/api'
import { useAuthStore } from '../store'
import { extractErrorMessage } from '@/utils/errors'
import { ensureCsrf } from '@/infrastructure/http/ApiClient'

export function useLogin() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const auth = useAuthStore()

  async function login(payload: LoginRequest) {
    loading.value = true
    error.value = null
    try {
      await ensureCsrf() // seed XSRF-TOKEN cookie

      const { data } = await loginRequest({
        body: payload,
        throwOnError: true,
        responseStyle: 'data',
        credentials: 'include',
      })

      auth.setUserInfo(data.userRole!, data.email!)
      return data
    } catch (e) {
      error.value = extractErrorMessage(e, 'Login failed')
      throw e
    } finally {
      loading.value = false
    }
  }

  return { login, loading, error }
}
