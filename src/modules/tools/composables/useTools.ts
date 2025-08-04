import { ref } from 'vue'
import { apiClient } from '@/infrastructure/http/ApiClient'
import {
  getTools,
  deleteTool,
  createTool,
  updateTool,
  type ToolRequest,
  type ToolResponse,
} from '@/infrastructure/api'
import { extractErrorMessage } from '@/utils/errors'

export function useTools() {
  const tools = ref<ToolResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  function buildForm(data: ToolRequest, files: File[]): FormData {
    return {
      toolRequest: new Blob([JSON.stringify(data)], { type: 'application/json' }),
      files,
    }
  }

  async function fetchTools() {
    loading.value = true
    error.value = null
    try {
      const resp = await getTools({
        client: apiClient,
        throwOnError: true,
        responseStyle: 'data',
      })
      tools.value = Array.isArray(resp) ? resp : ((resp as any)?.content ?? [])
    } catch (e) {
      error.value = extractErrorMessage(e, 'Failed to fetch tools')
      throw e
    } finally {
      loading.value = false
    }
  }

  async function createToolItem(data: ToolRequest, files: File[] = []) {
    loading.value = true
    error.value = null
    try {
      await createTool({
        client: apiClient,
        body: buildForm(data, files) as any,
        throwOnError: true,
        responseStyle: 'data',
      })
      await fetchTools()
    } catch (e) {
      error.value = extractErrorMessage(e, 'Failed to create tool')
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateToolItem(id: number, data: ToolRequest, files: File[] = []) {
    loading.value = true
    error.value = null
    try {
      await updateTool({
        client: apiClient,
        path: { id: BigInt(id) },
        body: buildForm(data, files) as any,
        throwOnError: true,
        responseStyle: 'data',
      })
      await fetchTools()
    } catch (e) {
      error.value = extractErrorMessage(e, 'Failed to update tool')
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteToolItem(id: number) {
    loading.value = true
    error.value = null
    try {
      await deleteTool({
        client: apiClient,
        path: { id: BigInt(id) },
        throwOnError: true,
      })
      await fetchTools()
    } catch (e) {
      error.value = extractErrorMessage(e, 'Failed to delete tool')
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    tools,
    loading,
    error,
    fetchTools,
    createTool: createToolItem,
    updateTool: updateToolItem,
    deleteTool: deleteToolItem,
  }
}
