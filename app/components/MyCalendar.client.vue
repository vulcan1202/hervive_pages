<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
  minDate?: Date | null
  disabledDates?: Date[]
  disabledWeekDays?: number[]
  placeholder?: string
}>()

const selectedDate = defineModel<Date | null>()

// 🌟 新版過濾邏輯：乾淨地拆分「星期」與「日期」判斷
const isDateDisabled = (date: Date) => {
  // 1. 檢查每週固定公休 (0=週日, 1=週一...)
  if (props.disabledWeekDays?.length) {
    if (props.disabledWeekDays.includes(date.getDay())) {
      return true
    }
  }

  // 2. 檢查特定單日公休
  if (props.disabledDates?.length) {
    return props.disabledDates.some(d => 
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    )
  }

  return false
}
</script>

<template>
  <VueDatePicker
    v-model="selectedDate"
    v-bind="$attrs"
    :min-date="minDate"
    :disabled-dates="isDateDisabled"
    :enable-time-picker="false"
    :auto-apply="true"
    :teleport="true"
    format="yyyy-MM-dd"
  >
    <template #dp-input="{ value, onClick }">
      <input
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#154337] cursor-pointer bg-white relative z-10"
        :value="value"
        @click="onClick"
        :placeholder="placeholder || '請點擊選擇日期'"
        readonly
      />
    </template>
  </VueDatePicker>
</template>

<style>
.dp__theme_light {
  --dp-primary-color: #154337;
  --dp-primary-text-color: #ffffff;
}
.dp__menu {
  z-index: 9999 !important;
}
</style>