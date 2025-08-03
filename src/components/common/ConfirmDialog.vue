<script setup lang="ts">
import { NModal, NCard, NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  show: boolean
  name: string
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'confirm'): void
}>()
const { t } = useI18n()
</script>

<template>
  <n-modal :show="props.show" @update:show="emit('update:show', $event)">
    <n-card closable style="width: 320px" @close="emit('update:show', false)">
      <div>{{ t('inventory.deleteMessage', { name: props.name }) }}</div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <n-button @click="emit('update:show', false)">{{ t('common.cancel') }}</n-button>
          <n-button type="error" @click="emit('confirm')">{{ t('common.delete') }}</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
</style>
