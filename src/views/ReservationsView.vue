<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold">{{ t('reservations.title') }}</h1>
      <n-button type="primary" @click="openForm">
        {{ t('reservations.reserveTool') }}
      </n-button>
    </div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="!tools.length" class="text-gray-600">{{ t('reservations.placeholder') }}</p>
    <ReserveDialog v-model:show="showForm" :tools="tools" :loading="loading" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMessage, NButton } from 'naive-ui'
import ReserveDialog from '@/components/reservations/ReserveDialog.vue'
import { useTools } from '@/modules/tools/composables/useTools'
import { useReservations } from '@/modules/reservations/composables/useReservations'
import type { ReservationRequest } from '@/infrastructure/api'

const { t } = useI18n()
const message = useMessage()

const { tools, fetchTools } = useTools()
const { createReservation, loading, error } = useReservations()

const showForm = ref(false)

onMounted(fetchTools)

function openForm() {
  showForm.value = true
}

async function handleSave(payload: ReservationRequest) {
  try {
    await createReservation(payload)
    message.success(t('reservations.created'))
    showForm.value = false
  } catch {
    message.error(t('reservations.error'))
  }
}
</script>

<style scoped></style>
