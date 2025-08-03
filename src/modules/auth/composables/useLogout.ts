import { useRouter } from 'vue-router'
import { useAuthStore } from '../store'
import { useMessage } from 'naive-ui'

export function useLogout() {
  const router = useRouter()
  const message = useMessage()
  const authStore = useAuthStore()

  function logout() {
    authStore.logout()
    message.success('Logged out')
    router.push('/')
  }

  return { logout }
}
