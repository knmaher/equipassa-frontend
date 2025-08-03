import { ref } from 'vue'
import { invite } from '@/infrastructure/api'
import { extractErrorMessage } from '@/utils/errors'
import { apiClient } from '@/infrastructure/http/ApiClient.ts'

export function useInviteMember() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function inviteMember(email: string, role: 'MEMBER' | 'STAFF') {
    loading.value = true
    error.value = null
    try {
      await invite({
        client: apiClient,
        body: { email, role },
        throwOnError: true,
        responseStyle: 'data',
      })
    } catch (e) {
      error.value = extractErrorMessage(e, 'Failed to invite member')
      throw e
    } finally {
      loading.value = false
    }
  }

  return { inviteMember, loading, error }
}
