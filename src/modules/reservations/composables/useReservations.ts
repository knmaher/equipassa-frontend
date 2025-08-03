import { ref } from 'vue'
import { reserve, type ReservationRequest, type ReservationResponse } from '@/infrastructure/api'
import { apiClient } from '@/infrastructure/http/ApiClient'
import { extractErrorMessage } from '@/utils/errors'

export function useReservations() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function createReservation(data: ReservationRequest) {
    loading.value = true
    error.value = null
    try {
      const resp = await reserve({
        client: apiClient,
        body: data,
        // backend derives user from token, parameter required by typings
        query: {} as any,
        throwOnError: true,
        responseStyle: 'data',
      })
      return resp as ReservationResponse
    } catch (e) {
      error.value = extractErrorMessage(e, 'Failed to create reservation')
      throw e
    } finally {
      loading.value = false
    }
  }

  return { createReservation, loading, error }
}
