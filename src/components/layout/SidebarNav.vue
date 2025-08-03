<script setup lang="ts">
import { computed, h } from 'vue'
import { NMenu, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { useRouter } from 'vue-router'
import {
  SpeedometerOutline,
  CubeOutline,
  PeopleOutline,
  CalendarOutline,
  CardOutline,
  HammerOutline,
  BarChartOutline,
} from '@vicons/ionicons5'
import type { Component } from 'vue'

export interface NavItem {
  label: string
  key: string
  icon: Component
  to: string
}

const router = useRouter()
const activeKey = computed(() => router.currentRoute.value.path)

function handleUpdate(key: string, option: MenuOption) {
  if (typeof option.to === 'string') router.push(option.to)
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const items: NavItem[] = [
  { label: 'Dashboard', key: '/dashboard', icon: SpeedometerOutline, to: '/dashboard' },
  { label: 'Inventory', key: '/inventory', icon: CubeOutline, to: '/inventory' },
  { label: 'Members', key: '/members', icon: PeopleOutline, to: '/members' },
  { label: 'Reservations', key: '/reservations', icon: CalendarOutline, to: '/reservations' },
  { label: 'Billing', key: '/billing', icon: CardOutline, to: '/billing' },
  { label: 'Maintenance', key: '/maintenance', icon: HammerOutline, to: '/maintenance' },
  { label: 'Analytics', key: '/analytics', icon: BarChartOutline, to: '/analytics' },
]

const menuOptions: MenuOption[] = items.map(i => ({
  label: i.label,
  key: i.key,
  icon: renderIcon(i.icon),
  to: i.to,
}))
</script>

<template>
  <nav aria-label="Main" class="h-full">
    <n-menu
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleUpdate"
    />
  </nav>
</template>

<style scoped>
</style>
