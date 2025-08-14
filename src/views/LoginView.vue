<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePublicForm } from '@/composables/usePublicForm'
import type { FormInst, FormRules } from 'naive-ui'
import { NCheckbox, NForm, NFormItem, NInput, NButton, NCard, NIcon } from 'naive-ui'
import { AtOutline, LockClosedOutline, EyeOutline, EyeOffOutline } from '@vicons/ionicons5'
import { useLogin } from '@/modules/auth/composables/useLogin'
import PublicLayout from '@/components/public/PublicLayout.vue'

const { router, t, message } = usePublicForm()
const { login, loading } = useLogin()

const showPassword = ref(false)
const formRef = ref<FormInst | null>(null)

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

const form = reactive<LoginForm>({
  email: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  email: [{ required: true, message: t('login.email'), trigger: 'blur' }],
  password: [{ required: true, message: t('login.password'), trigger: 'blur' }],
}

async function onSubmit() {
  try {
    await formRef.value?.validate()
    await login({ email: form.email, password: form.password })
  } catch {
    message.error(t('login.error'))
  }
}
</script>

<template>
  <PublicLayout>
    <template #form>
      <div class="flex items-center justify-center h-full">
        <n-card class="shadow-md rounded-lg p-6 dark:bg-gray-800 w-full max-w-md">
          <h2 class="text-2xl font-semibold mb-2 text-center">
            {{ t('login.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6 text-center">
            {{ t('login.subtitle') }}
          </p>
          <n-form ref="formRef" :model="form" :rules="rules" @submit.prevent="onSubmit">
            <n-form-item path="email">
              <n-input v-model:value="form.email" type="text" :placeholder="t('login.email')">
                <template #prefix>
                  <n-icon>
                    <AtOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input
                v-model:value="form.password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('login.password')"
              >
                <template #prefix>
                  <n-icon>
                    <LockClosedOutline />
                  </n-icon>
                </template>
                <template #suffix>
                  <n-icon class="cursor-pointer" @click="showPassword = !showPassword">
                    <component :is="showPassword ? EyeOffOutline : EyeOutline" />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <n-checkbox v-model:checked="form.remember">
                {{ t('login.remember') }}
              </n-checkbox>
            </n-form-item>
            <n-form-item>
              <n-button
                type="primary"
                block size="large"
                :loading="loading"
                attr-type="submit"
              >
                {{ t('login.submit') }}
              </n-button>
            </n-form-item>
          </n-form>
          <div class="text-center mt-2">
            <a href="#" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              {{ t('login.forgot') }}
            </a>
          </div>
          <div class="text-center text-sm mt-2">
            {{ t('login.noAccount') }}
            <a
              class="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              @click="router.push('/register-org')"
            >
              {{ t('login.registerLink') }}
            </a>
          </div>
        </n-card>
      </div>
    </template>
  </PublicLayout>
</template>

<style scoped></style>
