<script setup lang="ts">
import {
  NButton,
  NIcon,
  NInput,
  NDropdown,
} from 'naive-ui'
import { useUiStore } from '@/stores/ui'
import {
  MenuOutline,
  NotificationsOutline,
  MoonOutline,
  SunnyOutline,
} from '@vicons/ionicons5'
import { LayoutSidebarLeftExpand, LayoutSidebarRightExpand, UserCircle } from '@vicons/tabler'
import SettingsDrawer from './SettingsDrawer.vue'
import { ref } from 'vue'
import { useLogout } from '@/modules/auth/composables/useLogout'

const { logout } = useLogout()

const ui = useUiStore()
const showSettings = ref(false)

const avatarOptions = [
  { label: 'Profile', key: 'profile' },
  { label: 'Settings', key: 'settings' },
  { label: 'Logout', key: 'logout' },
]

function handleSelect(key: string) {
  if (key === 'settings') {
    showSettings.value = true
  } else if (key === 'logout') {
    logout()
  }
}
</script>

<template>
  <div class="flex items-center justify-between h-16 px-4">
    <div class="flex items-center space-x-2">
      <n-button
        text
        class="md:hidden text-gray-600 dark:text-gray-300"
        aria-label="Open sidebar"
        @click="ui.openMobileSidebar"
      >
        <n-icon><MenuOutline /></n-icon>
      </n-button>
      <n-button
        text
        class="hidden md:inline-flex -ml-96 text-gray-600 dark:text-gray-300"
        aria-label="Toggle sidebar"
        @click="ui.toggleSidebar"
      >
        <n-icon
          :size="24"
        >
          <component
            :is="ui.sidebarCollapsed
              ? LayoutSidebarRightExpand
              : LayoutSidebarLeftExpand"
          />
        </n-icon>
      </n-button>
      <img src="../../assets/images/logo.svg" alt="Logo" class="w-[clamp(3rem,8vw,8rem)] h-auto" />
    </div>
    <div class="flex items-center space-x-3">
      <n-input
        placeholder="Search"
        size="small"
        class="w-32 md:w-64"
      />
      <n-button
        text
        aria-label="Notifications"
      >
        <n-icon :size="24">
          <NotificationsOutline  class="text-gray-600 dark:text-gray-300"/>
        </n-icon>
      </n-button>
      <n-button
        text
        aria-label="Toggle theme"
        class="text-gray-600 dark:text-gray-300"
        @click="ui.toggleTheme"
      >
        <n-icon
          :size="24"
        >
          <component :is="ui.theme === 'dark' ? SunnyOutline : MoonOutline" />
        </n-icon>
      </n-button>
      <n-dropdown
        trigger="click"
        :options="avatarOptions"
        @select="handleSelect"
        aria-label="User menu"
      >
        <n-icon
          :size="24"
        >
          <UserCircle class="text-gray-600 dark:text-gray-300"/>
        </n-icon>
      </n-dropdown>
    </div>
  </div>
  <SettingsDrawer v-model:show="showSettings" />
</template>

<style scoped>
</style>
