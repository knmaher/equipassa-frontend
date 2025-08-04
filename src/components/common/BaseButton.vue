<script setup lang="ts">
import { computed } from 'vue'
import { NButton } from 'naive-ui'
import type { ButtonProps } from 'naive-ui'

const props = withDefaults(
  defineProps<{
    /**
     * Naive‑UI button semantic type (primary, default, info, success, warning, error)
     */
    type?: ButtonProps['type']
    /**
     * Visual variant following Equipassa design tokens
     */
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    /**
     * Button size
     */
    size?: 'sm' | 'md' | 'lg'
    /**
     * Disable state
     */
    disabled?: boolean
    /**
     * Loading state
     */
    loading?: boolean
    /**
     * Whether the button takes full width
     */
    block?: boolean
    /**
     * Accessible label (recommended when only an icon is provided)
     */
    ariaLabel?: string
  }>(),
  {
    type: 'primary',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    block: false,
  },
)

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'lg':
      return 'px-5 py-3 text-base'
    default: // md
      return 'px-4 py-2 text-sm'
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700'
    case 'ghost':
      return 'bg-transparent text-indigo-600 hover:bg-indigo-50'
    default: // primary
      return 'bg-indigo-600 text-white hover:bg-indigo-700'
  }
})
</script>

<template>
  <n-button
    :type="props.type"
    :disabled="props.disabled"
    :loading="props.loading"
    :block="props.block"
    :aria-label="props.ariaLabel"
    class="rounded-md font-medium transition-colors disabled:opacity-50"
    :class="[sizeClass, variantClass]"
    @click="emit('click', $event)"
  >
    <slot name="icon" />
    <slot />
  </n-button>
</template>

<style scoped></style>
