<script setup lang="ts">
import { ref, reactive } from 'vue'
import { usePublicForm } from '@/composables/usePublicForm'
import type { FormInst, FormRules } from 'naive-ui'
import { NForm, NFormItem, NInput, NButton, NCheckbox, NCard, NSelect } from 'naive-ui'
import RegisterStepper from '@/components/common/RegisterStepper.vue'
import PublicLayout from '@/components/public/PublicLayout.vue'
import { useRegisterOrg } from '@/modules/auth/composables/useRegisterOrg'
import type { OrgRegistrationRequest } from '@/infrastructure/api'

const { router, t, message } = usePublicForm()

const step = ref(1)
const formRef = ref<FormInst | null>(null)
const { registerOrg, loading } = useRegisterOrg()

interface RegisterForm {
  organizationName: string
  subscriptionTier: 'FREE' | 'PREMIUM' | 'ENTERPRISE'
  addressRequest: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  adminFirstname: string
  adminLastname: string
  adminEmail: string
  adminPassword: string
  confirmPassword: string
  acceptTerms: boolean
}

const form = reactive<RegisterForm>({
  organizationName: '',
  subscriptionTier: 'FREE',
  addressRequest: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  adminFirstname: '',
  adminLastname: '',
  adminEmail: '',
  adminPassword: '',
  confirmPassword: '',
  acceptTerms: false,
})

const rulesStep1: FormRules = {
  organizationName: [{ required: true, message: t('register.orgName'), trigger: 'blur' }],
  'addressRequest.street': [{ required: true, message: t('register.street'), trigger: 'blur' }],
  'addressRequest.city': [{ required: true, message: t('register.city'), trigger: 'blur' }],
  'addressRequest.state': [{ required: true, message: t('register.state'), trigger: 'blur' }],
  'addressRequest.postalCode': [
    { required: true, message: t('register.postalCode'), trigger: 'blur' },
  ],
  'addressRequest.country': [{ required: true, message: t('register.country'), trigger: 'blur' }],
}

const rulesStep2: FormRules = {
  adminFirstname: [{ required: true, message: t('register.adminFirstname'), trigger: 'blur' }],
  adminLastname: [{ required: true, message: t('register.adminLastname'), trigger: 'blur' }],
  adminEmail: [{ required: true, message: t('register.adminEmail'), trigger: 'blur' }],
  adminPassword: [{ required: true, message: t('register.adminPassword'), trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: t('register.confirmPassword'), trigger: 'blur' },
    {
      validator: () => form.confirmPassword === form.adminPassword,
      message: t('register.confirmPassword'),
      trigger: 'blur',
    },
  ],
  acceptTerms: [
    { type: 'boolean', required: true, message: t('register.acceptTerms'), trigger: 'change' },
  ],
}

async function nextStep() {
  try {
    await formRef.value?.validate()
    step.value = 2
  } catch {
    // validation errors handled by form
  }
}

async function submit() {
  try {
    await formRef.value?.validate()
    const payload: OrgRegistrationRequest = {
      organizationName: form.organizationName,
      adminFirstname: form.adminFirstname,
      adminLastname: form.adminLastname,
      adminEmail: form.adminEmail,
      adminPassword: form.adminPassword,
      subscriptionTier: form.subscriptionTier,
      addressRequest: { ...form.addressRequest },
    }
    await registerOrg(payload)
    router.push('/login')
  } catch {
    message.error(t('register.error'))
  }
}
</script>

<template>
  <PublicLayout>
    <template #form>
      <div class="max-w-2xl mx-auto p-6 space-y-4">
        <RegisterStepper :step="step" />
        <n-card class="p-6 space-y-4 shadow-md rounded-lg dark:bg-gray-800">
          <n-form
            ref="formRef"
            :model="form"
            :rules="step === 1 ? rulesStep1 : rulesStep2"
            class="space-y-4"
          >
            <template v-if="step === 1">
              <n-form-item path="organizationName" :label="t('register.orgName')">
                <n-input v-model:value="form.organizationName" />
              </n-form-item>
              <n-form-item path="subscriptionTier" :label="t('register.subscriptionTier')">
                <n-select
                  v-model:value="form.subscriptionTier"
                  :options="[
                    { label: 'FREE', value: 'FREE' },
                    { label: 'PREMIUM', value: 'PREMIUM' },
                    { label: 'ENTERPRISE', value: 'ENTERPRISE' },
                  ]"
                />
              </n-form-item>
              <n-form-item :label="t('register.addressTitle')" path="addressRequest.street">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                  <n-input
                    v-model:value="form.addressRequest.street"
                    :placeholder="t('register.street')"
                  />
                  <n-input
                    v-model:value="form.addressRequest.city"
                    :placeholder="t('register.city')"
                  />
                  <n-input
                    v-model:value="form.addressRequest.state"
                    :placeholder="t('register.state')"
                  />
                  <n-input
                    v-model:value="form.addressRequest.postalCode"
                    :placeholder="t('register.postalCode')"
                  />
                  <n-input
                    v-model:value="form.addressRequest.country"
                    :placeholder="t('register.country')"
                  />
                </div>
              </n-form-item>
              <div class="flex justify-end">
                <n-button type="primary" @click="nextStep">{{ t('register.next') }}</n-button>
              </div>
            </template>
            <template v-else>
              <n-form-item path="adminFirstname" :label="t('register.adminFirstname')">
                <n-input v-model:value="form.adminFirstname" />
              </n-form-item>
              <n-form-item path="adminLastname" :label="t('register.adminLastname')">
                <n-input v-model:value="form.adminLastname" />
              </n-form-item>
              <n-form-item path="adminEmail" :label="t('register.adminEmail')">
                <n-input v-model:value="form.adminEmail" type="text" />
              </n-form-item>
              <n-form-item path="adminPassword" :label="t('register.adminPassword')">
                <n-input v-model:value="form.adminPassword" type="password" />
              </n-form-item>
              <n-form-item path="confirmPassword" :label="t('register.confirmPassword')">
                <n-input v-model:value="form.confirmPassword" type="password" />
              </n-form-item>
              <n-form-item path="acceptTerms">
                <n-checkbox v-model:checked="form.acceptTerms">
                  {{ t('register.acceptTerms') }}
                </n-checkbox>
              </n-form-item>
              <div class="flex justify-between">
                <n-button @click="step = 1">{{ t('register.back') }}</n-button>
                <n-button type="primary" @click="submit" :loading="loading">
                  {{ t('register.submit') }}
                </n-button>
              </div>
            </template>
          </n-form>
        </n-card>
      </div>
    </template>
  </PublicLayout>
</template>

<style scoped></style>
