<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const selectedDate = defineModel<Date | null>()
</script>

<template>
  <DatePicker 
    v-model="selectedDate" 
    v-bind="$attrs" 
    color="green"
    :popover="{ 
      visibility: 'click', 
      placement: 'bottom-start' 
    }"
  >
    <template #default="{ inputValue, inputEvents }">
      <input
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#154337] cursor-pointer bg-white relative z-10"
        :value="inputValue"
        v-on="inputEvents"
        placeholder="請點擊選擇日期"
        readonly
      />
    </template>
  </DatePicker>
</template>

<style>
/* 🌟 終極解法：強制提升 V-Calendar 彈出視窗的層級，確保它不會被任何 Layout 擋住！ */
.vc-popover-content-wrapper {
  z-index: 9999 !important;
}
</style>