<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { NUpload, useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import type { UploadFileInfo } from 'naive-ui'

const props = withDefaults(
  defineProps<{ fileList: UploadFileInfo[]; max?: number }>(),
  { max: 3 }
)

const emit = defineEmits<{
  (e: 'update:fileList', value: UploadFileInfo[]): void
  (e: 'add', files: File[]): void
  (e: 'remove', file: UploadFileInfo): void
}>()

const message = useMessage()
const { t } = useI18n()

const files = ref<UploadFileInfo[]>([...props.fileList])

watch(
  () => props.fileList,
  (val) => { files.value = [...val] },
  { deep: true }
)

function handleChange ({ fileList }: { fileList: UploadFileInfo[] }) {
  const valid: UploadFileInfo[] = []
  const added: File[] = []

  for (const item of fileList) {
    const file = item.file
    if (!file) continue

    if (file.size > 3 * 1024 * 1024) {
      message.error(`${file.name} – ${t('inventory.fileTooLarge')}`)
      continue
    }

    if (!item.url) item.url = URL.createObjectURL(file)

    if (!('id' in item)) added.push(file)

    valid.push(item)
  }

  const removed = files.value.find(
    prev => !valid.some(now => now.id === prev.id)
  )

  if (added.length) emit('add', added)
  if (removed) emit('remove', removed)

  files.value = valid.slice(0, props.max)
  emit('update:fileList', files.value)

  if (fileList.length > props.max) {
    message.warning(t('inventory.maxFiles', { max: props.max }))
  }
}

onBeforeUnmount(() => {
  files.value.forEach(f => f.url && URL.revokeObjectURL(f.url))
})
</script>

<template>
  <n-upload
    v-model:file-list="files"
    list-type="image-card"
    :max="props.max"
    :default-upload="false"
    accept="image/*"
    class="rounded-xl shadow-sm dark:bg-neutral-800"
    @change="handleChange"
  />
</template>

<style scoped>
:deep(.n-upload-file-list) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  gap: 0.5rem;
}
</style>
