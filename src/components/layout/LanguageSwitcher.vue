<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NSelect } from 'naive-ui'

const { locale } = useI18n({ useScope: 'global' })

const options = [
  { label: 'EN', value: 'en' },
  { label: 'DE', value: 'de' },
]
</script>

<template>
  <n-select v-model:value="locale" :options="options" size="small" :clearable="false" />
</template>

<style scoped></style>
