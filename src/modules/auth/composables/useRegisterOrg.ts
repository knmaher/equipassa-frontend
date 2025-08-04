import { ref } from 'vue'
import type { OrgRegistrationRequest, OrgUserResponse } from '@/infrastructure/api'
import { registerOrg as registerOrgRequest } from '@/infrastructure/api'
import { apiClient } from '@/infrastructure/http/ApiClient'
import { extractErrorMessage } from '@/utils/errors'

export function useRegisterOrg() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<OrgUserResponse | null>(null)

  async function registerOrg(payload: OrgRegistrationRequest) {
    loading.value = true
    error.value = null

    try {
      const resp = await registerOrgRequest({
        client: apiClient,
        body: payload,
        throwOnError: true,
        responseStyle: 'data',
      })
      result.value = resp
      return resp
    } catch (e: Error | unknown) {
      error.value = extractErrorMessage(e, 'Registration failed')
      throw e
    } finally {
      loading.value = false
    }
  }

  return { registerOrg, loading, error, result }
}
