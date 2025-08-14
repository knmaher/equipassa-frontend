// src/modules/auth/composables/useLogin.ts
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

      // 1) Login -> setzt EQUIPASSA_SESSION (HttpOnly)
      await loginRequest({
        client: apiClient,
        body: payload,
        throwOnError: true,
        responseStyle: 'data',
        credentials: 'include',
      })

      // 2) Roundtrip, um Session zu verifizieren & Store zu füllen
      const meRes = await me({
        client: apiClient,
        responseStyle: 'data',
        credentials: 'include',
      })
      auth.setUserInfo(meRes.userRole!, meRes.email!)

      // 3) Redirect
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
