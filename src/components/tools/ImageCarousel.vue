<script setup lang="ts">
import { ref } from 'vue'
import { NImage } from 'naive-ui'

const props = defineProps<{ images: string[] }>()
const current = ref(0)

const next = () => {
  current.value = (current.value + 1) % props.images.length
}
const prev = () => {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}
</script>

<template>
  <div class="relative w-full h-56">
    <n-image
      v-if="props.images.length"
      :src="props.images[current]"
      :alt="`Image ${current + 1}`"
      preview-disabled
      class="w-full h-full object-cover"
    />
    <div
      v-else
      class="w-full h-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center text-gray-400"
    >
      No image
    </div>

    <EqButton
      v-if="props.images.length > 1"
      variant="ghost"
      size="sm"
      class="!absolute top-1/2 left-3 -translate-y-1/2 rounded-full !p-2 bg-black/40 hover:bg-black/60 text-white"
      aria-label="Previous image"
      @click="prev"
      >‹</EqButton
    >

    <EqButton
      v-if="props.images.length > 1"
      variant="ghost"
      size="sm"
      class="!absolute top-1/2 right-3 -translate-y-1/2 rounded-full !p-2 bg-black/40 hover:bg-black/60 text-white"
      aria-label="Next image"
      @click="next"
      >›</EqButton
    >

    <div
      v-if="props.images.length > 1"
      class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2"
    >
      <span
        v-for="(_, idx) in props.images"
        :key="idx"
        class="w-2 h-2 rounded-full transition cursor-pointer"
        :class="idx === current ? 'bg-equipassa-primary' : 'bg-white/60'"
        @click="current = idx"
      />
    </div>
  </div>
</template>
