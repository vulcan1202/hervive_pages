<script setup lang="ts">
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

const appointments = ref<any[]>([])
const loading = ref(true)
const errorMessage = ref('')

// 🌟 預約清單的日期篩選 (使用 MyCalendar)
const filterDateObj = ref<Date | null>(null)
const filterDate = ref('')

watch(filterDateObj, (newVal) => {
  if (newVal) {
    const yyyy = newVal.getFullYear()
    const mm = String(newVal.getMonth() + 1).padStart(2, '0')
    const dd = String(newVal.getDate()).padStart(2, '0')
    filterDate.value = `${yyyy}-${mm}-${dd}`
  } else {
    filterDate.value = ''
  }
})

// 🌟 休假設定相關狀態 (使用 MyCalendar)
const holidays = ref<any[]>([])
const holidayDateObj = ref<Date | null>(null)
const holidayForm = reactive({
  type: 'full_day',
  date: '',
  start_time: '',
  end_time: '',
  day_of_week: 1,
  reason: ''
})
const minHolidayDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
})
watch(holidayDateObj, (newVal) => {
  if (newVal) {
    const yyyy = newVal.getFullYear()
    const mm = String(newVal.getMonth() + 1).padStart(2, '0')
    const dd = String(newVal.getDate()).padStart(2, '0')
    holidayForm.date = `${yyyy}-${mm}-${dd}`
  } else {
    holidayForm.date = ''
  }
})

onMounted(() => {
  const isAdmin = localStorage.getItem('hervive_admin')
  if (!isAdmin) {
    const password = prompt('請輸入商家管理密碼：')
    if (password === 'hervive520') {
      localStorage.setItem('hervive_admin', 'true')
      fetchAllAppointments()
      fetchHolidays()
    } else {
      alert('密碼錯誤！')
      router.push('/')
    }
  } else {
    fetchAllAppointments()
    fetchHolidays()
  }
})

const fetchAllAppointments = async () => {
  loading.value = true
  try {
    const res = await fetch(`${backendUrl}/api/appointments`)
    if (!res.ok) throw new Error('讀取預約清單失敗')
    const data = await res.json()
    appointments.value = data.map((item: any) => ({
      ...item,
      editNotes: item.client_notes || ''
    }))
  } catch (err: any) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

const fetchHolidays = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/holidays`)
    if (res.ok) {
      holidays.value = await res.json()
    }
  } catch (err) {
    console.error('讀取休假設定失敗', err)
  }
}

const addHoliday = async () => {
  if (holidayForm.type === 'full_day' && !holidayForm.date) return alert('請選擇日期')
  if (holidayForm.type === 'time_range' && (!holidayForm.date || !holidayForm.start_time || !holidayForm.end_time)) return alert('請填寫完整時間區間')

  try {
    const res = await fetch(`${backendUrl}/api/holidays`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(holidayForm)
    })
    if (!res.ok) throw new Error('設定失敗')
    
    alert('✅ 休假設定已新增！')
    fetchHolidays()
    holidayForm.reason = ''
    // 重置時間選項，保留日期方便連續設定
    holidayForm.start_time = ''
    holidayForm.end_time = ''
  } catch (err: any) {
    alert(err.message)
  }
}

const deleteHoliday = async (id: number) => {
  if (!confirm('確定要刪除這筆休假設定嗎？')) return
  try {
    const res = await fetch(`${backendUrl}/api/holidays?id=${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('刪除失敗')
    fetchHolidays()
  } catch (err: any) {
    alert(err.message)
  }
}

const updateAppointmentStatus = async (id: number, newStatus: string) => {
  const actionText = newStatus === 'confirmed' ? '核准此預約' : '取消此預約'
  if (!confirm(`確定要${actionText}嗎？`)) return

  try {
    const res = await fetch(`${backendUrl}/api/appointments`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    })
    if (!res.ok) throw new Error('狀態更新失敗')
    fetchAllAppointments()
  } catch (err: any) {
    alert(err.message || '操作失敗')
  }
}

const saveNotes = async (appt: any) => {
  try {
    const res = await fetch(`${backendUrl}/api/appointments`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: appt.id, user_id: appt.user_id, notes: appt.editNotes })
    })
    if (!res.ok) throw new Error('備註儲存失敗')
    alert('備註已成功儲存！')
    fetchAllAppointments()
  } catch (err: any) {
    alert(err.message || '操作失敗')
  }
}

const filteredAppointments = computed(() => {
  if (!filterDate.value) return appointments.value
  return appointments.value.filter(item => item.date === filterDate.value)
})

const getWeekdayText = (day: number) => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return `星期${days[day]}`
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- 預約清單區塊 -->
    <div class="bg-white rounded-2xl shadow-sm border border-[#C7CDCE] p-8 mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 class="text-2xl font-bold text-[#154337] title-serif">商家後台 - 預約管理系統</h2>
          <p class="text-gray-500 text-sm">在此檢視與管理所有客戶的預約時段與聯絡資訊。</p>
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto">
          <!-- 🌟 替換為 MyCalendar -->
          <div class="w-48 relative z-50">
            <MyCalendar v-model="filterDateObj" placeholder="篩選預約日期" />
            </div>
            <button 
              v-if="filterDateObj" 
              @click="filterDateObj = null"
              class="text-xs bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition whitespace-nowrap"
            >
              顯示全部
            </button>
          <button 
            @click="fetchAllAppointments"
            class="bg-[#154337] text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-95 transition whitespace-nowrap"
          >
            重新整理
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 text-center">
        {{ errorMessage }}
      </div>

      <div v-if="loading" class="text-center py-12 text-gray-400">
        正在載入預約清單...
      </div>

      <div v-else-if="filteredAppointments.length > 0" class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
              <th class="p-3.5 font-medium">狀態</th>
              <th class="p-3.5 font-medium">預約日期</th>
              <th class="p-3.5 font-medium">時間區間</th>
              <th class="p-3.5 font-medium">客戶姓名</th>
              <th class="p-3.5 font-medium">聯絡電話</th>
              <th class="p-3.5 font-medium min-w-[200px]">備註 / 需求 (可編輯)</th>
              <th class="p-3.5 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="appt in filteredAppointments" :key="appt.id" class="hover:bg-gray-50/50 transition">
              <td class="p-3.5">
                <span :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  appt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-800'
                ]">
                  {{ appt.status === 'confirmed' ? '已確認' : appt.status === 'cancelled' ? '已取消' : '審核中' }}
                </span>
              </td>
              <td class="p-3.5 font-semibold text-gray-800">{{ appt.date }}</td>
              <td class="p-3.5 text-[#154337] font-bold">{{ appt.start_time }} ~ {{ appt.end_time }}</td>
              <td class="p-3.5 font-medium text-gray-900">{{ appt.client_name }}</td>
              <td class="p-3.5 text-gray-600">
                <a :href="`tel:${appt.client_phone}`" class="hover:underline text-[#154337]">{{ appt.client_phone }}</a>
              </td>
              <td class="p-3.5">
                <div class="flex items-center gap-2">
                  <input type="text" v-model="appt.editNotes" class="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs w-full focus:ring-2 focus:ring-[#154337] bg-white" placeholder="輸入備註..." />
                  <button @click="saveNotes(appt)" class="text-xs bg-gray-800 text-white px-2.5 py-1.5 rounded-lg hover:bg-black transition shrink-0">儲存</button>
                </div>
              </td>
              <td class="p-3.5 text-right space-x-2">
                <button v-if="!appt.status || appt.status === 'pending'" @click="updateAppointmentStatus(appt.id, 'confirmed')" class="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition">核准</button>
                <button v-if="appt.status !== 'cancelled'" @click="updateAppointmentStatus(appt.id, 'cancelled')" class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition">取消</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-16 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        目前沒有任何預約紀錄。
      </div>
    </div>

    <!-- 休假管理區塊 -->
    <div class="bg-white rounded-2xl shadow-sm border border-[#C7CDCE] p-8">
      <h3 class="text-xl font-bold text-[#154337] mb-6 border-b pb-4">休假與營業時間設定</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 新增休假表單 -->
        <div class="col-span-1 bg-gray-50 p-5 rounded-xl border border-gray-200">
          <h4 class="font-bold text-gray-800 mb-4">新增公休/休息時段</h4>
          <form @submit.prevent="addHoliday" class="space-y-4 text-sm">
            
            <div>
              <label class="block text-gray-600 mb-1">休假類型</label>
              <select v-model="holidayForm.type" class="w-full border rounded-lg p-2 focus:ring-[#154337] bg-white">
                <option value="full_day">單日全天公休</option>
                <option value="time_range">特定日期時段休息</option>
                <option value="weekly">每週固定公休</option>
              </select>
            </div>

            <!-- 🌟 日期 (單日與時段休才需要) 替換為 MyCalendar 並加上防呆 -->
            <div v-if="holidayForm.type !== 'weekly'" class="relative z-40">
              <label class="block text-gray-600 mb-1">選擇日期</label>
              <MyCalendar 
                v-model="holidayDateObj" 
                placeholder="選擇公休日期" 
                :min-date="minHolidayDate" 
              />
            </div>

            <!-- 星期 (固定每週休才需要) -->
            <div v-if="holidayForm.type === 'weekly'">
              <label class="block text-gray-600 mb-1">星期幾</label>
              <select v-model="holidayForm.day_of_week" class="w-full border rounded-lg p-2 focus:ring-[#154337] bg-white">
                <option :value="1">星期一</option>
                <option :value="2">星期二</option>
                <option :value="3">星期三</option>
                <option :value="4">星期四</option>
                <option :value="5">星期五</option>
                <option :value="6">星期六</option>
                <option :value="0">星期日</option>
              </select>
            </div>

            <!-- 時段 (時段休才需要) -->
            <div v-if="holidayForm.type === 'time_range'" class="flex gap-2">
              <div class="w-1/2">
                <label class="block text-gray-600 mb-1">開始時間</label>
                <input type="time" v-model="holidayForm.start_time" class="w-full border rounded-lg p-2 bg-white" required />
              </div>
              <div class="w-1/2">
                <label class="block text-gray-600 mb-1">結束時間</label>
                <input type="time" v-model="holidayForm.end_time" class="w-full border rounded-lg p-2 bg-white" required />
              </div>
            </div>

            <div>
              <label class="block text-gray-600 mb-1">備註/原因 (選填)</label>
              <input type="text" v-model="holidayForm.reason" placeholder="例如：員工旅遊" class="w-full border rounded-lg p-2 focus:ring-[#154337]" />
            </div>

            <button type="submit" class="w-full bg-[#154337] text-white py-2 rounded-lg hover:bg-opacity-90 transition font-bold mt-2">
              新增設定
            </button>
          </form>
        </div>

        <!-- 休假清單列表 -->
        <div class="col-span-1 md:col-span-2">
          <h4 class="font-bold text-gray-800 mb-4">目前的休假設定</h4>
          <div v-if="holidays.length === 0" class="text-gray-400 text-sm py-4">目前沒有任何休假設定。</div>
          <ul v-else class="space-y-3">
            <li v-for="h in holidays" :key="h.id" class="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm text-sm">
              <div>
                <span v-if="h.type === 'full_day'" class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold mr-2">單日全天</span>
                <span v-if="h.type === 'weekly'" class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mr-2">每週固定</span>
                <span v-if="h.type === 'time_range'" class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold mr-2">時段休息</span>
                
                <span class="font-bold text-gray-800">
                  <template v-if="h.type === 'weekly'">每{{ getWeekdayText(h.day_of_week) }}</template>
                  <template v-else>{{ h.date }}</template>
                </span>
                
                <span v-if="h.type === 'time_range'" class="text-gray-500 ml-2">({{ h.start_time }} ~ {{ h.end_time }})</span>
                <span v-if="h.reason" class="text-gray-400 ml-2 text-xs">- {{ h.reason }}</span>
              </div>
              <button @click="deleteHoliday(h.id)" class="text-red-500 hover:text-red-700 px-2 py-1 bg-red-50 rounded">刪除</button>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>