<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold">{{ t('members.title') }}</h1>
      <n-button v-if="isOrgAdmin" type="primary" @click="showInvite = true">
        + {{ t('members.inviteMember') }}
      </n-button>
    </div>
    <p v-if="!members.length" class="text-gray-600">
      {{ t('members.noMembers') }}
    </p>
    <InviteMemberModal v-model:show="showInvite" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton } from 'naive-ui'
import { useAuthStore } from '@/modules/auth/store'
import InviteMemberModal from '@/components/InviteMemberModal.vue'
import { InviteUserRequest } from '@/infrastructure/api'

const { t } = useI18n()
const auth = useAuthStore()

const showInvite = ref(false)
const members = ref<InviteUserRequest[]>([])

const isOrgAdmin = computed(() => auth.userRole === 'ORG_ADMIN')
</script>

<style scoped></style>
