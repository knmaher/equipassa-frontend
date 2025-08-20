import Cookies from 'js-cookie'
import { client as heyClient } from '@/infrastructure/api/client.gen'
import { csrf } from '@/infrastructure/api'

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
const isUnsafe = (m: Method) => !SAFE_METHODS.includes(m)

heyClient.setConfig({
  baseUrl: 'http://localhost:8081',
  credentials: 'include',
})

export async function ensureCsrf() {
  if (!Cookies.get('XSRF-TOKEN')) {
    await csrf({
      client: heyClient,
      credentials: 'include',
      responseStyle: 'data',
    })
  }
}

heyClient.interceptors.request.use((request) => {
  const raw = request.method?.toUpperCase() ?? 'GET'
  const method: Method = isMethod(raw) ? raw : 'GET'
  if (!isUnsafe(method)) return request

  const token = Cookies.get('XSRF-TOKEN')
  if (!token) return request

  const headers = new Headers(request.headers)
  headers.set('X-XSRF-TOKEN', decodeURIComponent(token))
  return new Request(request, { headers, credentials: 'include' })
})

heyClient.interceptors.response.use(async (response, request, options) => {
  if (response.status !== 403) return response

  const raw = request.method?.toUpperCase() ?? 'GET'
  const method: Method = isMethod(raw) ? raw : 'GET'
  if (!isUnsafe(method)) return response

  await ensureCsrf()

  const { response: retried } = await heyClient.request({
    ...options,
    credentials: 'include',
    method,
  })

  return retried
})

export const apiClient = heyClient
