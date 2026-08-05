<script setup lang="ts">
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { zhTW } from 'date-fns/locale'

const props = defineProps<{
  minDate?: Date | null
  disabledDates?: Date[]
  disabledWeekDays?: number[]
  placeholder?: string
}>()

const selectedDate = defineModel<Date | null>()

const isDateDisabled = (date: Date) => {
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return false

  const dayOfWeek = d.getDay()

  if (props.disabledWeekDays?.length) {
    const weekDaysNum = props.disabledWeekDays.map(Number)
    if (weekDaysNum.includes(dayOfWeek)) {
      return true
    }
  }

  if (props.disabledDates?.length) {
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    return props.disabledDates.some(disabledDate => {
      const dd = disabledDate instanceof Date ? disabledDate : new Date(disabledDate)
      return dd.getFullYear() === year && dd.getMonth() === month && dd.getDate() === day
    })
  }

  return false
}

const displayDate = computed(() => {
  if (!selectedDate.value) return ''
  const d = new Date(selectedDate.value)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
})
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
    :teleport="true"
  >
    <template #dp-input="{ onClick }">
      <input
        class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] focus:border-[#154337] cursor-pointer bg-[#FAF4EE]/40 focus:bg-white transition relative z-10"
        :value="displayDate"
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
  z-index: 99999 !important;
  border-radius: 1rem !important;
  border: 1px solid rgba(197, 168, 128, 0.4) !important;
  box-shadow: 0 10px 30px rgba(21, 67, 55, 0.12) !important;
}
.dp__outer_menu_wrap {
  z-index: 99999 !important;
}
</style>