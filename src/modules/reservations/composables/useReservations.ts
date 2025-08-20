import { ref } from 'vue'
import {
  type CustomUserDetails,
  type ReservationRequest,
  type ReservationResponse,
  reserve,
} from '@/infrastructure/api'
import { apiClient } from '@/infrastructure/http/ApiClient'
import { extractErrorMessage } from '@/utils/errors'

export function useReservations() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const SESSION_USER: CustomUserDetails = {}

  async function createReservation(data: ReservationRequest): Promise<ReservationResponse> {
    loading.value = true
    error.value = null
    try {
      const { data: res } = await reserve({
        client: apiClient,
        body: data,
        query: { userDetails: SESSION_USER },
        throwOnError: true,
      })
      return res
    } catch (e) {
      error.value = extractErrorMessage(e, 'Failed to create reservation')
      throw e
    } finally {
      loading.value = false
    }
  }

  return { createReservation, loading, error }
}
