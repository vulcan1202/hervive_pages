<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// 🌟 1. 直接引入繁體中文語系物件
import { zhTW } from 'date-fns/locale'

const props = defineProps<{
  minDate?: Date | null
  disabledDates?: Date[]
  disabledWeekDays?: number[]
  placeholder?: string
}>()

const selectedDate = defineModel<Date | null>()

const isDateDisabled = (date: Date) => {
  if (props.disabledWeekDays?.length) {
    if (props.disabledWeekDays.includes(date.getDay())) {
      return true
    }
  }

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
    :locale="zhTW"
    :min-date="minDate"
    :disabled-dates="isDateDisabled"
    :enable-time-picker="false"
    :auto-apply="true"
    :teleport="false"
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