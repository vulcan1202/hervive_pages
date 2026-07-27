<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

const appointments = ref<any[]>([])
const loading = ref(true)
const errorMessage = ref('')
const filterDate = ref('')

onMounted(() => {
  const isAdmin = localStorage.getItem('hervive_admin')
  if (!isAdmin) {
    const password = prompt('請輸入商家管理密碼：')
    if (password === 'hervive520') {
      localStorage.setItem('hervive_admin', 'true')
      fetchAllAppointments()
    } else {
      alert('密碼錯誤！')
      router.push('/')
    }
  } else {
    fetchAllAppointments()
  }
})

const fetchAllAppointments = async () => {
  loading.value = true
  try {
    const res = await fetch(`${backendUrl}/api/appointments`)
    if (!res.ok) throw new Error('讀取預約清單失敗')
    const data = await res.json()
    
    // 初始化每一個預約項目的編輯中備註欄位
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

// 變更預約狀態
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

// 儲存備註至資料庫
const saveNotes = async (appt: any) => {
  try {
    const res = await fetch(`${backendUrl}/api/appointments`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: appt.id, 
        user_id: appt.user_id, // 需確保後端有回傳 user_id
        notes: appt.editNotes 
      })
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
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="bg-white rounded-2xl shadow-sm border border-[#C7CDCE] p-8">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 class="text-2xl font-bold text-[#154337] title-serif">商家後台 - 預約管理系統</h2>
          <p class="text-gray-500 text-sm">在此檢視與管理所有客戶的預約時段與聯絡資訊。</p>
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="date" 
            v-model="filterDate"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#154337]"
          />
          <button 
            v-if="filterDate" 
            @click="filterDate = ''"
            class="text-xs bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            顯示全部
          </button>
          <button 
            @click="fetchAllAppointments"
            class="bg-[#154337] text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-95 transition"
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
              <th class="p-3.5 font-medium">時間區間 (2.5小時)</th>
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
                  {{ 
                    appt.status === 'confirmed' ? '已確認' : 
                    appt.status === 'cancelled' ? '已取消' : '審核中' 
                  }}
                </span>
              </td>

              <td class="p-3.5 font-semibold text-gray-800">{{ appt.date }}</td>

              <td class="p-3.5 text-[#154337] font-bold">
                {{ appt.start_time }} ~ {{ appt.end_time }}
              </td>

              <td class="p-3.5 font-medium text-gray-900">{{ appt.client_name }}</td>

              <td class="p-3.5 text-gray-600">
                <a :href="`tel:${appt.client_phone}`" class="hover:underline text-[#154337]">
                  {{ appt.client_phone }}
                </a>
              </td>

              <!-- 🌟 可編輯的備註輸入框與儲存按鈕 -->
              <td class="p-3.5">
                <div class="flex items-center gap-2">
                  <input 
                    type="text" 
                    v-model="appt.editNotes" 
                    class="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs w-full focus:ring-2 focus:ring-[#154337] bg-white"
                    placeholder="輸入備註..."
                  />
                  <button 
                    @click="saveNotes(appt)"
                    class="text-xs bg-gray-800 text-white px-2.5 py-1.5 rounded-lg hover:bg-black transition shrink-0"
                  >
                    儲存
                  </button>
                </div>
              </td>

              <td class="p-3.5 text-right space-x-2">
                <button 
                  v-if="!appt.status || appt.status === 'pending'"
                  @click="updateAppointmentStatus(appt.id, 'confirmed')"
                  class="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                >
                  核准
                </button>

                <button 
                  v-if="appt.status !== 'cancelled'"
                  @click="updateAppointmentStatus(appt.id, 'cancelled')"
                  class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                >
                  取消
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center py-16 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        目前沒有任何預約紀錄。
      </div>

    </div>
  </div>
</template>