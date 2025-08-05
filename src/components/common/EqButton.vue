<script setup lang="ts">
import { computed, useAttrs, defineOptions } from 'vue'
import { NButton, type ButtonProps } from 'naive-ui'
import { omit } from 'lodash-es'

defineOptions({ name: 'EqButton' })

type CustomProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  ariaLabel?: string
}

type PassThrough = Omit<ButtonProps, 'size' | 'type' | 'block'>

const props = withDefaults(defineProps<PassThrough & CustomProps>(), {
  type: 'default',
  variant: 'primary',
  size: 'md',
  block: false,
})

const emit = defineEmits<{ (e: 'click', evt: MouseEvent): void }>()

const twSize = computed(
  () =>
    ({
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-3 text-base',
    })[props.size!],
)

const twVariant = computed(
  () =>
    ({
      primary: 'bg-equipassa-primary text-white hover:bg-equipassa-primary-dark',
      secondary: 'bg-white text-equipassa-primary border border-equipassa-primary hover:bg-gray-50',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      ghost: 'bg-transparent text-equipassa-primary hover:bg-gray-50',
    })[props.variant!],
)

const attrs = useAttrs()
const nButtonProps = omit(attrs, ['class'])
</script>

<template>
  <n-button
    v-bind="nButtonProps"
    :disabled="props.disabled"
    :loading="props.loading"
    :block="props.block"
    :aria-label="props.ariaLabel"
    class="rounded-md font-medium transition focus:outline-none disabled:opacity-50"
    :class="[twSize, twVariant, { 'w-full': props.block }]"
    @click="emit('click', $event)"
  >
    <slot name="icon" />
    <span v-if="$slots.default"><slot /></span>
  </n-button>
</template>
