<script setup lang="ts">
import PublicTopBar from './PublicTopBar.vue'
import { useSlots, computed } from 'vue'

const slots = useSlots()
const hasHero = computed(() => !!slots.hero)
const hasForm = computed(() => !!slots.form)
const hasBoth = computed(() => hasHero.value && hasForm.value)
</script>

<template>
  <div class="relative min-h-screen">
    <PublicTopBar />
    <div :class="['flex flex-col md:flex-row', { 'items-center justify-center': !hasBoth }]">
      <div v-if="hasHero" :class="[hasBoth ? 'md:w-3/5 w-full' : 'w-full']">
        <slot name="hero" />
      </div>
      <div v-if="hasForm" :class="[hasBoth ? 'md:w-2/5' : 'w-full', 'w-full p-4']">
        <slot name="form" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
