import type { RequestOptions } from '@/infrastructure/api/client/types'
import { apiClient, ensureCsrf } from './ApiClient'

export async function handleAuthError(
  response: Response,
  request: Request,
  options: RequestOptions,
) {
  // CSRF recover: 403 on POST/PUT/PATCH/DELETE and no X-XSRF-TOKEN sent
  const method = request.method?.toUpperCase()
  const unsafe = method && !['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)

  if (response.status === 403 && unsafe) {
    // fetch token cookie
    await ensureCsrf()
    // retry original request once
    const client = (options as any).client ?? apiClient
    return client
      .request({ ...(options as any), credentials: 'include', method: method as any })
      .then((r: any) => r.response)
  }
  return response
}
