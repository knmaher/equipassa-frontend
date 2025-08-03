<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { useRouter, useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const ui = useUiStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const isLoginPage = computed(() => route.path === '/login')

function handleClick() {
  router.push(isLoginPage.value ? '/' : '/login')
}
</script>

<template>
  <div class="absolute top-4 right-4 flex items-center space-x-2 z-10">
    <LanguageSwitcher />
    <n-button text aria-label="Toggle theme" @click="ui.toggleTheme">
      <n-icon :size="24">
        <component :is="ui.theme === 'dark' ? SunnyOutline : MoonOutline" />
      </n-icon>
    </n-button>
    <n-button text @click="handleClick">
      {{ isLoginPage ? t('nav.home') : t('landing.loginButton') }}
    </n-button>
  </div>
</template>

<style scoped>
</style>
