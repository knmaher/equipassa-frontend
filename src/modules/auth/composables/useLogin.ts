// src/modules/auth/composables/useLogin.ts
import { apiClient, ensureCsrf } from '@/infrastructure/http/ApiClient'
import { login as loginRequest } from '@/infrastructure/api'
import { useAuthStore } from '../store'
import { ref } from 'vue'
import type { LoginRequest } from '@/infrastructure/api'
import { extractErrorMessage } from '@/utils/errors'
import { useRouter, useRoute } from 'vue-router'

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

      const me = await apiClient.request({
        url: '/api/auth/me',
        method: 'GET',
        responseStyle: 'data',
        credentials: 'include',
      })
      auth.setUserInfo(me.data.userRole, me.data.email)

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
