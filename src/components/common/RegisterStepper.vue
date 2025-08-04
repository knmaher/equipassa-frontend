<script setup lang="ts">
import { NSteps, NStep } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ step: number }>()
const { t } = useI18n()
</script>

<template>
  <n-steps :current="props.step" class="mb-6">
    <n-step :title="t('register.stepOrg')" />
    <n-step :title="t('register.stepUser')" />
  </n-steps>
</template>

<style scoped></style>
