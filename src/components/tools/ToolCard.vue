<script setup lang="ts">
import { NCard } from 'naive-ui'
import ImageCarousel from './ImageCarousel.vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    category?: string
    conditionStatus?: string
    quantityAvailable?: number
    images?: string[]
  }>(),
  {
    description: '',
    category: '',
    conditionStatus: '',
    quantityAvailable: 0,
    images: () => [],
  },
)
</script>

<template>
  <n-card class="overflow-hidden transition-transform duration-300 hover:scale-105">
    <ImageCarousel v-if="props.images" :images="props.images" />
    <div v-else class="w-full h-56 rounded-xl bg-gray-100 dark:bg-neutral-700" />
    <h3 class="text-lg font-semibold mt-2">{{ props.title }}</h3>
    <p v-if="props.description" class="text-gray-600 text-sm mt-1">
      {{ props.description }}
    </p>
    <p v-if="props.category" class="text-gray-600 text-sm mt-1">
      {{ props.category }}
    </p>
    <p v-if="props.conditionStatus" class="text-gray-600 text-sm mt-1">
      {{ props.conditionStatus }}
    </p>
    <p v-if="props.quantityAvailable" class="text-gray-600 text-sm mt-1">
      {{ props.quantityAvailable }}
    </p>
    <slot />
  </n-card>
</template>

<style scoped></style>
