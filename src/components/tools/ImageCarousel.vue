<script setup lang="ts">
import { NCarousel, NImage } from 'naive-ui'

const props = defineProps<{ images: string[] }>()
</script>

<template>
  <n-carousel
    v-if="props.images.length"
    dot-type="line"
    :autoplay="false"
    :show-arrow="props.images.length > 1"
    :style="{ height: '8rem' }"
  >
    <n-image
      v-for="(img, idx) in props.images"
      :key="idx"
      :src="img"
      class="w-full h-32 rounded-xl object-cover"
    />
  </n-carousel>
  <div v-else class="w-full h-32 rounded-xl bg-gray-100 dark:bg-neutral-700" />
</template>
