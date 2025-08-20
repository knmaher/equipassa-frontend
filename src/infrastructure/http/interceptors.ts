import type { RequestOptions } from '@/infrastructure/api/client/types'
import { apiClient, ensureCsrf } from '@/infrastructure/http/ApiClient'

const METHODS = [
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'TRACE',
] as const
type Method = (typeof METHODS)[number]
const isMethod = (m: string): m is Method => (METHODS as readonly string[]).includes(m)

const SAFE_METHODS: readonly Method[] = ['GET', 'HEAD', 'OPTIONS', 'TRACE'] as const

export async function handleAuthError(
  response: Response,
  request: Request,
  options: RequestOptions,
) {
  const raw = request.method?.toUpperCase() ?? 'GET'
  const method: Method = isMethod(raw) ? raw : 'GET'
  const unsafe = !SAFE_METHODS.includes(method)

  if (response.status === 403 && unsafe) {
    await ensureCsrf()
    const { response: retried } = await apiClient.request({
      ...options,
      credentials: 'include',
      method,
    })
    return retried
  }
  return response
}
