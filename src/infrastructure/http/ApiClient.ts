import { API_BASE } from '@/config'
import { client as apiClient } from '@/infrastructure/api/client.gen'
import { attachAuthHeader, handleAuthError } from './interceptors'

apiClient.setConfig({ baseUrl: API_BASE })

apiClient.interceptors.request.use(attachAuthHeader)
apiClient.interceptors.response.use(handleAuthError)

export { apiClient }
