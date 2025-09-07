<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NButton,
  NSelect,
  type UploadFileInfo,
  type FormInst,
} from 'naive-ui'
import ImageUploader from '@/components/common/ImageUploader.vue'
import type { FormRules } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import type { ToolResponse, ToolRequest } from '@/infrastructure/api'
import { makeConditionOptions } from '@/modules/tools/model/condition-map'

const props = withDefaults(
  defineProps<{ show: boolean; tool?: ToolResponse | null; loading?: boolean }>(),
  { tool: null, loading: false },
)

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', data: ToolRequest, newFiles: File[], deleteKeys: string[]): void
}>()

const { t } = useI18n()
const formRef = ref<FormInst | null>(null)
const fileList = ref<UploadFileInfo[]>([])
const newFiles = ref<File[]>([])
const deletedKeys = ref<string[]>([])

// ✅ default condition to a valid enum (no empty string)
const form = reactive<ToolRequest>({
  name: '',
  description: '',
  category: '',
  conditionStatus: 'NEW',
  quantityAvailable: 0,
})

// ✅ rebuild options when locale changes
const conditionOptions = computed(() => makeConditionOptions(t))

watch(
  () => props.tool,
  (tool) => {
    form.name = tool?.name ?? ''
    form.description = tool?.description ?? ''
    form.category = tool?.category ?? ''
    form.conditionStatus = tool?.conditionStatus ?? 'NEW'
    form.quantityAvailable = tool?.quantityAvailable ?? 0

    fileList.value = (tool?.imageUrls ?? []).map((url, i) => ({
      id: `old-${i}`,
      name: url.split('/').pop() ?? `image-${i}`,
      url,
      status: 'finished',
    }))
    newFiles.value = []
    deletedKeys.value = []
  },
  { immediate: true },
)

watch(
  () => props.show,
  (v) => {
    if (!v) newFiles.value = []
  },
)

const rules: FormRules = {
  name: [{ required: true, message: t('inventory.name'), trigger: 'blur' }],
  category: [{ required: true, message: t('inventory.category'), trigger: 'blur' }],
  conditionStatus: [{ required: true, message: t('inventory.condition'), trigger: 'change' }],
  quantityAvailable: [
    { required: true, type: 'number', message: t('inventory.quantity'), trigger: 'blur' },
  ],
}

function handleAdd(files: File[]) {
  newFiles.value.push(...files)
}

function handleRemove(file: UploadFileInfo) {
  if (file.url && file.id?.toString().startsWith('old-')) {
    // store only the S3 key part
    const key = file.url.split('/equipassa/')[1]
    if (key) deletedKeys.value.push(key)
  }
}

async function onSave() {
  await formRef.value?.validate()
  emit('save', { ...form }, newFiles.value, deletedKeys.value)
}
</script>

<template>
  <n-modal :show="props.show" @update:show="emit('update:show', $event)">
    <n-card
      :title="props.tool ? t('inventory.editTool') : t('inventory.addTool')"
      closable
      style="width: 420px"
      @close="emit('update:show', false)"
    >
      <n-form ref="formRef" :model="form" :rules="rules" class="space-y-2">
        <n-form-item path="name" :label="t('inventory.name')">
          <n-input v-model:value="form.name" />
        </n-form-item>
        <n-form-item path="description" :label="t('inventory.description')">
          <n-input v-model:value="form.description" type="textarea" />
        </n-form-item>
        <n-form-item path="category" :label="t('inventory.category')">
          <n-input v-model:value="form.category" />
        </n-form-item>

        <!-- ✅ enum handled via select -->
        <n-form-item path="conditionStatus" :label="t('inventory.condition')">
          <n-select
            v-model:value="form.conditionStatus"
            :options="conditionOptions"
            :placeholder="t('inventory.condition')"
          />
        </n-form-item>

        <n-form-item path="quantityAvailable" :label="t('inventory.quantity')">
          <n-input-number v-model:value="form.quantityAvailable" :min="0" />
        </n-form-item>

        <n-form-item :label="t('inventory.uploadLabel')">
          <ImageUploader
            v-model:file-list="fileList"
            :max="3"
            @add="handleAdd"
            @remove="handleRemove"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <div class="flex justify-end gap-2">
          <n-button @click="emit('update:show', false)">{{ t('common.cancel') }}</n-button>
          <n-button type="primary" :loading="props.loading" @click="onSave">{{
            t('common.save')
          }}</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>
