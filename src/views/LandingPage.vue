<script setup lang="ts">
import { NButton, NCard, NIcon, NSteps, NStep } from 'naive-ui'
import { BagHandleOutline, LeafOutline, CashOutline } from '@vicons/ionicons5'
import { usePublicForm } from '@/composables/usePublicForm'
import PublicLayout from '@/components/public/PublicLayout.vue'

const { router, t } = usePublicForm()

const year = new Date().getFullYear()

function goToRegister() {
  router.push('/register-org')
}

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <PublicLayout>
    <template #hero>
      <main class="flex-1 space-y-16">
        <section class="text-center py-20 bg-gray-50 dark:bg-gray-900">
          <h1 class="font-bold text-3xl md:text-5xl mb-4">
            {{ t('landing.heroTitle') }}
          </h1>
          <p class="text-gray-600 dark:text-gray-300 text-lg mb-6">
            {{ t('landing.heroDescription') }}
          </p>
          <div class="space-x-4">
            <n-button type="primary" size="large" @click="goToRegister">
              {{ t('landing.registerButton') }}
            </n-button>
            <n-button size="large" @click="goToLogin">
              {{ t('landing.loginButton') }}
            </n-button>
          </div>
        </section>

        <section class="container mx-auto px-4">
          <div class="grid gap-6 md:grid-cols-3">
            <n-card class="text-center p-6 dark:bg-gray-800 dark:text-gray-100">
              <n-icon size="40" class="mx-auto text-indigo-600 mb-2">
                <BagHandleOutline />
              </n-icon>
              <h3 class="text-lg font-semibold mb-2">
                {{ t('landing.advantages.easy') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ t('landing.advantages.easyText') }}
              </p>
            </n-card>

            <n-card class="text-center p-6 dark:bg-gray-800 dark:text-gray-100">
              <n-icon size="40" class="mx-auto text-green-600 mb-2">
                <LeafOutline />
              </n-icon>
              <h3 class="text-lg font-semibold mb-2">
                {{ t('landing.advantages.sustainable') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ t('landing.advantages.sustainableText') }}
              </p>
            </n-card>

            <n-card class="text-center p-6 dark:bg-gray-800 dark:text-gray-100">
              <n-icon size="40" class="mx-auto text-yellow-600 mb-2">
                <CashOutline />
              </n-icon>
              <h3 class="text-lg font-semibold mb-2">
                {{ t('landing.advantages.saveMoney') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ t('landing.advantages.saveMoneyText') }}
              </p>
            </n-card>
          </div>
        </section>

        <section class="bg-gray-50 dark:bg-gray-900 py-12">
          <div class="container mx-auto px-4">
            <n-steps :size="'medium'" :current="1">
              <n-step :title="t('landing.steps.register')" />
              <n-step :title="t('landing.steps.reserve')" />
              <n-step :title="t('landing.steps.pickup')" />
            </n-steps>
          </div>
        </section>
      </main>
      <footer class="bg-gray-800 text-gray-300 text-sm py-6">
        <div
          class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0"
        >
          <p>&copy; {{ year }} Equipassa</p>
          <div class="space-x-4">
            <a href="#" class="hover:underline">Datenschutz</a>
            <a href="#" class="hover:underline">Impressum</a>
            <a href="#" class="hover:underline">Kontakt</a>
          </div>
        </div>
      </footer>
    </template>
  </PublicLayout>
</template>

<style scoped>
.container {
  max-width: 1024px;
}
</style>
