<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">{{ t('dashboard.title') }}</h1>
    <p>{{ t('dashboard.welcome') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
</style>
