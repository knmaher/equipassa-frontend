<script setup lang="ts">
import { computed } from 'vue'
import { NDrawer, NDrawerContent, NRadioGroup, NRadio } from 'naive-ui'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'update:show', value: boolean): void }>()

const ui = useUiStore()

const model = computed({
  get: () => ui.theme,
  set: val => ui.setTheme(val as 'light' | 'dark'),
})
</script>

<template>
  <n-drawer
    :show="props.show"
    placement="right"
    :width="240"
    @update:show="emit('update:show', $event)"
  >
    <n-drawer-content title="Settings">
      <div class="space-y-4">
        <n-radio-group v-model:value="model">
          <n-radio value="light">Light</n-radio>
          <n-radio value="dark">Dark</n-radio>
        </n-radio-group>
        <LanguageSwitcher />
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
</style>
