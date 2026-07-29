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

onMounted(() => {
  const storedUser = localStorage.getItem('hervive_user')
  if (!storedUser) {
    alert('請先登入會員才能進行預約！')
    return router.push('/login?redirect=/booking')
  }
  currentUser.value = JSON.parse(storedUser)
  
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
        beautician_id: null // 🌟 預設 NULL，由店家後台指派
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
      alert('複製失敗，請手動選取複製')
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
  <div class="max-w-2xl mx-auto px-4 py-12">
    <div class="bg-white rounded-2xl shadow-sm border border-[#C7CDCE] p-8">
      <h2 class="text-2xl font-bold text-[#154337] mb-2 title-serif">線上預約管理</h2>
      <p class="text-gray-500 text-sm mb-6">預計時間為 2.5 小時。</p>

      <div v-if="errorMessage" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleBooking" class="space-y-6">
        
        <!-- 選擇日期 -->
        <div class="space-y-2 relative z-40">
          <label class="text-sm font-medium text-gray-700">選擇預約日期 <span class="text-red-500">*</span></label>
          <MyCalendar 
            v-model="selectedDateObj"
            :min-date="minDateObj"
            :disabled-dates="disabledDates" 
            placeholder="請選擇日期"
          />
          <p class="text-xs text-gray-400 mt-1">僅開放預約明日起之日期，若有需當日預約請 Line 聯絡。</p>
        </div>

        <!-- 選擇時段 -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700">選擇開始時間 (30分鐘一段) <span class="text-red-500">*</span></label>
            <button 
              v-if="form.date && !isFullDayOff"
              type="button" 
              @click="handleRefreshSlots" 
              :disabled="isRefreshingSlots"
              class="text-xs text-[#154337] hover:underline flex items-center gap-1 font-bold disabled:opacity-50"
            >
              <Icon name="mdi:refresh" size="14" :class="{ 'animate-spin': isRefreshingSlots }" />
              刷新當日剩餘時間
            </button>
          </div>
          
          <div v-if="!form.date" class="text-gray-400 text-sm">請先選擇上方日期</div>
          
          <div v-else-if="isFullDayOff" class="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-lg border border-red-100 text-center">
            老闆本日公休，請選擇其他日期！
          </div>

          <div v-else class="grid grid-cols-4 gap-2.5 max-h-60 overflow-y-auto p-1 border border-gray-200 rounded-lg">
            <button 
              v-for="time in timeSlots" 
              :key="time"
              type="button"
              :disabled="isSlotDisabled(time)"
              @click="form.startTime = time"
              :class="[
                'py-2.5 rounded-lg text-sm font-medium transition border',
                isSlotDisabled(time) ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed line-through' :
                form.startTime === time ? 'bg-[#154337] text-white border-[#154337] shadow-sm' :
                'bg-white text-gray-700 border-gray-300 hover:border-[#154337]'
              ]"
            >
              {{ time }}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="!form.startTime || status === 'loading' || isFullDayOff"
          class="w-full bg-[#154337] text-[#FAF4EE] font-bold py-3.5 rounded-xl hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {{ status === 'loading' ? '處理預約中...' : '確認送出預約' }}
        </button>
      </form>
    </div>

    <!-- 預約成功引導視窗 -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-6">
        
        <div class="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
          ⏳
        </div>
        
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">預約尚未完成！</h2>
          <p class="text-red-600 font-medium text-sm">
            請在 30 分鐘內完成 LINE 驗證，<br>否則系統將自動取消此預約時段。
          </p>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <p class="text-gray-500 text-sm mb-1">您的專屬預約編號</p>
          <div class="text-3xl font-black text-[#154337] tracking-wider mb-4">
            {{ appointmentCode }}
          </div>
          <button 
            v-if="!($liff && $liff.isInClient())"
            @click="copyCode"
            class="bg-[#154337] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition shadow-sm"
          >
            📄 點擊複製編號
          </button>
        </div>

        <div class="space-y-4 pt-2">
          <button 
            @click="handleSendLineMessage"
            class="block w-full bg-[#06C755] text-white font-bold py-3.5 rounded-xl hover:bg-[#05b34c] transition shadow-md"
          >
            {{ $liff && $liff.isInClient() ? '自動傳送編號並返回聊天室' : '複製編號並前往 LINE 驗證' }}
          </button>
          
          <button 
            @click="finishAndRedirect"
            class="text-sm text-gray-500 hover:text-gray-800 underline transition"
          >
            我已經傳送了，回會員中心
          </button>
        </div>
      </div>
    </div>
  </div>
</template>