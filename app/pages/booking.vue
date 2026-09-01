<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref<any>(null)
const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

const form = reactive({
  serviceName: '精緻美學管理 (2.5小時)',
  date: '',      
  startTime: ''
})

const selectedDateObj = ref<Date | null>(null)
const existingAppointments = ref<any[]>([])
const status = ref('idle')
const errorMessage = ref('')
const showSuccessModal = ref(false)
const appointmentCode = ref('')
const isRefreshingSlots = ref(false)

const holidays = ref<any[]>([])
const cachedDayAppointments = ref<Record<string, any[]>>({})

const { $liff } = useNuxtApp()
const isLiffMode = ref(false)

const bookingAdvanceDays = ref(60)
const bookingEnabled = ref(true)

const fetchSystemSettings = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/settings`)
    if (res.ok) {
      const data = await res.json()
      if (data.data) {
        bookingAdvanceDays.value = Number(data.data.booking_advance_days || 60)
        bookingEnabled.value = data.data.booking_enabled !== false
      }
    }
  } catch (e) {
    console.error('取得系統設定失敗', e)
  }
}

// 🌟 週檢視起始日 (週一 00:00:00)
const currentWeekStart = ref<Date>(new Date())

const syncWeekStart = (d: Date) => {
  const target = new Date(d)
  target.setHours(0, 0, 0, 0)
  const day = target.getDay()
  const diff = target.getDate() - day + (day === 0 ? -6 : 1) // 星期一
  const monday = new Date(target)
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  currentWeekStart.value = monday
}

onMounted(async () => {
  const storedUser = localStorage.getItem('hervive_user')
  if (!storedUser) {
    alert('請先登入會員才能進行預約！')
    return router.push('/login?redirect=/booking')
  }
  currentUser.value = JSON.parse(storedUser)
  
  if ($liff && $liff.isInClient()) {
    isLiffMode.value = true
  }

  // 使用 Promise.all 平行獲取休假設定、系統設定與預約資料，縮短總等待時間
  await Promise.all([
    fetchHolidays(),
    fetchAllUpcomingAppointments(),
    fetchSystemSettings()
  ])

  // 預設選取明日並定位當週
  const initialDate = new Date(minDateObj.value)
  syncWeekStart(initialDate)
  selectedDateObj.value = initialDate
})

const minDateObj = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
})

const maxDateObj = computed(() => {
  const maxD = new Date()
  maxD.setDate(maxD.getDate() + (bookingAdvanceDays.value || 60))
  maxD.setHours(23, 59, 59, 999)
  return maxD
})

const disabledWeekDays = computed(() => {
  const days = new Set<number>()
  for (const h of holidays.value) {
    if (h.type === 'weekly') {
      const dow = Number(h.day_of_week)
      if (Number.isInteger(dow) && dow >= 0 && dow <= 6) {
        days.add(dow) 
      }
    }
  }
  return Array.from(days)
})

const fetchHolidays = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/holidays`)
    if (res.ok) {
      const result = await res.json()
      holidays.value = result.data
    }
  } catch (e) {
    console.error('取得休假設定失敗', e)
  }
}

const fetchAllUpcomingAppointments = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/appointments`)
    if (res.ok) {
      const result = await res.json()
      const allAppts = result.data
      const map: Record<string, any[]> = {}
      for (const appt of allAppts) {
        if (!map[appt.date]) map[appt.date] = []
        map[appt.date].push(appt)
      }
      cachedDayAppointments.value = map
    }
  } catch (e) {
    console.error('預載所有預約失敗', e)
  }
}

watch(selectedDateObj, (newDateObj) => {
  form.startTime = '' 
  existingAppointments.value = [] 
  
  if (newDateObj) {
    const yyyy = newDateObj.getFullYear()
    const mm = String(newDateObj.getMonth() + 1).padStart(2, '0')
    const dd = String(newDateObj.getDate()).padStart(2, '0')
    form.date = `${yyyy}-${mm}-${dd}` 
    
    syncWeekStart(newDateObj)

    if (cachedDayAppointments.value[form.date]) {
      existingAppointments.value = cachedDayAppointments.value[form.date]
    } else {
      fetchDayAppointments(form.date)
    }
  } else {
    form.date = ''
  }
})

const fetchDayAppointments = async (selectedDate: string) => {
  isRefreshingSlots.value = true
  try {
    const res = await fetch(`${backendUrl}/api/appointments?date=${selectedDate}`)
    if (res.ok) {
      const result = await res.json()
      existingAppointments.value = result.data
      cachedDayAppointments.value[selectedDate] = result.data
    }
  } catch (e) {
    console.error('取得當日預約失敗', e)
  } finally {
    isRefreshingSlots.value = false
  }
}

const handleRefreshSlots = async () => {
  isRefreshingSlots.value = true
  try {
    await Promise.all([
      fetchHolidays(),
      fetchAllUpcomingAppointments()
    ])

    if (form.date) {
      const res = await fetch(`${backendUrl}/api/appointments?date=${form.date}`)
      if (res.ok) {
        const result = await res.json()
        existingAppointments.value = result.data
        cachedDayAppointments.value[form.date] = result.data
      }
    }
  } catch (e) {
    console.error('重新載入最新狀態失敗', e)
  } finally {
    isRefreshingSlots.value = false
  }
}

// 🌟 固定時段定義：平日 4 個時段，六日假日 5 個時段
const getSlotsForDate = (dateStr: string): string[] => {
  if (!dateStr) return ['10:00', '13:00', '16:00', '19:30']
  const d = new Date(dateStr.replace(/-/g, '/'))
  const dow = d.getDay() // 0: 日, 6: 六
  const isWeekend = (dow === 0 || dow === 6)
  
  if (isWeekend) {
    return ['10:00', '13:00', '15:30', '18:00', '19:00']
  }
  return ['10:00', '13:00', '16:00', '19:30']
}

const isWeekendSelected = computed(() => {
  if (!form.date) return false
  const d = new Date(form.date.replace(/-/g, '/'))
  const dow = d.getDay()
  return dow === 0 || dow === 6
})

const timeSlots = computed(() => {
  if (!form.date) {
    return ['10:00', '13:00', '16:00', '19:30']
  }
  return getSlotsForDate(form.date)
})

const getSlotEndTime = (startTime: string): string => {
  if (!startTime) return ''
  const [h, m] = startTime.split(':').map(Number)
  if (isNaN(h) || isNaN(m)) return ''
  const totalMin = h * 60 + m + 150 // 2.5小時 = 150分鐘
  const endH = Math.floor(totalMin / 60)
  const endM = totalMin % 60
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
}

// 🌟 2.5 小時保護機制 (衝突防護)
const checkSlotDisabledForDate = (dateStr: string, slotTime: string, apptsList: any[]) => {
  if (!dateStr || !slotTime) return false

  const [h, m] = slotTime.split(':').map(Number)
  const slotStartMin = h * 60 + m
  const slotEndMin = slotStartMin + 150 // 2.5 小時 (150 分鐘)
  
  const reqDateObj = new Date(dateStr.replace(/-/g, '/'))
  const dayOfWeek = reqDateObj.getDay()

  for (const h of holidays.value) {
    if (h.type === 'weekly' && Number(h.day_of_week) === dayOfWeek) return true
    if (h.type === 'full_day' && h.date === dateStr) return true
    
    if (h.type === 'time_range' && h.date === dateStr && h.start_time && h.end_time) {
      const [hhStart, hmStart] = h.start_time.split(':').map(Number)
      const holidayStartMin = hhStart * 60 + hmStart
      const [hhEnd, hmEnd] = h.end_time.split(':').map(Number)
      const holidayEndMin = hhEnd * 60 + hmEnd
      
      if (slotStartMin < holidayEndMin && slotEndMin > holidayStartMin) {
        return true
      }
    }
  }

  if (Array.isArray(apptsList)) {
    for (const appt of apptsList) {
      if (appt.status === 'cancelled') continue

      if (!appt.start_time) continue
      const [ah, am] = appt.start_time.split(':').map(Number)
      if (isNaN(ah) || isNaN(am)) continue

      const apptStartMin = ah * 60 + am
      let apptEndMin = apptStartMin + 150

      if (appt.end_time) {
        const [ae, em] = appt.end_time.split(':').map(Number)
        if (!isNaN(ae) && !isNaN(em)) {
          apptEndMin = ae * 60 + em
        }
      }

      // 重疊保護公式
      if (slotStartMin < apptEndMin && slotEndMin > apptStartMin) {
        return true 
      }
    }
  }
  
  return false
}

const isSlotDisabled = (slotTime: string) => {
  if (!form.date) return true
  return checkSlotDisabledForDate(form.date, slotTime, existingAppointments.value)
}

const disabledDates = computed(() => {
  const dates: Date[] = []

  for (const h of holidays.value) {
    if (h.type === 'full_day' && h.date) {
      dates.push(new Date(h.date.replace(/-/g, '/')))
    }
  }

  const today = new Date()
  for (let i = 1; i <= (bookingAdvanceDays.value || 60); i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    d.setHours(0, 0, 0, 0)
    
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const dateStr = `${yyyy}-${mm}-${dd}`

    const dow = d.getDay()
    const isFullOff = holidays.value.some(h => 
      (h.type === 'weekly' && Number(h.day_of_week) === dow) || 
      (h.type === 'full_day' && h.date === dateStr)
    )

    if (!isFullOff) {
      const dayAppts = cachedDayAppointments.value[dateStr] || []
      const slots = getSlotsForDate(dateStr)
      let allSlotsTaken = true
      for (const time of slots) {
        if (!checkSlotDisabledForDate(dateStr, time, dayAppts)) {
          allSlotsTaken = false
          break
        }
      }
      if (allSlotsTaken) {
        dates.push(new Date(yyyy, Number(mm) - 1, Number(dd)))
      }
    }
  }

  return dates
})

// 🌟 週曆與月份導覽計算
const canPrevWeek = computed(() => {
  const lastDayOfPrevWeek = new Date(currentWeekStart.value)
  lastDayOfPrevWeek.setDate(lastDayOfPrevWeek.getDate() - 1)
  lastDayOfPrevWeek.setHours(23, 59, 59, 999)
  const minD = new Date(minDateObj.value)
  minD.setHours(0, 0, 0, 0)
  return lastDayOfPrevWeek >= minD
})

const canNextWeek = computed(() => {
  const firstDayOfNextWeek = new Date(currentWeekStart.value)
  firstDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() + 7)
  firstDayOfNextWeek.setHours(0, 0, 0, 0)
  return firstDayOfNextWeek <= maxDateObj.value
})

const prevWeek = () => {
  if (!canPrevWeek.value) return
  const prev = new Date(currentWeekStart.value)
  prev.setDate(prev.getDate() - 7)
  currentWeekStart.value = prev
}

const nextWeek = () => {
  if (!canNextWeek.value) return
  const next = new Date(currentWeekStart.value)
  next.setDate(next.getDate() + 7)
  currentWeekStart.value = next
}

const weekDays = computed(() => {
  const days = []
  const start = new Date(currentWeekStart.value)
  start.setHours(0, 0, 0, 0)
  
  const weekDayNames = ['週一', '週二', '週三', '週四', '週五', '週六', '週日']
  const weekDayShort = ['一', '二', '三', '四', '五', '六', '日']
  
  const minD = new Date(minDateObj.value)
  minD.setHours(0, 0, 0, 0)
  const maxD = new Date(maxDateObj.value)
  maxD.setHours(23, 59, 59, 999)

  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    d.setHours(0, 0, 0, 0)
    
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const dateStr = `${yyyy}-${mm}-${dd}`
    
    const dayOfWeek = d.getDay() // 0 = 日, 1 = 一
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6)
    
    const isPast = d < minD
    const isTooFar = d > maxD
    
    const isFullOff = holidays.value.some(h => 
      (h.type === 'weekly' && Number(h.day_of_week) === dayOfWeek) || 
      (h.type === 'full_day' && h.date === dateStr)
    )
    
    const dayAppts = cachedDayAppointments.value[dateStr] || []
    const slots = getSlotsForDate(dateStr)
    let isFullyBooked = false
    if (!isPast && !isTooFar && !isFullOff && slots.length > 0) {
      isFullyBooked = slots.every(slot => checkSlotDisabledForDate(dateStr, slot, dayAppts))
    }
    
    const isDisabled = isPast || isTooFar || isFullOff || isFullyBooked
    
    days.push({
      dateObj: d,
      dateStr,
      dayNumber: d.getDate(),
      monthNumber: d.getMonth() + 1,
      dayName: weekDayNames[i],
      shortName: weekDayShort[i],
      isWeekend,
      isPast,
      isTooFar,
      isFullOff,
      isFullyBooked,
      isDisabled,
      isSelected: form.date === dateStr
    })
  }
  return days
})

const selectDay = (day: { dateObj: Date; isDisabled: boolean }) => {
  if (day.isDisabled) return
  selectedDateObj.value = new Date(day.dateObj)
}

// 🌟 月份導覽與切換
const availableMonths = computed(() => {
  const months = []
  const start = new Date(minDateObj.value)
  const end = new Date(maxDateObj.value)
  
  const cur = new Date(start.getFullYear(), start.getMonth(), 1)
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1)
  
  while (cur <= endMonth) {
    const y = cur.getFullYear()
    const m = cur.getMonth()
    months.push({
      year: y,
      month: m,
      key: `${y}-${m}`,
      label: `${m + 1}月`,
      fullLabel: `${y} 年 ${m + 1} 月`
    })
    cur.setMonth(cur.getMonth() + 1)
  }
  return months
})

const currentMonthYearDisplay = computed(() => {
  if (!weekDays.value.length) return ''
  const first = weekDays.value[0].dateObj
  const last = weekDays.value[6].dateObj
  const firstY = first.getFullYear()
  const firstM = first.getMonth() + 1
  const lastY = last.getFullYear()
  const lastM = last.getMonth() + 1

  if (firstY === lastY && firstM === lastM) {
    return `${firstY} 年 ${firstM} 月`
  }
  if (firstY === lastY) {
    return `${firstY} 年 ${firstM} 月 / ${lastM} 月`
  }
  return `${firstY} 年 ${firstM} 月 - ${lastY} 年 ${lastM} 月`
})

const isMonthInView = (year: number, month: number) => {
  if (!weekDays.value.length) return false
  return weekDays.value.some(day => 
    day.dateObj.getFullYear() === year && day.dateObj.getMonth() === month
  )
}

const canPrevMonth = computed(() => {
  if (!weekDays.value.length) return false
  const firstDay = weekDays.value[0].dateObj
  const minY = minDateObj.value.getFullYear()
  const minM = minDateObj.value.getMonth()
  return !(firstDay.getFullYear() === minY && firstDay.getMonth() <= minM)
})

const canNextMonth = computed(() => {
  if (!weekDays.value.length) return false
  const lastDay = weekDays.value[6].dateObj
  const maxY = maxDateObj.value.getFullYear()
  const maxM = maxDateObj.value.getMonth()
  return !(lastDay.getFullYear() === maxY && lastDay.getMonth() >= maxM)
})

const prevMonth = () => {
  if (!canPrevMonth.value) return
  const cur = new Date(currentWeekStart.value)
  const target = new Date(cur.getFullYear(), cur.getMonth() - 1, 1)
  const finalTarget = target < minDateObj.value ? minDateObj.value : target
  selectedDateObj.value = finalTarget
  syncWeekStart(finalTarget)
}

const nextMonth = () => {
  if (!canNextMonth.value) return
  const cur = new Date(currentWeekStart.value)
  const target = new Date(cur.getFullYear(), cur.getMonth() + 1, 1)
  const finalTarget = target > maxDateObj.value ? maxDateObj.value : target
  selectedDateObj.value = finalTarget
  syncWeekStart(finalTarget)
}

const jumpToMonth = (year: number, month: number) => {
  let target = new Date(year, month, 1)
  if (target < minDateObj.value) target = new Date(minDateObj.value)
  if (target > maxDateObj.value) target = new Date(maxDateObj.value)
  selectedDateObj.value = target
  syncWeekStart(target)
}

const isFullDayOff = computed(() => {
  if (!form.date) return false
  const reqDateObj = new Date(form.date.replace(/-/g, '/'))
  const dayOfWeek = reqDateObj.getDay()
  
  return holidays.value.some(h => 
    (h.type === 'weekly' && Number(h.day_of_week) === dayOfWeek) || 
    (h.type === 'full_day' && h.date === form.date)
  )
})

const handleBooking = async () => {
  status.value = 'loading'
  errorMessage.value = ''
  try {
    const res = await fetch(`${backendUrl}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUser.value.id,
        date: form.date,
        start_time: form.startTime,
        beautician_id: null
      })
    })
    const result = await res.json()
    if (!res.ok) throw new Error(result.error || '預約失敗')
    
    // ✅ 從 result.data 取得 appointment 資訊
    appointmentCode.value = result.data.appointment.appointment_code
    showSuccessModal.value = true
    status.value = 'idle'
    
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err.message
  }
}

const handleSendLineMessage = async () => {
  if ($liff && $liff.isInClient()) {
    try {
      await $liff.sendMessages([
        {
          type: 'text',
          text: appointmentCode.value
        }
      ])
      $liff.closeWindow() 
    } catch (err) {
      console.error('傳送訊息失敗', err)
      alert('自動傳送失敗，請手動複製編號')
    }
  } else {
    try {
      await navigator.clipboard.writeText(appointmentCode.value)
      alert('✅ 預約編號已複製！請前往 LINE 貼上發送。')
      window.open('https://lin.ee/HmMJftl', '_blank')
    } catch (err) {
      alert('複製失敗，請手動複製')
    }
  }
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(appointmentCode.value)
    alert('✅ 預約編號已複製！')
  } catch (err) {
    alert('複製失敗，請手動複製')
  }
}

const finishAndRedirect = () => {
  showSuccessModal.value = false
  router.push('/member')
}
</script>

<template>
  <div :class="['max-w-2xl mx-auto px-3 sm:px-4 pt-2 sm:py-8', isLiffMode ? 'pb-44 sm:pb-12' : 'pb-8 sm:pb-12']">
    
    <div class="double-bezel-outer">
      <div class="double-bezel-inner bg-white p-5 sm:p-8 space-y-6">
        
        <!-- 表單標題列 -->
        <div class="border-b border-gray-100 pb-4 flex items-center justify-between">
          <div class="space-y-1">
            <div class="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FAF4EE] text-[#154337] border border-[#C5A880]/30 text-[10px] uppercase font-semibold tracking-widest">
              ONLINE RESERVATION
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-[#154337] font-serif-luxury flex items-center gap-2">
              <Icon name="mdi:calendar-clock" class="text-[#C5A880]" size="24" />
              線上預約護膚
            </h2>
            <p class="text-gray-400 text-xs font-light">療程預計服務時間固定為 2.5 小時</p>
          </div>
          <span v-if="isLiffMode" class="text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-bold border border-emerald-200 shrink-0 tracking-wider">
            LINE 快速預約
          </span>
        </div>

        <div v-if="!bookingEnabled" class="bg-amber-50 text-amber-900 p-4 rounded-2xl text-xs sm:text-sm text-center font-bold border border-amber-300 flex items-center justify-center gap-2">
          <Icon name="mdi:alert-circle-outline" class="text-xl text-amber-600 shrink-0" />
          <span>門市目前暫時關閉線上預約功能。如有即時預約需求，請直接致電或 LINE 聯繫門市專員！</span>
        </div>

        <div v-if="errorMessage" class="bg-red-50 text-red-600 p-3.5 rounded-2xl text-xs sm:text-sm text-center font-bold animate-shake border border-red-200">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleBooking" class="space-y-6">
          
          <!-- 步驟 1：選擇日期 (一週七天排成一列、上下週切換、快速切換月份、角落日曆選日) -->
          <div class="space-y-3 relative z-30">
            <div class="flex items-center justify-between">
              <label class="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#154337] text-white text-xs flex items-center justify-center font-mono font-bold">1</span>
                選擇預約日期 <span class="text-red-500">*</span>
              </label>

              <!-- 🌟 角落：可點開日曆直接選擇日期 -->
              <MyCalendar 
                v-model="selectedDateObj"
                :min-date="minDateObj"
                :max-date="maxDateObj"
                :disabled-dates="disabledDates" 
                :disabled-week-days="disabledWeekDays"
              >
                <template #trigger="{ onClick }">
                  <button
                    type="button"
                    @click="onClick"
                    class="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold text-[#154337] bg-[#FAF4EE] hover:bg-[#154337] hover:text-white border border-[#C5A880]/40 transition shadow-2xs active:scale-95 cursor-pointer"
                    title="點擊開啟完整日曆挑選日期"
                  >
                    <Icon name="mdi:calendar-month-outline" size="15" class="text-[#C5A880]" />
                    <span>日曆選日</span>
                  </button>
                </template>
              </MyCalendar>
            </div>

            <!-- 🌟 上方：快速切換月份與標題 -->
            <div class="flex items-center justify-between bg-[#FAF4EE]/80 border border-[#C5A880]/30 px-3 py-2 rounded-2xl">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  @click="prevMonth"
                  :disabled="!canPrevMonth"
                  class="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#154337] hover:bg-[#154337] hover:text-white transition disabled:opacity-25 disabled:cursor-not-allowed border border-gray-200 shadow-2xs active:scale-95 cursor-pointer"
                  title="上個月"
                >
                  <Icon name="mdi:chevron-left" size="18" />
                </button>

                <span class="font-bold text-[#154337] font-serif-luxury text-xs sm:text-sm tracking-wide px-1">
                  {{ currentMonthYearDisplay }}
                </span>

                <button
                  type="button"
                  @click="nextMonth"
                  :disabled="!canNextMonth"
                  class="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#154337] hover:bg-[#154337] hover:text-white transition disabled:opacity-25 disabled:cursor-not-allowed border border-gray-200 shadow-2xs active:scale-95 cursor-pointer"
                  title="下個月"
                >
                  <Icon name="mdi:chevron-right" size="18" />
                </button>
              </div>

              <!-- 快速跳轉月份標籤 (按鈕) -->
              <div class="flex items-center gap-1 overflow-x-auto">
                <button
                  v-for="m in availableMonths"
                  :key="m.key"
                  type="button"
                  @click="jumpToMonth(m.year, m.month)"
                  :class="[
                    'text-xs px-2.5 py-0.5 rounded-full font-bold transition border shrink-0 cursor-pointer active:scale-95',
                    isMonthInView(m.year, m.month)
                      ? 'bg-[#154337] text-white border-[#C5A880] shadow-2xs'
                      : 'bg-white text-gray-600 hover:bg-[#FAF4EE] border-gray-200'
                  ]"
                >
                  {{ m.label }}
                </button>
              </div>
            </div>

            <!-- 🌟 一週七天按鈕排成一列 (最左/最右有切換上下週按鍵) -->
            <div class="flex items-center gap-1 sm:gap-2">
              <!-- 上一週按鍵 -->
              <button
                type="button"
                @click="prevWeek"
                :disabled="!canPrevWeek"
                class="w-8 h-13 sm:w-9 sm:h-14 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-[#154337] hover:bg-[#FAF4EE] hover:border-[#154337] transition disabled:opacity-20 disabled:cursor-not-allowed shadow-2xs shrink-0 active:scale-95 cursor-pointer"
                title="切換至上一週"
              >
                <Icon name="mdi:chevron-left" size="20" />
              </button>

              <!-- 七天按鈕 -->
              <div class="grid grid-cols-7 gap-1 sm:gap-1.5 flex-1">
                <button
                  v-for="day in weekDays"
                  :key="day.dateStr"
                  type="button"
                  :disabled="day.isDisabled"
                  @click="selectDay(day)"
                  :class="[
                    'flex flex-col items-center justify-center py-2 px-0.5 sm:px-1 rounded-xl transition-all border relative',
                    day.isSelected
                      ? 'bg-[#154337] text-white border-[#C5A880] shadow-md scale-[1.03] z-10 ring-2 ring-[#C5A880]/30'
                      : day.isDisabled
                        ? 'bg-gray-50/80 text-gray-300 border-gray-100 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#154337] hover:bg-[#FAF4EE]/50 cursor-pointer shadow-2xs active:scale-95'
                  ]"
                >
                  <!-- 星期 (一~日) -->
                  <span 
                    :class="[
                      'text-[10px] sm:text-xs font-medium mb-0.5',
                      day.isSelected
                        ? 'text-[#C5A880] font-bold'
                        : day.isDisabled
                          ? 'text-gray-300'
                          : day.isWeekend
                            ? 'text-amber-700 font-bold'
                            : 'text-gray-500'
                    ]"
                  >
                    {{ day.shortName }}
                  </span>

                  <!-- 日期數字 (e.g. 2, 15) -->
                  <span 
                    :class="[
                      'text-xs sm:text-base font-bold font-mono',
                      day.isSelected ? 'text-white' : day.isDisabled ? 'text-gray-300' : 'text-gray-800'
                    ]"
                  >
                    {{ day.dayNumber }}
                  </span>

                  <!-- 狀態標籤 (休 / 滿 / 圓點) -->
                  <span 
                    v-if="day.isFullOff" 
                    class="text-[9px] text-red-400 font-bold scale-90 mt-0.5"
                  >
                    休
                  </span>
                  <span 
                    v-else-if="day.isFullyBooked" 
                    class="text-[9px] text-gray-400 font-bold scale-90 mt-0.5"
                  >
                    滿
                  </span>
                  <span 
                    v-else-if="day.isSelected" 
                    class="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1"
                  ></span>
                  <span 
                    v-else-if="!day.isDisabled" 
                    class="w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-1"
                  ></span>
                  <span 
                    v-else 
                    class="w-1.5 h-1.5 mt-1"
                  ></span>
                </button>
              </div>

              <!-- 下一週按鍵 -->
              <button
                type="button"
                @click="nextWeek"
                :disabled="!canNextWeek"
                class="w-8 h-13 sm:w-9 sm:h-14 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-[#154337] hover:bg-[#FAF4EE] hover:border-[#154337] transition disabled:opacity-20 disabled:cursor-not-allowed shadow-2xs shrink-0 active:scale-95 cursor-pointer"
                title="切換至下一週"
              >
                <Icon name="mdi:chevron-right" size="20" />
              </button>
            </div>
            
            <div class="flex items-start gap-1.5 text-[11px] text-gray-500 mt-1 bg-[#FAF4EE]/70 p-2.5 rounded-2xl border border-[#C5A880]/20 font-light">
              <Icon name="mdi:information-outline" size="15" class="shrink-0 text-[#C5A880] mt-0.5" />
              <span>目前已選日期：<span class="font-bold text-[#154337] font-mono">{{ form.date || '請點選上方日期' }}</span>，開放預約未來 {{ bookingAdvanceDays }} 天內。若當日公休或已約滿則無法選擇。</span>
            </div>
          </div>

          <!-- 步驟 2：選擇時段 (平日 4 個固定時段、六日假日 5 個固定時段，2.5小時保護) -->
          <div class="space-y-3 pt-4 border-t border-gray-100">
            <div class="flex items-center justify-between mb-1">
              <label class="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#154337] text-white text-xs flex items-center justify-center font-mono font-bold">2</span>
                選擇時段 <span class="text-red-500">*</span>
              </label>

              <button 
                type="button" 
                @click="handleRefreshSlots" 
                :disabled="isRefreshingSlots"
                class="text-xs text-[#154337] bg-[#FAF4EE] hover:bg-[#154337] hover:text-white px-3 py-1 rounded-full transition-all flex items-center gap-1.5 font-bold disabled:opacity-50 active:scale-95 border border-[#C5A880]/30 shadow-xs cursor-pointer"
              >
                <Icon name="mdi:refresh" size="14" :class="{ 'animate-spin': isRefreshingSlots }" class="text-[#C5A880]" />
                <span>重新整理</span>
              </button>
            </div>
            
            <div v-if="!form.date" class="text-gray-400 text-xs sm:text-sm py-10 text-center bg-[#FAF4EE]/50 rounded-2xl border border-dashed border-[#C5A880]/30 font-light">
              請先點選上方日期以載入可預約時段
            </div>
            
            <div v-else-if="isFullDayOff" class="text-red-600 text-xs sm:text-sm font-bold bg-red-50/80 p-4 rounded-2xl border border-red-200 text-center">
              🚫 店家本日公休，請選擇其他日期！
            </div>

            <div v-else class="space-y-2.5">
              <div class="flex items-center justify-between text-xs text-gray-500 font-light px-1">
                <span class="font-bold text-[#154337] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-[#154337]"></span>
                  {{ isWeekendSelected ? '六日假日固定時段 (共 5 個時段)' : '平日固定時段 (共 4 個時段)' }}
                </span>
                <span class="text-[11px] text-gray-400">療程預計時間 2.5 小時 (具備時段保護機制)</span>
              </div>

              <!-- 固定時段卡片清單 -->
              <div 
                :class="[
                  'grid gap-2 sm:gap-2.5 p-2.5 border border-[#C5A880]/30 rounded-2xl bg-[#FAF4EE]/40',
                  timeSlots.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-5'
                ]"
              >
                <button 
                  v-for="(time, idx) in timeSlots" 
                  :key="time"
                  type="button"
                  :disabled="isSlotDisabled(time)"
                  @click="form.startTime = time"
                  :class="[
                    'py-3 px-2 rounded-xl text-center transition-all border flex flex-col items-center justify-center gap-0.5 relative font-mono active:scale-95 cursor-pointer',
                    timeSlots.length === 5 && idx === 4 ? 'col-span-2 sm:col-span-1' : '',
                    isSlotDisabled(time)
                      ? 'bg-gray-100/80 text-gray-300 border-gray-200 cursor-not-allowed'
                      : form.startTime === time
                        ? 'bg-[#154337] text-white border-[#C5A880] shadow-md scale-[1.02] ring-2 ring-[#C5A880]/50'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#154337] hover:bg-[#FAF4EE]/60 shadow-2xs'
                  ]"
                >
                  <span 
                    :class="[
                      'text-base sm:text-lg font-bold tracking-tight',
                      isSlotDisabled(time) ? 'line-through text-gray-300' : ''
                    ]"
                  >
                    {{ time }}
                  </span>

                  <span 
                    :class="[
                      'text-[10px] tracking-tighter font-sans',
                      form.startTime === time ? 'text-[#FAF4EE]/80' : 'text-gray-400'
                    ]"
                  >
                    至 {{ getSlotEndTime(time) }}
                  </span>

                  <span 
                    v-if="isSlotDisabled(time)"
                    class="text-[10px] text-red-400 font-bold bg-red-50/80 px-2 py-0.2 rounded-full mt-0.5 border border-red-100"
                  >
                    已約滿
                  </span>
                  <span 
                    v-else-if="form.startTime === time"
                    class="text-[10px] text-white font-bold bg-[#C5A880] px-2 py-0.2 rounded-full mt-0.5"
                  >
                    ✓ 已選取
                  </span>
                  <span 
                    v-else
                    class="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.2 rounded-full mt-0.5 border border-emerald-200/50"
                  >
                    可預約
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- 預覽與提交 -->
          <div :class="[!isLiffMode ? 'block' : 'hidden sm:block', 'border-t border-gray-100 pt-5 mt-4']">
            <div class="bg-[#FAF4EE]/70 border border-[#C5A880]/30 rounded-2xl p-4 sm:p-5 space-y-2.5 mb-6 shadow-xs">
              <h3 class="text-xs font-bold text-[#154337] uppercase tracking-wider flex items-center gap-1.5 font-serif-luxury">
                <Icon name="mdi:clipboard-text-outline" size="16" class="text-[#C5A880]" />
                預約內容預覽
              </h3>
              <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="text-gray-500 font-light">服務項目：</span>
                <span class="font-bold text-gray-800 font-serif-luxury">{{ form.serviceName }}</span>
              </div>
              <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="text-gray-500 font-light">選擇時間：</span>
                <span class="font-bold text-[#154337] font-mono">
                  {{ form.date && form.startTime ? `${form.date} ${form.startTime}` : '尚未選擇完整時間' }}
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              :disabled="!form.startTime || status === 'loading' || isFullDayOff"
              class="w-full bg-[#154337] text-[#FAF4EE] font-bold py-3.5 rounded-full hover:bg-[#0D2C24] active:scale-95 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shadow-md border border-[#C5A880]/30 text-sm tracking-wider"
            >
              {{ status === 'loading' ? '處理預約中...' : '確認送出預約' }}
            </button>
          </div>

        </form>
      </div>
    </div>

    <!-- LIFF Mode 底部橫條 (精密對齊 default layout LIFF 導覽列正上方) -->
    <div 
      v-if="isLiffMode"
      class="sm:hidden fixed bottom-[calc(60px+env(safe-area-inset-bottom))] left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#C5A880]/30 px-4 py-3 z-[60] shadow-[0_-6px_20px_rgba(21,67,55,0.08)]"
    >
      <div class="max-w-md mx-auto flex items-center justify-between gap-3">
        <div class="text-xs space-y-0.5">
          <p class="text-gray-400 text-[10px] font-light">已選預約時段：</p>
          <p class="font-bold text-[#154337] text-xs sm:text-sm font-mono tracking-wide">
            {{ form.date && form.startTime ? `${form.date} ${form.startTime}` : '請點選時間' }}
          </p>
        </div>
        <button 
          @click="handleBooking"
          :disabled="!form.startTime || status === 'loading' || isFullDayOff"
          class="bg-[#154337] text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-md hover:bg-[#0D2C24] active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none border border-[#C5A880]/30 tracking-wider shrink-0"
        >
          {{ status === 'loading' ? '處理中...' : '確認預約' }}
        </button>
      </div>
    </div>

    <!-- 成功提示彈窗 Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-[100]">
      <div class="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 animate-slide-up relative border border-[#C5A880]/40">
        
        <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-1 sm:hidden"></div>

        <div class="w-14 h-14 sm:w-16 sm:h-16 bg-[#FAF4EE] text-[#C5A880] rounded-full flex items-center justify-center mx-auto text-2xl sm:text-3xl border border-[#C5A880]/30 shadow-inner">
          ⏳
        </div>
        
        <div class="space-y-1">
          <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-gray-800">預約尚未完全成立！</h2>
          <p class="text-red-600 font-medium text-xs sm:text-sm leading-relaxed">
            請在 <span class="font-bold underline">30 分鐘內</span> 完成 LINE 驗證，<br>逾時系統將自動釋放出此時段。
          </p>
        </div>

        <div class="bg-[#FAF4EE]/80 border border-[#C5A880]/30 rounded-2xl p-4 sm:p-5 space-y-2">
          <p class="text-gray-500 text-[11px] font-light uppercase tracking-wider">您的專屬預約編號</p>
          <div class="text-2xl sm:text-3xl font-bold text-[#154337] tracking-wider font-mono">
            {{ appointmentCode }}
          </div>
          <button 
            v-if="!($liff && $liff.isInClient())"
            @click="copyCode"
            class="text-xs bg-white text-[#154337] border border-[#C5A880]/30 px-3.5 py-1.5 rounded-full font-bold hover:bg-[#FAF4EE] transition shadow-xs inline-flex items-center gap-1"
          >
            <Icon name="mdi:content-copy" size="14" class="text-[#C5A880]" />
            複製編號
          </button>
        </div>

        <div class="space-y-3 pt-2">
          <button 
            @click="handleSendLineMessage"
            class="block w-full bg-[#06C755] text-white font-bold py-3.5 rounded-full hover:bg-[#05b34c] active:scale-98 transition shadow-md text-xs sm:text-sm tracking-wider"
          >
            {{ $liff && $liff.isInClient() ? '傳送預約編號並返回 LINE' : '複製編號並前往 LINE 驗證' }}
          </button>
          
          <button 
            @click="finishAndRedirect"
            class="text-xs text-gray-500 hover:text-[#154337] underline transition py-1 block w-full font-light"
          >
            我已完成傳送，返回會員頁
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<style>
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style>