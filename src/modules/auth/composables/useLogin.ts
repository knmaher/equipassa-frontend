import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiClient, ensureCsrf } from '@/infrastructure/http/ApiClient'
import { login as loginRequest, me } from '@/infrastructure/api'
import { useAuthStore } from '../store'
import type { LoginRequest } from '@/infrastructure/api'
import { extractErrorMessage } from '@/utils/errors'

export function useLogin() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  async function login(payload: LoginRequest) {
    loading.value = true
    error.value = null
    try {
      await ensureCsrf()

      await loginRequest({
        client: apiClient,
        body: payload,
        throwOnError: true,
        responseStyle: 'data',
        credentials: 'include',
      })

      const meRes = await me({
        client: apiClient,
        responseStyle: 'data',
        credentials: 'include',
      })
      auth.setUserInfo(meRes.userRole!, meRes.email!)

      const redirect = (route.query.redirect as string) || '/dashboard'
      await router.replace(redirect)
    } catch (e) {
      error.value = extractErrorMessage(e, 'Login failed')
      throw e
    } finally {
      loading.value = false
    }
  }

  return { login, loading, error }
}
