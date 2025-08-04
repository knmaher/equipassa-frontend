<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold">{{ t('inventory.title') }}</h1>
      <n-button type="primary" @click="openCreate">
        {{ t('inventory.addTool') }}
      </n-button>
    </div>
    <ToolList v-if="tools.length" :tools="tools">
      <template #default="{ tool }">
        <div class="mt-2 flex space-x-2">
          <n-button size="tiny" quaternary @click="openEdit(tool)">
            {{ t('common.edit') }}
          </n-button>
          <n-button size="tiny" quaternary type="error" @click="requestDelete(tool)">
            {{ t('common.delete') }}
          </n-button>
        </div>
      </template>
    </ToolList>
    <p v-else class="text-gray-600">{{ t('inventory.placeholder') }}</p>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    <ToolFormDialog
      v-model:show="showForm"
      :tool="editingTool"
      :loading="loading"
      @save="handleSave"
    />
    <ConfirmDialog
      v-model:show="showDelete"
      :name="toolToDelete?.name ?? ''"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMessage, NButton } from 'naive-ui'
import ToolList from '@/components/tools/ToolList.vue'
import ToolFormDialog from '@/components/tools/ToolFormDialog.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTools } from '@/modules/tools/composables/useTools'
import type { ToolResponse, ToolRequest } from '@/infrastructure/api'

const { t } = useI18n()
const message = useMessage()

const { tools, loading, error, fetchTools, createTool, updateTool, deleteTool } = useTools()

const showForm = ref(false)
const editingTool = ref<ToolResponse | null>(null)
const showDelete = ref(false)
const toolToDelete = ref<ToolResponse | null>(null)

onMounted(fetchTools)

function openCreate() {
  editingTool.value = null
  showForm.value = true
}

function openEdit(tool: ToolResponse) {
  editingTool.value = tool
  showForm.value = true
}

async function handleSave(data: ToolRequest, files: File[]) {
  try {
    if (editingTool.value?.id) {
      await updateTool(Number(editingTool.value.id), data, files)
      message.success(t('inventory.updated'))
    } else {
      await createTool(data, files)
      message.success(t('inventory.created'))
    }
    showForm.value = false
  } catch {
    message.error(t('inventory.error'))
  }
}

function requestDelete(tool: ToolResponse) {
  toolToDelete.value = tool
  showDelete.value = true
}

async function confirmDelete() {
  if (!toolToDelete.value?.id) return
  try {
    await deleteTool(Number(toolToDelete.value.id))
    message.success(t('inventory.deleted'))
  } catch {
    message.error(t('inventory.error'))
  } finally {
    showDelete.value = false
    toolToDelete.value = null
  }
}
</script>

<style scoped></style>
