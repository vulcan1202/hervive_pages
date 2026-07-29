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
const { $liff } = useNuxtApp()

// 🌟 判斷 LIFF 環境
const isLiffMode = ref(false)

onMounted(() => {
  const storedUser = localStorage.getItem('hervive_user')
  if (!storedUser) {
    alert('請先登入會員才能進行預約！')
    return router.push('/login?redirect=/booking')
  }
  currentUser.value = JSON.parse(storedUser)
  
  if ($liff && $liff.isInClient()) {
    isLiffMode.value = true
  }

  fetchHolidays()
})

const minDateObj = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
})

const disabledDates = computed(() => {
  const dates = []
  const weeklyWeekdays = new Set()

  for (const h of holidays.value) {
    if (h.type === 'weekly') {
      const dow = Number(h.day_of_week)
      if (Number.isInteger(dow) && dow >= 0 && dow <= 6) {
        weeklyWeekdays.add(dow + 1)
      } else {
        console.warn('⚠️ 忽略無效的 day_of_week：', h)
      }
    } else if (h.type === 'full_day' && h.date) {
      dates.push(new Date(h.date.replace(/-/g, '/')))
    }
  }

  if (weeklyWeekdays.size > 0) {
    dates.push({ repeat: { weekdays: Array.from(weeklyWeekdays) } })
  }

  return dates
})

const fetchHolidays = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/holidays`)
    if (res.ok) holidays.value = await res.json()
  } catch (e) {
    console.error('取得休假設定失敗', e)
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
    
    fetchDayAppointments(form.date)
  } else {
    form.date = ''
  }
})

const fetchDayAppointments = async (selectedDate: string) => {
  isRefreshingSlots.value = true
  try {
    const res = await fetch(`${backendUrl}/api/appointments?date=${selectedDate}`)
    if (res.ok) {
      existingAppointments.value = await res.json()
    }
  } catch (e) {
    console.error('取得當日預約失敗', e)
  } finally {
    isRefreshingSlots.value = false
  }
}

const handleRefreshSlots = () => {
  if (form.date) {
    fetchDayAppointments(form.date)
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

const isSlotDisabled = (slotTime: string) => {
  if (!form.date) return true

  const [h, m] = slotTime.split(':').map(Number)
  const slotStartMin = h * 60 + m
  const slotEndMin = slotStartMin + 150 
  
  const reqDateObj = new Date(form.date)
  const dayOfWeek = reqDateObj.getDay()

  for (const h of holidays.value) {
    if (h.type === 'weekly' && h.day_of_week === dayOfWeek) return true
    if (h.type === 'full_day' && h.date === form.date) return true
    
    if (h.type === 'time_range' && h.date === form.date) {
      const [hhStart, hmStart] = h.start_time.split(':').map(Number)
      const holidayStartMin = hhStart * 60 + hmStart
      const [hhEnd, hmEnd] = h.end_time.split(':').map(Number)
      const holidayEndMin = hhEnd * 60 + hmEnd
      
      if (slotStartMin < holidayEndMin && slotEndMin > holidayStartMin) {
        return true
      }
    }
  }

  for (const appt of existingAppointments.value) {
    const [ah, am] = appt.start_time.split(':').map(Number)
    const [ae, em] = appt.end_time.split(':').map(Number)
    if (slotStartMin < (ae * 60 + em) && slotEndMin > (ah * 60 + am)) {
      return true 
    }
  }
  
  return false
}

const isFullDayOff = computed(() => {
  if (!form.date) return false
  const reqDateObj = new Date(form.date)
  const dayOfWeek = reqDateObj.getDay()
  
  return holidays.value.some(h => 
    (h.type === 'weekly' && h.day_of_week === dayOfWeek) || 
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
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || '預約失敗')
    
    appointmentCode.value = data.appointment.appointment_code
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
  <!-- 🌟 邊距動態優化：LIFF 模式下給予雙倍吸底空間，避免檔住按鈕 -->
  <div :class="['max-w-2xl mx-auto px-3 sm:px-4 pt-2 sm:py-12', isLiffMode ? 'pb-36' : 'pb-28 sm:pb-12']">
    
    <!-- 主卡片 -->
    <div class="bg-white rounded-2xl shadow-sm border border-[#C7CDCE] p-4 sm:p-8">
      
      <!-- 頁面標題區 -->
      <div class="border-b border-gray-100 pb-3 mb-5 flex items-center justify-between">
        <div>
          <h2 class="text-lg sm:text-2xl font-bold text-[#154337] title-serif flex items-center gap-2">
            <Icon name="mdi:calendar-clock" class="text-[#154337]" size="22" />
            線上預約護膚
          </h2>
          <p class="text-gray-400 text-xs mt-0.5">療程預計服務時間固定為 2.5 小時</p>
        </div>
        <!-- LINE LIFF 專屬標籤 -->
        <span v-if="isLiffMode" class="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold border border-emerald-200/60 shrink-0">
          LINE 快速預約
        </span>
      </div>

      <!-- 錯誤提示 -->
      <div v-if="errorMessage" class="bg-red-50 text-red-600 p-3 rounded-xl text-xs sm:text-sm mb-5 text-center font-medium animate-shake">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleBooking" class="space-y-5">
        
        <!-- 步驟 1：選擇日期 -->
        <div class="space-y-2 relative z-40">
          <label class="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
            <span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#154337] text-white text-[10px] sm:text-xs flex items-center justify-center font-mono">1</span>
            選擇預約日期 <span class="text-red-500">*</span>
          </label>
          
          <MyCalendar 
            v-model="selectedDateObj"
            :min-date="minDateObj"
            :disabled-dates="disabledDates" 
            placeholder="點擊選擇預約日期"
          />
          
          <div class="flex items-start gap-1 text-[11px] text-gray-400 mt-1.5 bg-gray-50/80 p-2 rounded-xl">
            <Icon name="mdi:information-outline" size="14" class="shrink-0 text-gray-500 mt-0.5" />
            <span>開放預約明日起之日期；若需當日預約請直接透過 LINE 訊息諮詢。</span>
          </div>
        </div>

        <!-- 步驟 2：選擇時段 -->
        <div class="space-y-2 pt-3 border-t border-gray-100">
          <div class="flex items-center justify-between mb-1">
            <label class="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#154337] text-white text-[10px] sm:text-xs flex items-center justify-center font-mono">2</span>
              選擇時段 <span class="text-red-500">*</span>
            </label>

            <!-- 刷新按鈕 -->
            <button 
              v-if="form.date && !isFullDayOff"
              type="button" 
              @click="handleRefreshSlots" 
              :disabled="isRefreshingSlots"
              class="text-xs text-[#154337] bg-gray-50 hover:bg-[#154337]/5 px-2 py-1 rounded-lg transition flex items-center gap-1 font-bold disabled:opacity-50 active:scale-95"
            >
              <Icon name="mdi:refresh" size="13" :class="{ 'animate-spin': isRefreshingSlots }" />
              <span>重新載入時段</span>
            </button>
          </div>
          
          <div v-if="!form.date" class="text-gray-400 text-xs sm:text-sm py-8 text-center bg-gray-50/60 rounded-xl border border-dashed border-gray-200">
            請先點選上方日期以載入可預約時段
          </div>
          
          <div v-else-if="isFullDayOff" class="text-red-500 text-xs sm:text-sm font-bold bg-red-50/80 p-4 rounded-xl border border-red-100 text-center">
            🚫 店家本日公休，請選擇其他日期！
          </div>

          <!-- 時段網格 -->
          <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5 max-h-60 overflow-y-auto p-1.5 border border-gray-200 rounded-xl bg-gray-50/50">
            <button 
              v-for="time in timeSlots" 
              :key="time"
              type="button"
              :disabled="isSlotDisabled(time)"
              @click="form.startTime = time"
              :class="[
                'py-2.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border active:scale-95 flex items-center justify-center gap-1',
                isSlotDisabled(time) ? 'bg-gray-100/80 text-gray-300 border-gray-200 cursor-not-allowed line-through' :
                form.startTime === time ? 'bg-[#154337] text-white border-[#154337] shadow-md scale-[1.02]' :
                'bg-white text-gray-700 border-gray-200 hover:border-[#154337] shadow-2xs'
              ]"
            >
              <Icon v-if="form.startTime === time" name="mdi:check-circle" size="14" class="text-emerald-300" />
              <span>{{ time }}</span>
            </button>
          </div>
        </div>

        <!-- 桌機版按鈕 -->
        <button 
          type="submit" 
          :disabled="!form.startTime || status === 'loading' || isFullDayOff"
          class="hidden sm:block w-full bg-[#154337] text-[#FAF4EE] font-bold py-3.5 rounded-xl hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {{ status === 'loading' ? '處理預約中...' : '確認送出預約' }}
        </button>

      </form>
    </div>

    <!-- 🌟 吸底固定提交 Bar (Bottom Bar) - 適應 Layout 底部 Menu -->
    <div 
      :class="[
        'sm:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/80 p-3 z-40 shadow-lg transition-all',
        isLiffMode ? 'bottom-[60px] pb-[calc(env(safe-area-inset-bottom)+8px)]' : 'bottom-0 pb-[env(safe-area-inset-bottom)]'
      ]"
    >
      <div class="max-w-md mx-auto flex items-center justify-between gap-3">
        <div class="text-xs">
          <p class="text-gray-400 text-[10px]">已選預約時段：</p>
          <p class="font-bold text-[#154337] text-xs sm:text-sm">
            {{ form.date && form.startTime ? `${form.date} ${form.startTime}` : '請選擇時間' }}
          </p>
        </div>
        <button 
          @click="handleBooking"
          :disabled="!form.startTime || status === 'loading' || isFullDayOff"
          class="bg-[#154337] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:bg-opacity-90 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
        >
          {{ status === 'loading' ? '處理中...' : '確認預約' }}
        </button>
      </div>
    </div>

    <!-- 🌟 預約成功引導 Bottom Sheet -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
      <div class="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-7 text-center space-y-4 animate-slide-up relative">
        
        <!-- 手機頂部拖曳視覺條 -->
        <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-1 sm:hidden"></div>

        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-xl sm:text-3xl shadow-2xs">
          ⏳
        </div>
        
        <div>
          <h2 class="text-lg sm:text-2xl font-bold text-gray-800 mb-1">預約尚未完全成立！</h2>
          <p class="text-red-600 font-medium text-xs sm:text-sm">
            請在 <span class="font-black underline">30 分鐘內</span> 完成 LINE 驗證，<br>逾時系統將自動釋放出此時段。
          </p>
        </div>

        <!-- 專屬單號卡片 -->
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 sm:p-4">
          <p class="text-gray-400 text-[11px] mb-0.5">您的專屬預約編號</p>
          <div class="text-2xl sm:text-3xl font-black text-[#154337] tracking-wider mb-2 font-mono">
            {{ appointmentCode }}
          </div>
          <button 
            v-if="!($liff && $liff.isInClient())"
            @click="copyCode"
            class="text-xs bg-white text-gray-700 border border-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-100 transition shadow-2xs"
          >
            📄 複製編號
          </button>
        </div>

        <!-- 主要導引動作按鈕 -->
        <div class="space-y-2.5 pt-1">
          <button 
            @click="handleSendLineMessage"
            class="block w-full bg-[#06C755] text-white font-bold py-3 rounded-xl hover:bg-[#05b34c] active:scale-98 transition shadow-md text-xs sm:text-base"
          >
            {{ $liff && $liff.isInClient() ? '傳送預約編號並返回 LINE' : '複製編號並前往 LINE 驗證' }}
          </button>
          
          <button 
            @click="finishAndRedirect"
            class="text-xs text-gray-400 hover:text-gray-700 underline transition py-1 block w-full"
          >
            我已完成傳送，返回會員頁
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<style>
/* Bottom Sheet 上滑動畫 */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
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