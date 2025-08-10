import type { RequestOptions } from '@/infrastructure/api/client/types'

export async function handleAuthError(response: Response, request: Request, options: RequestOptions) {
  // CSRF recover: 403 on POST/PUT/PATCH/DELETE and no X-XSRF-TOKEN sent
  const method = request.method?.toUpperCase()
  const unsafe = method && !['GET','HEAD','OPTIONS','TRACE'].includes(method)

  if (response.status === 403 && unsafe) {
    // fetch token cookie
    await ensureCsrf()
    // retry original request once
    return (options.client ?? apiClient)
      .request({ ...options, credentials: 'include', method: method as any })
      .then(r => r.response)
  }
  return response
}
