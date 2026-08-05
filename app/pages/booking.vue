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

  // 使用 Promise.all 平行獲取休假設定與預約資料，縮短總等待時間
  await Promise.all([
    fetchHolidays(),
    fetchAllUpcomingAppointments()
  ])
})

const minDateObj = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
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
    // 1. 平行重新獲取：休假資料、所有預約資料（這會觸發 disabledDates 重新計算，更新日曆）
    await Promise.all([
      fetchHolidays(),
      fetchAllUpcomingAppointments()
    ])

    // 2. 若目前已經有選定日期，則一併重新獲取當日的詳細預約狀況（這會更新現有的可選擇時段）
    if (form.date) {
      const res = await fetch(`${backendUrl}/api/appointments?date=${form.date}`)
      if (res.ok) {
        const result = await res.json()
        existingAppointments.value = result.data
        // 同步更新快取，確保日曆判斷一致
        cachedDayAppointments.value[form.date] = result.data
      }
    }
  } catch (e) {
    console.error('重新載入最新狀態失敗', e)
  } finally {
    isRefreshingSlots.value = false
  }
}

const timeSlots = computed(() => {
  const slots = []
  const startHour = 10
  const endHour = 19
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 19 && m > 30) break
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return slots
})

const checkSlotDisabledForDate = (dateStr: string, slotTime: string, apptsList: any[]) => {
  if (!dateStr || !slotTime) return false

  const [h, m] = slotTime.split(':').map(Number)
  const slotStartMin = h * 60 + m
  const slotEndMin = slotStartMin + 150 
  
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
  for (let i = 1; i <= 60; i++) {
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
      let allSlotsTaken = true
      for (const time of timeSlots.value) {
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

        <div v-if="errorMessage" class="bg-red-50 text-red-600 p-3.5 rounded-2xl text-xs sm:text-sm text-center font-bold animate-shake border border-red-200">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleBooking" class="space-y-6">
          
          <!-- 步驟 1：選擇日期 -->
          <div class="space-y-2.5 relative z-40">
            <label class="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-[#154337] text-white text-xs flex items-center justify-center font-mono font-bold">1</span>
              選擇預約日期 <span class="text-red-500">*</span>
            </label>
            
            <MyCalendar 
              v-model="selectedDateObj"
              :min-date="minDateObj"
              :disabled-dates="disabledDates" 
              :disabled-week-days="disabledWeekDays"
              placeholder="點擊選擇預約日期"
            />
            
            <div class="flex items-start gap-1.5 text-[11px] text-gray-500 mt-2 bg-[#FAF4EE]/70 p-3 rounded-2xl border border-[#C5A880]/20 font-light">
              <Icon name="mdi:information-outline" size="16" class="shrink-0 text-[#C5A880] mt-0.5" />
              <span>開放預約明日起之日期；若當日無可選擇時段，系統將自動將該日期標示為不可選。</span>
            </div>
          </div>

          <!-- 步驟 2：選擇時段 -->
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
                class="text-xs text-[#154337] bg-[#FAF4EE] hover:bg-[#154337] hover:text-white px-3 py-1 rounded-full transition-all flex items-center gap-1.5 font-bold disabled:opacity-50 active:scale-95 border border-[#C5A880]/30 shadow-xs"
              >
                <Icon name="mdi:refresh" size="14" :class="{ 'animate-spin': isRefreshingSlots }" class="text-[#C5A880]" />
                <span>重新載入</span>
              </button>
            </div>
            
            <div v-if="!form.date" class="text-gray-400 text-xs sm:text-sm py-10 text-center bg-[#FAF4EE]/50 rounded-2xl border border-dashed border-[#C5A880]/30 font-light">
              請先點選上方日期以載入可預約時段
            </div>
            
            <div v-else-if="isFullDayOff" class="text-red-600 text-xs sm:text-sm font-bold bg-red-50/80 p-4 rounded-2xl border border-red-200 text-center">
              🚫 店家本日公休，請選擇其他日期！
            </div>

            <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-2xl bg-[#FAF4EE]/40">
              <button 
                v-for="time in timeSlots" 
                :key="time"
                type="button"
                :disabled="isSlotDisabled(time)"
                @click="form.startTime = time"
                :class="[
                  'py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border active:scale-95 flex items-center justify-center gap-1 font-mono',
                  isSlotDisabled(time) ? 'bg-gray-100/80 text-gray-300 border-gray-200 cursor-not-allowed line-through' :
                  form.startTime === time ? 'bg-[#154337] text-white border-[#C5A880] shadow-md scale-[1.02]' :
                  'bg-white text-gray-700 border-gray-200 hover:border-[#154337] shadow-xs'
                ]"
              >
                <span>{{ time }}</span>
              </button>
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