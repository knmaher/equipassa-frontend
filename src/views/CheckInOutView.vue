<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">{{ t('checkInOut.title') }}</h1>
    <p class="text-gray-600">{{ t('checkInOut.placeholder') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
</style>
