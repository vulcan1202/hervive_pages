<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref<any>(null)
const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

const form = reactive({
  serviceName: '精緻美學療程 (2.5小時)',
  date: '',      
  startTime: ''
})

const selectedDateObj = ref<Date | null>(null)
const existingAppointments = ref<any[]>([])
const status = ref('idle')
const errorMessage = ref('')
const showSuccessModal = ref(false)
const appointmentCode = ref('')

// 存放店家休假設定
const holidays = ref<any[]>([])

onMounted(() => {
  const storedUser = localStorage.getItem('hervive_user')
  if (!storedUser) {
    alert('請先登入會員才能進行預約！')
    return router.push('/login?redirect=/booking')
  }
  currentUser.value = JSON.parse(storedUser)
  
  // 載入休假設定
  fetchHolidays()
})

// 計算明天的 Date 物件 (用來阻擋過去與今天)
const minDateObj = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
})

// 🌟 將後端的休假設定轉換為 V-Calendar 標準的禁用格式
const disabledDates = computed(() => {
  const dates = []

  // 🌟 把所有固定公休的星期幾，先合併成同一個 weekdays 陣列
  // （原本的寫法是每一筆 weekly 各自 push 一個物件，
  //   一旦其中一筆的 day_of_week 是 undefined/NaN/超出範圍，
  //   就會整組 disabled-dates 失效，讓 V-Calendar 直接鎖死整個日曆）
  const weeklyWeekdays = new Set()

  // 處理老闆的休假設定
  for (const h of holidays.value) {
    if (h.type === 'weekly') {
      const dow = Number(h.day_of_week)
      // ⚠️ 防呆：day_of_week 必須是 0~6 的整數，不是的話直接跳過、不要塞進陣列
      if (Number.isInteger(dow) && dow >= 0 && dow <= 6) {
        // V-Calendar: 1=週日, 2=週一... | 資料庫: 0=週日, 1=週一...
        weeklyWeekdays.add(dow + 1)
      } else {
        console.warn('⚠️ 忽略無效的 day_of_week：', h)
      }
    } else if (h.type === 'full_day' && h.date) {
      // ✅ 單日全天公休：直接鎖死該日期
      dates.push(new Date(h.date.replace(/-/g, '/')))
    }
  }

  // ✅ 所有固定公休的星期幾合併成「一個」weekdays 物件，一次鎖住對應的星期
  // ⚠️ 重點修正：v-calendar v3 的語法要求 weekdays 必須包在 repeat 底下，
  //    寫成 { weekdays: [...] }（v2 舊語法）在 v3 會無法正確解析，
  //    導致整個日曆被鎖死，而不是只鎖對應的星期幾。
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
  try {
    const res = await fetch(`${backendUrl}/api/appointments?date=${selectedDate}`)
    if (res.ok) {
      existingAppointments.value = await res.json()
    }
  } catch (e) {
    console.error('取得當日預約失敗', e)
  }
}

const timeSlots = computed(() => {
  const slots = []
  const startHour = 10
  const endHour = 19
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 19 && m > 30) break
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return slots
})

// 🌟 核心防禦：判斷按鈕是否該禁用 (直接變成灰色不可點擊)
const isSlotDisabled = (slotTime: string) => {
  if (!form.date) return true

  // 1. 將客人的預約時間轉為分鐘數 (療程固定 150 分鐘)
  const [h, m] = slotTime.split(':').map(Number)
  const slotStartMin = h * 60 + m
  const slotEndMin = slotStartMin + 150 
  
  const reqDateObj = new Date(form.date)
  const dayOfWeek = reqDateObj.getDay()

  // 🛡️ 檢查老闆是否設定了休假/休息時段
  for (const h of holidays.value) {
    // 遇到固定公休或單日全天休假，該日所有按鈕直接鎖死
    if (h.type === 'weekly' && h.day_of_week === dayOfWeek) return true
    if (h.type === 'full_day' && h.date === form.date) return true
    
    // 遇到特定時段休息 (檢查是否有重疊)
    if (h.type === 'time_range' && h.date === form.date) {
      const [hhStart, hmStart] = h.start_time.split(':').map(Number)
      const holidayStartMin = hhStart * 60 + hmStart
      const [hhEnd, hmEnd] = h.end_time.split(':').map(Number)
      const holidayEndMin = hhEnd * 60 + hmEnd
      
      // 若預約時段與休息時段有交集，按鈕直接禁用！
      if (slotStartMin < holidayEndMin && slotEndMin > holidayStartMin) {
        return true
      }
    }
  }

  // 🛡️ 檢查是否與已存在的預約撞期
  for (const appt of existingAppointments.value) {
    const [ah, am] = appt.start_time.split(':').map(Number)
    const [ae, em] = appt.end_time.split(':').map(Number)
    if (slotStartMin < (ae * 60 + em) && slotEndMin > (ah * 60 + am)) {
      return true 
    }
  }
  
  return false
}

// 判斷這一天是不是「整天公休」或「每週固定公休」，用來顯示大字提示
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
        start_time: form.startTime
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

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(appointmentCode.value)
    alert('✅ 預約編號已複製！請前往 LINE 貼上發送。')
  } catch (err) {
    alert('複製失敗，請手動選取複製')
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
      <h2 class="text-2xl font-bold text-[#154337] mb-2 title-serif">線上預約療程</h2>
      <p class="text-gray-500 text-sm mb-6">每次療程固定為 2.5 小時，您可以自由選擇 15 分鐘為間距的開始時間。</p>

      <div v-if="errorMessage" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleBooking" class="space-y-6">
        
        <div class="space-y-2 relative z-40">
          <label class="text-sm font-medium text-gray-700">選擇預約日期 <span class="text-red-500">*</span></label>
          <MyCalendar 
            v-model="selectedDateObj"
            :min-date="minDateObj"
            :disabled-dates="disabledDates" 
            placeholder="請選擇日期"
          />
          <p class="text-xs text-gray-400 mt-1">僅開放預約明日起之日期，若需當日緊急預約請來電。</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">選擇開始時間 <span class="text-red-500">*</span></label>
          
          <div v-if="!form.date" class="text-gray-400 text-sm">請先選擇上方日期</div>
          
          <!-- 老闆整天公休的大提示 -->
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
                // 🌟 當 isSlotDisabled 回傳 true 時，按鈕直接變灰、加上刪除線，無法點擊
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

    <!-- 預約成功後的引導畫面 -->
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
            @click="copyCode"
            class="bg-[#154337] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition shadow-sm"
          >
            📄 點擊複製編號
          </button>
        </div>

        <div class="space-y-4 pt-2">
          <a 
            href="https://lin.ee/HmMJftl"
            target="_blank"
            class="block w-full bg-[#06C755] text-white font-bold py-3.5 rounded-xl hover:bg-[#05b34c] transition shadow-md"
          >
            前往 LINE 官方帳號發送編號
          </a>
          
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