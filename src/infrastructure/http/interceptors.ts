import type { RequestOptions } from '@/infrastructure/api/client/types'
import { useAuthStore } from '@/modules/auth/store'

export async function attachAuthHeader(
  request: Request,
  options: RequestOptions,
): Promise<Request> {
  if (options.security && options.security.length > 0) {
    const token = useAuthStore().token
    if (token) {
      const headers = new Headers(request.headers)
      headers.set('Authorization', `Bearer ${token}`)
      return new Request(request, { headers })
    }
  }
  return request
}

export async function handleAuthError(
  response: Response,
  _request: Request,
  options: RequestOptions,
): Promise<Response> {
  if (response.status === 401) {
    const authStore = useAuthStore()
    const refresh = authStore.refreshToken
    if (refresh) {
      try {
        const { refreshToken } = await import('../api')
        const tokens = await refreshToken({
          body: { refreshToken: refresh },
          throwOnError: true,
          responseStyle: 'data',
        })
        authStore.setTokens(tokens.data.token ?? null, tokens.data.refreshToken ?? null)
        const { apiClient } = await import('./ApiClient')
        const headers = new Headers(options.headers as HeadersInit)
        if (tokens.data.token) headers.set('Authorization', `Bearer ${tokens.data.token}`)
        const result = await apiClient.request({
          ...options,
          method: options.method ?? 'GET',
          headers,
          responseStyle: 'fields',
        })
        return result.response
      } catch {
        authStore.clearTokens()
      }
    }
  }
  return response
}
