<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NSelect,
  NDatePicker,
  NInputNumber,
  NButton,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import type { ReservationRequest, ToolResponse } from '@/infrastructure/api'

const props = withDefaults(
  defineProps<{ show: boolean; tools: ToolResponse[]; loading?: boolean }>(),
  { loading: false }
)
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', data: ReservationRequest): void
}>()
const { t } = useI18n()

const formRef = ref<FormInst | null>(null)

const form = reactive<{ toolId: number | null; dates: [number, number] | null; quantity: number }>(
  {
    toolId: null,
    dates: null,
    quantity: 1,
  }
)

watch(
  () => props.show,
  (val) => {
    if (!val) {
      form.toolId = null
      form.dates = null
      form.quantity = 1
    }
  }
)

const rules: FormRules = {
  toolId: [{ required: true, type: 'number', message: t('reservations.tool'), trigger: 'change' }],
  dates: [{ required: true, type: 'array', message: t('reservations.from'), trigger: 'change' }],
  quantity: [{ required: true, type: 'number', message: t('reservations.quantity'), trigger: 'change' }],
}

function handleSave() {
  formRef.value?.validate().then(() => {
    if (!form.dates || form.toolId == null) return
    const payload: ReservationRequest = {
      toolId: BigInt(form.toolId),
      reservedFrom: new Date(form.dates[0]),
      reservedUntil: new Date(form.dates[1]),
      quantity: form.quantity,
    }
    emit('save', payload)
  })
}
</script>

<template>
  <n-modal :show="props.show" @update:show="emit('update:show', $event)">
    <n-card :title="t('reservations.reserveTool')" closable style="width: 380px" @close="emit('update:show', false)">
      <n-form ref="formRef" :model="form" :rules="rules" class="space-y-2">
        <n-form-item path="toolId" :label="t('reservations.tool')">
          <n-select
            v-model:value="form.toolId"
            :options="props.tools.map(t => ({ label: t.name ?? '', value: Number(t.id) }))"
          />
        </n-form-item>
        <n-form-item path="dates" :label="t('reservations.from')">
          <n-date-picker v-model:value="form.dates" type="datetimerange" clearable />
        </n-form-item>
        <n-form-item path="quantity" :label="t('reservations.quantity')">
          <n-input-number v-model:value="form.quantity" :min="1" />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <n-button @click="emit('update:show', false)">{{ t('common.cancel') }}</n-button>
          <n-button type="primary" :loading="props.loading" @click="handleSave">
            {{ t('reservations.submit') }}
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
