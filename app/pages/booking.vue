<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref<any>(null)
const backendUrl = 'https://reserve-backend.gta510564.workers.dev'

// 🌟 1. 表單資料
const form = reactive({
  serviceName: '精緻美學療程 (2.5小時)',
  date: '',      
  startTime: ''
})

// 🌟 2. 專門給 V-Calendar 綁定用的 Date 物件
const selectedDateObj = ref<Date | null>(null)

const existingAppointments = ref<any[]>([])
const status = ref('idle')
const errorMessage = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('hervive_user')
  if (!storedUser) {
    alert('請先登入會員才能進行預約！')
    return router.push('/login?redirect=/booking')
  }
  currentUser.value = JSON.parse(storedUser)
})

// 計算明天的 Date 物件 (用來阻擋過去與今天)
const minDateObj = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
})

// 🌟 3. 當 V-Calendar 選擇日期後，轉換格式並呼叫 API
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
  const startHour = 13
  const endHour = 20
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 20 && m > 30) break 
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

  for (const appt of existingAppointments.value) {
    const [ah, am] = appt.start_time.split(':').map(Number)
    const [ae, em] = appt.end_time.split(':').map(Number)
    if (slotStartMin < (ae * 60 + em) && slotEndMin > (ah * 60 + am)) {
      return true 
    }
  }
  return false
}

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
    alert('預約成功！已為您保留專屬時段。')
    router.push('/member')
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err.message
  }
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
        
        <!-- 🌟 V-Calendar 區塊 -->
        <div class="space-y-2 relative">
          <label class="text-sm font-medium text-gray-700">選擇預約日期 <span class="text-red-500">*</span></label>
          
          <!-- 🗑️ 把原本的 ClientOnly 跟 VDatePicker 整個刪掉 -->
          <!-- ✅ 替換成這行極度乾淨的程式碼： -->
          <MyCalendar 
            v-model="selectedDateObj"
            :min-date="minDateObj"
          />
          
          <p class="text-xs text-gray-400 mt-1">僅開放預約明日起之日期，若需當日緊急預約請來電。</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">選擇開始時間 <span class="text-red-500">*</span></label>
          <div v-if="!form.date" class="text-gray-400 text-sm">請先選擇上方日期</div>
          <div class="grid grid-cols-4 gap-2.5 max-h-60 overflow-y-auto p-1 border border-gray-200 rounded-lg">
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
          :disabled="!form.startTime || status === 'loading'"
          class="w-full bg-[#154337] text-[#FAF4EE] font-bold py-3.5 rounded-xl hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {{ status === 'loading' ? '處理預約中...' : '確認送出預約' }}
        </button>
      </form>
    </div>
  </div>
</template>