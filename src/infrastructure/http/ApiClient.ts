import { API_BASE } from '@/config'
import { client as apiClient } from '@/infrastructure/api/client.gen'
import { handleAuthError } from './interceptors'
import Cookies from 'js-cookie'
import { csrf } from '@/infrastructure/api'

apiClient.setConfig({
  baseUrl: API_BASE,
  credentials: 'include', // send cookies
})

export async function ensureCsrf() {
  if (!Cookies.get('XSRF-TOKEN')) {
    await csrf({
      credentials: 'include',
      responseStyle: 'data',
    })
  }
}

apiClient.interceptors.request.use((request) => {
  const method = request.method?.toUpperCase()
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'TRACE') {
    return request
  }

  const token = Cookies.get('XSRF-TOKEN')
  if (!token) return request

  const headers = new Headers(request.headers)
  headers.set('X-XSRF-TOKEN', decodeURIComponent(token))
  return new Request(request, { headers, credentials: 'include' })
})

apiClient.interceptors.response.use(handleAuthError)

export { apiClient }
