import type EqButton from '@/components/common/EqButton.vue'

declare module 'vue' {
  export interface GlobalComponents {
    EqButton: typeof EqButton
  }
}

export {}
