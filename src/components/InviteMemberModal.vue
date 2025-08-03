<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  type FormInst,
  type FormRules,
  useMessage,
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useInviteMember } from '@/composables/useInviteMember'

interface InviteForm {
  email: string
  role: 'MEMBER' | 'STAFF'
}

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'update:show', value: boolean): void }>()

const { t } = useI18n()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const form = reactive<InviteForm>({
  email: '',
  role: 'MEMBER',
})

const rules: FormRules = {
  email: [{ required: true, message: t('login.email'), trigger: 'blur' }],
  role: [{ required: true, message: t('members.role'), trigger: 'blur' }],
}

const { inviteMember, loading } = useInviteMember()

function maskEmail(email: string) {
  const [user, domain] = email.split('@')
  if (!domain) return email
  return `${user[0]}***@${domain}`
}

async function onSubmit() {
  await formRef.value?.validate()
  try {
    await inviteMember(form.email, form.role)
    message.success(`Invitation sent to ${maskEmail(form.email)}`)
    emit('update:show', false)
  } catch {
    // error handled in composable
  }
}
</script>

<template>
  <n-modal :show="props.show" @update:show="emit('update:show', $event)">
    <n-card
      style="width: 360px"
      closable
      :title="t('members.inviteMember')"
      @close="emit('update:show', false)"
    >
      <n-form ref="formRef" :model="form" :rules="rules" class="space-y-2">
        <n-form-item path="email" :label="t('members.email')">
          <n-input v-model:value="form.email" type="text" />
        </n-form-item>
        <n-form-item path="role" :label="t('members.role')">
          <n-select
            v-model:value="form.role"
            :options="[
              { label: 'MEMBER', value: 'MEMBER' },
              { label: 'STAFF', value: 'STAFF' },
            ]"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <n-button @click="emit('update:show', false)">
            {{ t('common.cancel') }}
          </n-button>
          <n-button type="primary" :loading="loading" @click="onSubmit">
            {{ t('members.inviteMember') }}
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
</style>
