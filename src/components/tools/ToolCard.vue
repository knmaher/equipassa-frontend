<script setup lang="ts">
import { NCard, NIcon } from 'naive-ui'
import ImageCarousel from './ImageCarousel.vue'
import { useI18n } from 'vue-i18n'
import {
  conditionKeys,
  conditionIcon,
  conditionChipClasses,
  genericIcons,
} from '@/modules/tools/model/condition-map'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    category?: string
    conditionStatus?: 'NEW' | 'GOOD' | 'FAIR' | 'POOR' | 'DAMAGED' | 'NEEDS_REPAIR'
    quantityAvailable?: number
    images?: string[]
  }>(),
  {
    description: '',
    category: '',
    conditionStatus: 'NEW',
    quantityAvailable: 0,
    images: () => [],
  },
)

const { t } = useI18n()

const conditionLabel = computed(() =>
  props.conditionStatus ? t(conditionKeys[props.conditionStatus]) : '',
)

const conditionClasses = computed(() =>
  props.conditionStatus
    ? conditionChipClasses[props.conditionStatus]
    : 'bg-gray-50 text-gray-600 ring-1 ring-gray-200',
)

const conditionComp = computed(() =>
  props.conditionStatus ? conditionIcon[props.conditionStatus] : null,
)
</script>

<template>
  <n-card
    class="overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg p-0"
    content-style="padding:0"
  >
    <ImageCarousel v-if="props.images && props.images.length" :images="props.images" />
    <div v-else class="w-full h-56 bg-gray-100 dark:bg-neutral-700" />

    <div class="p-4 flex flex-col gap-3">
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {{ props.title }}
        </h3>

        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          :class="conditionClasses"
        >
          <n-icon v-if="conditionComp" :component="conditionComp" class="w-3.5 h-3.5" />
          <span>{{ conditionLabel }}</span>
        </div>
      </div>

      <p v-if="props.description" class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
        {{ props.description }}
      </p>

      <div class="flex flex-wrap items-center gap-4 text-sm">
        <div v-if="props.category" class="flex items-center gap-1.5 text-gray-500">
          <n-icon :component="genericIcons.category" class="w-4 h-4" />
          <span>{{ props.category }}</span>
        </div>
        <div
          v-if="props.quantityAvailable !== undefined"
          class="flex items-center gap-1.5 text-gray-500"
        >
          <n-icon :component="genericIcons.quantity" class="w-4 h-4" />
          <span>{{ props.quantityAvailable }}</span>
        </div>
      </div>

      <div class="mt-1">
        <slot />
      </div>
    </div>
  </n-card>
</template>
