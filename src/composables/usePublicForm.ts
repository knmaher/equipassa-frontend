import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMessage } from 'naive-ui'
import { useUiStore } from '@/stores/ui'

export function usePublicForm() {
  const router = useRouter()
  const { t } = useI18n()
  const message = useMessage()
  const ui = useUiStore()
  return { router, t, message, ui }
}
