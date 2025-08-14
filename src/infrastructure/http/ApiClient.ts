// src/infrastructure/http/ApiClient.ts
import Cookies from 'js-cookie'
import { client as heyClient } from '@/infrastructure/api/client.gen'
import { csrf } from '@/infrastructure/api'

// 1) Basis-Config: Cookies mitschicken
heyClient.setConfig({
  baseUrl: 'http://localhost:8081',
  credentials: 'include',
})

// 2) CSRF on-demand holen (nur wenn kein Cookie)
export async function ensureCsrf() {
  if (!Cookies.get('XSRF-TOKEN')) {
    await csrf({
      client: heyClient,
      credentials: 'include',
      responseStyle: 'data',
    })
  }
}

// 3) Request-Interceptor: X-XSRF-TOKEN für „unsichere“ Methoden setzen
heyClient.interceptors.request.use((request) => {
  const method = request.method?.toUpperCase()
  if (!method || ['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)) {
    return request
  }

  const token = Cookies.get('XSRF-TOKEN')
  if (!token) return request

  const headers = new Headers(request.headers)
  headers.set('X-XSRF-TOKEN', decodeURIComponent(token))
  return new Request(request, { headers, credentials: 'include' })
})

// 4) Response-Interceptor: 403 -> CSRF holen -> exakt denselben Call einmal retryen
heyClient.interceptors.response.use(async (response, request, options) => {
  if (response.status !== 403) return response

  const method = request.method?.toUpperCase()
  const unsafe = method && !['GET','HEAD','OPTIONS','TRACE'].includes(method)
  if (!unsafe) return response

  await ensureCsrf()
  return (options.client ?? heyClient).request({
    ...options,
    credentials: 'include',
    method: method as any,
  }).then(r => r.response)
})

export const apiClient = heyClient
