<script setup lang="ts">
import ToolCard from './ToolCard.vue'
import type { ToolResponse } from '@/infrastructure/api'

const { tools } = defineProps<{ tools: ToolResponse[] }>()
</script>

<template>
  <TransitionGroup
    name="fade"
    tag="div"
    class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  >
    <ToolCard
      v-for="(tool, idx) in tools"
      :key="tool.id != null ? Number(tool.id) : idx"
      :title="tool.name ?? ''"
      :description="tool.description"
      :category="tool.category"
      :condition-status="tool.conditionStatus || undefined"
      :quantity-available="tool.quantityAvailable || undefined"
      :images="tool.imageUrls ?? []"
    >
      <slot :tool="tool" />
    </ToolCard>
  </TransitionGroup>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
