<script setup lang="ts">
import { useUiStore } from './stores/ui';

import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NDrawer,
  darkTheme,
  NMessageProvider,
} from 'naive-ui'
import TopBar from '@/components/layout/TopBar.vue'
import SidebarNav from '@/components/layout/SidebarNav.vue'

const ui = useUiStore()
const route = useRoute()
const showAdmin = computed(() => route.meta.requiresAuth === true)
</script>

<template>
  <n-config-provider :theme="ui.theme === 'dark' ? darkTheme : undefined">
    <n-message-provider>
      <n-layout class="h-screen">
      <template v-if="showAdmin">
        <n-layout-header
          class="fixed inset-x-0 top-0 z-30 shadow-sm backdrop-blur bg-white/70 dark:bg-gray-800/70"
        >
          <TopBar />
        </n-layout-header>
        <n-layout has-sider class="pt-16 h-full">
          <n-layout-sider
            collapse-mode="width"
            bordered
            :collapsed-width="64"
            :width="224"
            :collapsed="ui.sidebarCollapsed"
            class="transition-all hidden md:block"
          >
            <SidebarNav position="left" />
          </n-layout-sider>
          <n-layout-content class="overflow-auto">
            <div class="p-6">
              <RouterView />
            </div>
          </n-layout-content>
        </n-layout>
        <n-drawer
          v-model:show="ui.mobileSidebar"
          placement="left"
          :width="224"
          class="md:hidden"
        >
          <SidebarNav />
        </n-drawer>
      </template>
      <template v-else>
        <RouterView />
      </template>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
