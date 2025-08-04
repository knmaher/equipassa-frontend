import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const sidebarCollapsed = ref(false)
  const mobileSidebar = ref(false)
  const theme = ref<'light' | 'dark'>('light')

  const stored = localStorage.getItem('sidebar-collapsed')

  if (stored !== null) {
    sidebarCollapsed.value = stored === 'true'
  }

  watch(sidebarCollapsed, (val) => {
    localStorage.setItem('sidebar-collapsed', String(val))
  })

  function setTheme(value: 'light' | 'dark') {
    theme.value = value
    document.documentElement.classList.toggle('dark', value === 'dark')
    localStorage.setItem('theme', value)
  }

  function toggleTheme() {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  function initTheme() {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function openMobileSidebar() {
    mobileSidebar.value = true
  }

  function closeMobileSidebar() {
    mobileSidebar.value = false
  }

  initTheme()

  return {
    sidebarCollapsed,
    toggleSidebar,
    mobileSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  }
})
