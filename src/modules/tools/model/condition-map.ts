import type { ToolRequest } from '@/infrastructure/api'
import type { Component } from 'vue'
import { CircleCheck, AlertTriangle, CircleX, Tools, Folder, Box } from '@vicons/tabler'

export type Condition = ToolRequest['conditionStatus']

export const conditionKeys: Record<Condition, string> = {
  NEW: 'condition.new',
  GOOD: 'condition.good',
  FAIR: 'condition.fair',
  POOR: 'condition.poor',
  DAMAGED: 'condition.damaged',
  NEEDS_REPAIR: 'condition.needsRepair',
}

export const conditionIcon: Record<Condition, Component> = {
  NEW: CircleCheck,
  GOOD: CircleCheck,
  FAIR: AlertTriangle,
  POOR: AlertTriangle,
  DAMAGED: CircleX,
  NEEDS_REPAIR: Tools,
}

export const conditionChipClasses: Record<Condition, string> = {
  NEW: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  GOOD: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  FAIR: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  POOR: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  DAMAGED: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  NEEDS_REPAIR: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
}

export const genericIcons = {
  category: Folder,
  quantity: Box,
}

export const makeConditionOptions = (t: (k: string) => string) =>
  (Object.keys(conditionKeys) as Condition[]).map((value) => ({
    label: t(conditionKeys[value]),
    value,
  }))
