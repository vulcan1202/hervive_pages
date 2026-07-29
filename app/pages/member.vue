<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const currentUser = ref<any>(null)
const activeTab = ref('history') // 預設先看預約紀錄更直覺：'history' | 'profile'
const status = ref('idle')
const message = ref('')

// 預約紀錄清單
const bookingHistory = ref<any[]>([])

// 修改資料的表單
const profileForm = reactive({
  lastName: '',
  firstName: '',
  gender: '',
  email: '',
  password: ''
})

const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

onMounted(async () => {
  const storedUser = localStorage.getItem('hervive_user')
  if (!storedUser) {
    alert('請先登入會員！')
    return navigateTo('/login')
  }
  
  currentUser.value = JSON.parse(storedUser)
  
  profileForm.lastName = currentUser.value.lastName || ''
  profileForm.firstName = currentUser.value.firstName || ''
  profileForm.gender = currentUser.value.gender || ''
  profileForm.email = currentUser.value.email || ''
  
  fetchBookingHistory()
})

const handleLogout = () => {
  if (confirm('確定要登出系統嗎？')) {
    localStorage.removeItem('hervive_user')
    navigateTo('/login')
  }
}

const fetchBookingHistory = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/appointments?user_id=${currentUser.value.id}`)
    if (res.ok) {
      bookingHistory.value = await res.json()
    }
  } catch (error) {
    console.error('讀取預約紀錄失敗', error)
  }
}

const updateProfile = async () => {
  status.value = 'loading'
  message.value = ''
  
  try {
    const res = await fetch(`${backendUrl}/api/users`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: currentUser.value.id,
        last_name: profileForm.lastName,
        first_name: profileForm.firstName,
        gender: profileForm.gender,
        email: profileForm.email,
        password: profileForm.password || undefined
      })
    })

    if (!res.ok) throw new Error('更新失敗')

    currentUser.value.lastName = profileForm.lastName
    currentUser.value.firstName = profileForm.firstName
    currentUser.value.gender = profileForm.gender
    currentUser.value.email = profileForm.email
    localStorage.setItem('hervive_user', JSON.stringify(currentUser.value))

    profileForm.password = '' // 成功後清空密碼欄位
    status.value = 'success'
    message.value = '個人資料更新成功！'
  } catch (error: any) {
    status.value = 'error'
    message.value = error.message || '更新失敗，請稍後再試'
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4" v-if="currentUser">
    
    <!-- 🌟 手機版體驗升級：個人英雄資訊卡 (Mobile Profile Hero Card) -->
    <div class="bg-gradient-to-br from-[#154337] to-[#1e5847] text-[#FAF4EE] rounded-2xl p-5 sm:p-6 mb-6 shadow-md relative overflow-hidden">
      <div class="flex justify-between items-center relative z-10">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF4EE]/10 border border-[#FAF4EE]/20 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-inner">
            👤
          </div>
          <div>
            <h1 class="text-xl sm:text-2xl font-bold tracking-wide">
              {{ currentUser.lastName }}{{ currentUser.firstName }}
            </h1>
            <p class="text-xs sm:text-sm text-[#FAF4EE]/80 mt-0.5">
              Hervive 會員
            </p>
          </div>
        </div>

        <button 
          @click="handleLogout" 
          class="bg-white/10 hover:bg-white/20 active:scale-95 text-[#FAF4EE] border border-[#FAF4EE]/30 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 backdrop-blur-xs"
        >
          <Icon name="mdi:logout" size="16" />
          <span>登出</span>
        </button>
      </div>
    </div>

    <!-- 🌟 手機分頁分流器 (Full Width Segmented Control) -->
    <div class="bg-gray-100 p-1 rounded-2xl flex mb-6 border border-gray-200">
      <button 
        @click="activeTab = 'history'" 
        :class="[
          'flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98', 
          activeTab === 'history' ? 'bg-white text-[#154337] shadow-sm' : 'text-gray-500 hover:text-gray-800'
        ]"
      >
        <Icon name="mdi:calendar-check" size="18" />
        預約紀錄 ({{ bookingHistory.length }})
      </button>

      <button 
        @click="activeTab = 'profile'" 
        :class="[
          'flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98', 
          activeTab === 'profile' ? 'bg-white text-[#154337] shadow-sm' : 'text-gray-500 hover:text-gray-800'
        ]"
      >
        <Icon name="mdi:account-edit" size="18" />
        個人資料
      </button>
    </div>

    <!-- 狀態提示 -->
    <div 
      v-if="message" 
      :class="[
        'p-3.5 rounded-xl mb-6 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 animate-fade-in', 
        status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
      ]"
    >
      <Icon :name="status === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" size="18" />
      <span>{{ message }}</span>
    </div>

    <!-- 🌟 區塊 A：預約紀錄查詢 (優先展示) -->
    <div v-if="activeTab === 'history'" class="space-y-4">
      
      <!-- 無紀錄狀態 -->
      <div v-if="bookingHistory.length === 0" class="bg-white p-8 rounded-2xl shadow-sm border border-[#C7CDCE] text-center text-gray-500 py-12">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="mdi:calendar-blank" size="32" class="text-gray-300" />
        </div>
        <p class="text-sm font-bold text-gray-700 mb-1">目前尚無預約保養紀錄</p>
        <p class="text-xs text-gray-400 mb-6">歡迎隨時預約您的專屬美學管理服務。</p>
        <NuxtLink 
          to="/booking" 
          class="bg-[#154337] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md hover:bg-opacity-90 active:scale-95 transition inline-flex items-center gap-1.5"
        >
          <Icon name="mdi:calendar-plus" size="18" />
          立即線上預約
        </NuxtLink>
      </div>
      
      <!-- 有紀錄狀態：手機卡片化呈現 -->
      <div v-else class="space-y-3">
        <div 
          v-for="appt in bookingHistory" 
          :key="appt.id" 
          class="bg-white p-4 sm:p-5 rounded-2xl shadow-2xs border border-gray-200 hover:border-[#154337]/30 transition space-y-3"
        >
          <!-- 卡片頂部：單號與狀態 -->
          <div class="flex justify-between items-center border-b border-gray-100 pb-3">
            <span class="text-xs font-mono font-bold text-gray-400">
              #{{ appt.appointment_code || appt.id }}
            </span>
            <span :class="[
              'px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1',
              appt.status === 'complete' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              appt.status === 'confirmed' ? 'bg-green-50 text-green-700 border border-green-200' :
              appt.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              'bg-gray-50 text-gray-500 border border-gray-200'
            ]">
              <span class="w-1.5 h-1.5 rounded-full" :class="[
                appt.status === 'complete' ? 'bg-blue-500' :
                appt.status === 'confirmed' ? 'bg-green-500' :
                appt.status === 'pending' ? 'bg-amber-500' : 'bg-gray-400'
              ]"></span>
              {{ appt.status === 'complete' ? '已完成' : appt.status === 'confirmed' ? '預約成功' : appt.status === 'pending' ? '審核中' : '已取消' }}
            </span>
          </div>

          <!-- 卡片主要內容 -->
          <div class="flex items-center gap-3.5">
            <div class="bg-[#FAF4EE] text-[#154337] p-3 rounded-xl flex flex-col items-center justify-center shrink-0 min-w-[75px] border border-[#154337]/10">
              <span class="text-[10px] font-bold tracking-tight opacity-75">{{ appt.date }}</span>
              <span class="text-base font-black tracking-tight mt-0.5">{{ appt.start_time }}</span>
            </div>
            
            <div class="space-y-0.5 flex-1 min-w-0">
              <h4 class="font-bold text-gray-800 text-sm sm:text-base truncate">專屬美容美學管理</h4>
              <p class="text-xs text-gray-500 flex items-center gap-1">
                <Icon name="mdi:clock-outline" size="14" />
                <span>預計時間 2.5 小時</span>
              </p>
              <p v-if="appt.beautician_name" class="text-xs text-[#154337] font-medium flex items-center gap-1">
                <Icon name="mdi:account-heart-outline" size="14" />
                <span>美容師：{{ appt.beautician_name }}</span>
              </p>
            </div>
          </div>

          <!-- 卡片底部備註 (若有) -->
          <div v-if="appt.notes" class="bg-gray-50 p-2.5 rounded-xl text-xs text-gray-600 border border-gray-100 flex items-start gap-1">
            <Icon name="mdi:note-text-outline" size="14" class="text-gray-400 shrink-0 mt-0.5" />
            <span class="truncate">{{ appt.notes }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 🌟 區塊 B：個人資料維護 -->
    <div v-if="activeTab === 'profile'" class="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-[#C7CDCE]">
      <form @submit.prevent="updateProfile" class="space-y-4 max-w-lg">
        
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs sm:text-sm font-bold text-gray-700">姓氏</label>
            <input 
              v-model="profileForm.lastName" 
              type="text" 
              required 
              class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] bg-gray-50/50 focus:bg-white transition" 
            />
          </div>
          <div class="space-y-1">
            <label class="text-xs sm:text-sm font-bold text-gray-700">名字</label>
            <input 
              v-model="profileForm.firstName" 
              type="text" 
              required 
              class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] bg-gray-50/50 focus:bg-white transition" 
            />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs sm:text-sm font-bold text-gray-700">性別</label>
          <select 
            v-model="profileForm.gender" 
            class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] bg-gray-50/50 focus:bg-white transition"
          >
            <option value="female">女</option>
            <option value="male">男</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-xs sm:text-sm font-bold text-gray-700">電子信箱</label>
          <input 
            v-model="profileForm.email" 
            type="email" 
            placeholder="example@email.com"
            class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] bg-gray-50/50 focus:bg-white transition" 
          />
        </div>

        <div class="space-y-1 pt-2 border-t border-gray-100">
          <label class="text-xs sm:text-sm font-bold text-gray-700">重設密碼</label>
          <input 
            v-model="profileForm.password" 
            type="password" 
            placeholder="若不修改請留空..." 
            class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] bg-gray-50/50 focus:bg-white transition" 
          />
          <p class="text-[11px] text-gray-400 mt-0.5">至少包含一個英文與數字。</p>
        </div>
        
        <button 
          type="submit" 
          :disabled="status === 'loading'" 
          class="w-full sm:w-auto bg-[#154337] text-white font-bold py-3.5 px-8 rounded-xl hover:bg-opacity-90 active:scale-95 transition mt-6 disabled:opacity-50 shadow-md text-sm"
        >
          {{ status === 'loading' ? '儲存中...' : '儲存修改' }}
        </button>
      </form>
    </div>

  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.25s ease-out;
}
</style>