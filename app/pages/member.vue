<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'

const currentUser = ref<any>(null)
const activeTab = ref('history') 
const status = ref('idle')
const message = ref('')

const locationOptions = [
  '基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣',
  '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '台南市',
  '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣',
  '其他'
]

const bookingHistory = ref<any[]>([])
// ✅ 新增：控制重新整理按鈕的載入狀態
const isRefreshingHistory = ref(false)

const profileForm = reactive({
  lastName: '',
  firstName: '',
  gender: '',
  dateOfBirth: '', 
  location: '',    
  email: '',
  password: ''
})

const dobDateObj = ref<Date | null>(null)
const maxDobDate = computed(() => new Date())

watch(dobDateObj, (newVal) => {
  if (newVal && !isNaN(newVal.getTime())) {
    const yyyy = newVal.getFullYear()
    const mm = String(newVal.getMonth() + 1).padStart(2, '0')
    const dd = String(newVal.getDate()).padStart(2, '0')
    profileForm.dateOfBirth = `${yyyy}-${mm}-${dd}`
  } else {
    profileForm.dateOfBirth = ''
  }
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

  // 🌟 即時同步會員資料
  try {
    const res = await fetch(`${backendUrl}/api/users?id=${currentUser.value.id}`)
    if (res.ok) {
      const result = await res.json()
      const latestUser = result.data 
      
      if (latestUser) {
        currentUser.value = {
          ...currentUser.value,
          id: latestUser.id,
          lastName: latestUser.last_name || latestUser.lastName,
          firstName: latestUser.first_name || latestUser.firstName,
          gender: latestUser.gender,
          dateOfBirth: latestUser.date_of_birth || latestUser.dateOfBirth,
          location: latestUser.location,
          email: latestUser.email,
          age: latestUser.age
        }
        localStorage.setItem('hervive_user', JSON.stringify(currentUser.value))
      }
    }
  } catch (error) {
    console.error('即時同步會員資料失敗，使用快取資料', error)
  }
  
  profileForm.lastName = currentUser.value.lastName || currentUser.value.last_name || ''
  profileForm.firstName = currentUser.value.firstName || currentUser.value.first_name || ''
  profileForm.gender = currentUser.value.gender || ''
  profileForm.email = currentUser.value.email || ''

  const savedLocation = currentUser.value.location || ''
  profileForm.location = locationOptions.includes(savedLocation) ? savedLocation : ''

  const dobStr = currentUser.value.dateOfBirth || currentUser.value.date_of_birth
  if (dobStr && typeof dobStr === 'string' && dobStr.includes('-')) {
    profileForm.dateOfBirth = dobStr
    const [y, m, d] = dobStr.split('-').map(num => parseInt(num, 10))
    if (y && m && d) {
      dobDateObj.value = new Date(y, m - 1, d)
    }
  }

  fetchBookingHistory()
})

const handleLogout = () => {
  if (confirm('確定要登出系統嗎？')) {
    localStorage.removeItem('hervive_user')
    navigateTo('/login')
  }
}

// ✅ 修改：加入 isRefreshingHistory 狀態控制
const fetchBookingHistory = async () => {
  isRefreshingHistory.value = true
  try {
    const res = await fetch(`${backendUrl}/api/appointments?user_id=${currentUser.value.id}`)
    if (res.ok) {
      const result = await res.json()
      bookingHistory.value = result.data
    }
  } catch (error) {
    console.error('讀取預約紀錄失敗', error)
  } finally {
    isRefreshingHistory.value = false
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
        date_of_birth: profileForm.dateOfBirth,
        location: profileForm.location,
        email: profileForm.email,
        password: profileForm.password || undefined
      })
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.error || '更新失敗')

    currentUser.value.lastName = profileForm.lastName
    currentUser.value.firstName = profileForm.firstName
    currentUser.value.gender = profileForm.gender
    currentUser.value.dateOfBirth = profileForm.dateOfBirth
    currentUser.value.location = profileForm.location
    currentUser.value.email = profileForm.email
    localStorage.setItem('hervive_user', JSON.stringify(currentUser.value))

    profileForm.password = '' 
    status.value = 'success'
    message.value = '個人資料更新成功！'
  } catch (error: any) {
    status.value = 'error'
    message.value = error.message || '更新失敗，請稍後再試'
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4 space-y-6" v-if="currentUser">
    
    <!-- 個人英雄資訊卡 (Double-Bezel 尊榮深色卡片) -->
    <div class="double-bezel-outer">
      <div 
        class="double-bezel-inner p-6 sm:p-8 relative overflow-hidden text-white"
        style="background: linear-gradient(135deg, #154337 0%, #1a4f41 50%, #0D2C24 100%) !important;"
      >
        <!-- 柔光氣氛圖層 -->
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-[#C5A880]/20 blur-3xl"></div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border border-[#C5A880]/50 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-lg backdrop-blur-md">
              👤
            </div>
            <div class="space-y-1">
              <div class="flex flex-wrap items-center gap-2.5">
                <h1 class="text-2xl sm:text-3xl font-bold font-serif-luxury tracking-wider text-white drop-shadow-sm">
                  {{ currentUser.lastName }}{{ currentUser.firstName }}
                </h1>
                <span class="px-3 py-0.5 rounded-full text-[11px] bg-[#C5A880] text-[#154337] font-bold tracking-wider shadow-xs">HERVIVE VIP</span>
              </div>
              <p class="text-xs sm:text-sm text-[#FAF4EE] tracking-wider font-medium opacity-95">
                Hervive 尊榮會員
              </p>
              <p v-if="currentUser.age !== undefined && currentUser.age !== null" class="text-xs text-[#C5A880] font-semibold tracking-wide">
                年齡：{{ currentUser.age }} 歲
              </p>
            </div>
          </div>

          <button 
            @click="handleLogout" 
            class="bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-[#C5A880]/50 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 shrink-0 backdrop-blur-md shadow-sm"
          >
            <Icon name="mdi:logout" size="16" class="text-[#C5A880]" />
            <span>登出系統</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 分頁切換列 -->
    <div class="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl flex border border-[#C5A880]/30 shadow-sm">
      <button 
        @click="activeTab = 'history'" 
        :class="[
          'flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-98', 
          activeTab === 'history' ? 'bg-[#154337] text-white shadow-md' : 'text-gray-600 hover:text-[#154337]'
        ]"
      >
        <Icon name="mdi:calendar-check" size="18" :class="activeTab === 'history' ? 'text-[#C5A880]' : 'text-gray-400'" />
        預約紀錄 ({{ bookingHistory.length }})
      </button>

      <button 
        @click="activeTab = 'profile'" 
        :class="[
          'flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-98', 
          activeTab === 'profile' ? 'bg-[#154337] text-white shadow-md' : 'text-gray-600 hover:text-[#154337]'
        ]"
      >
        <Icon name="mdi:account-edit" size="18" :class="activeTab === 'profile' ? 'text-[#C5A880]' : 'text-gray-400'" />
        個人資料
      </button>
    </div>

    <!-- 狀態提示 -->
    <div 
      v-if="message" 
      :class="[
        'p-4 rounded-2xl text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 animate-fade-in border shadow-xs', 
        status === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
      ]"
    >
      <Icon :name="status === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" size="20" />
      <span>{{ message }}</span>
    </div>

    <!-- 預約紀錄 Tab -->
    <div v-if="activeTab === 'history'" class="space-y-4">
      
      <!-- 重新整理按鈕 -->
      <div class="flex justify-end mb-1">
        <button 
          @click="fetchBookingHistory" 
          :disabled="isRefreshingHistory"
          class="text-xs text-[#154337] bg-white border border-[#C5A880]/30 hover:bg-[#FAF4EE] px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 font-bold disabled:opacity-50 active:scale-95 shadow-xs"
        >
          <Icon name="mdi:refresh" size="14" :class="{ 'animate-spin': isRefreshingHistory }" class="text-[#C5A880]" />
          <span>{{ isRefreshingHistory ? '載入中...' : '重新整理' }}</span>
        </button>
      </div>

      <!-- 尚無紀錄空狀態 -->
      <div v-if="bookingHistory.length === 0" class="double-bezel-outer">
        <div class="double-bezel-inner p-10 text-center text-gray-500 bg-white">
          <div class="w-16 h-16 bg-[#FAF4EE] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C5A880]/30 text-[#154337]">
            <Icon name="mdi:calendar-blank" size="32" />
          </div>
          <p class="text-base font-bold text-gray-800 mb-1 font-serif-luxury">目前尚無預約保養紀錄</p>
          <p class="text-xs text-gray-400 mb-6 font-light">歡迎隨時預約您的專屬美學管理服務。</p>
          <NuxtLink 
            to="/booking" 
            class="bg-[#154337] text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm shadow-md hover:bg-[#0D2C24] active:scale-95 transition inline-flex items-center gap-2 border border-[#C5A880]/30"
          >
            <Icon name="mdi:calendar-plus" size="18" class="text-[#C5A880]" />
            立即線上預約
          </NuxtLink>
        </div>
      </div>
      
      <!-- 預約列表 -->
      <div v-else class="space-y-4">
        <div 
          v-for="appt in bookingHistory" 
          :key="appt.id" 
          class="double-bezel-outer transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="double-bezel-inner p-5 sm:p-6 bg-white space-y-4">
            <div class="flex justify-between items-center border-b border-gray-100 pb-3">
              <span class="text-xs font-mono font-bold text-gray-400">
                #{{ appt.appointment_code || appt.id }}
              </span>
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5',
                appt.status === 'complete' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                appt.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-gray-50 text-gray-500 border border-gray-200'
              ]">
                <span class="w-1.5 h-1.5 rounded-full" :class="[
                  appt.status === 'complete' ? 'bg-blue-500' :
                  appt.status === 'confirmed' ? 'bg-emerald-500' :
                  appt.status === 'pending' ? 'bg-amber-500' : 'bg-gray-400'
                ]"></span>
                {{ appt.status === 'complete' ? '已完成' : appt.status === 'confirmed' ? '預約成功' : appt.status === 'pending' ? '審核中' : '已取消' }}
              </span>
            </div>

            <div class="flex items-center gap-4">
              <div class="bg-[#FAF4EE] text-[#154337] p-3.5 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-[85px] border border-[#C5A880]/30 shadow-xs">
                <span class="text-[11px] font-bold tracking-tight text-gray-500 font-mono">{{ appt.date }}</span>
                <span class="text-lg font-bold tracking-tight text-[#154337] font-serif-luxury mt-0.5">{{ appt.start_time }}</span>
              </div>
              
              <div class="space-y-1 flex-1 min-w-0">
                <h4 class="font-bold text-gray-800 text-sm sm:text-base font-serif-luxury truncate">專屬美容美學管理</h4>
                <p class="text-xs text-gray-500 flex items-center gap-1 font-light">
                  <Icon name="mdi:clock-outline" size="14" class="text-[#C5A880]" />
                  <span>預計時間 2.5 小時</span>
                </p>
                <p v-if="appt.beautician_name" class="text-xs text-[#154337] font-semibold flex items-center gap-1">
                  <Icon name="mdi:account-heart-outline" size="14" class="text-[#C5A880]" />
                  <span>美容師：{{ appt.beautician_name }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 個人資料維護 Tab -->
    <div v-if="activeTab === 'profile'" class="double-bezel-outer">
      <div class="double-bezel-inner p-6 sm:p-8 bg-white">
        <form @submit.prevent="updateProfile" class="space-y-5 max-w-lg mx-auto">
          
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs sm:text-sm font-bold text-gray-700">姓氏</label>
              <input 
                v-model="profileForm.lastName" 
                type="text" 
                required 
                class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] focus:border-[#154337] bg-[#FAF4EE]/40 focus:bg-white transition" 
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs sm:text-sm font-bold text-gray-700">名字</label>
              <input 
                v-model="profileForm.firstName" 
                type="text" 
                required 
                class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] focus:border-[#154337] bg-[#FAF4EE]/40 focus:bg-white transition" 
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs sm:text-sm font-bold text-gray-700">性別</label>
            <select 
              v-model="profileForm.gender" 
              class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] focus:border-[#154337] bg-[#FAF4EE]/40 focus:bg-white transition"
            >
              <option value="female">女</option>
              <option value="male">男</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs sm:text-sm font-bold text-gray-700">出生日期</label>
            <ClientOnly>
              <MyCalendar 
                v-model="dobDateObj" 
                :max-date="maxDobDate"
                placeholder="選擇您的出生日期" 
              />
            </ClientOnly>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs sm:text-sm font-bold text-gray-700">來自哪裡</label>
            <select 
              v-model="profileForm.location" 
              class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] focus:border-[#154337] bg-[#FAF4EE]/40 focus:bg-white transition"
            >
              <option value="">請選擇居住縣市</option>
              <option v-for="loc in locationOptions" :key="loc" :value="loc">{{ loc }}</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs sm:text-sm font-bold text-gray-700">電子信箱</label>
            <input 
              v-model="profileForm.email" 
              type="email" 
              placeholder="example@email.com"
              class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] focus:border-[#154337] bg-[#FAF4EE]/40 focus:bg-white transition" 
            />
          </div>

          <div class="space-y-1.5 pt-3 border-t border-gray-100">
            <label class="text-xs sm:text-sm font-bold text-gray-700">重設密碼</label>
            <input 
              v-model="profileForm.password" 
              type="password" 
              placeholder="若不修改請留空..." 
              class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#154337] focus:border-[#154337] bg-[#FAF4EE]/40 focus:bg-white transition" 
            />
            <p class="text-[11px] text-gray-400 mt-0.5">至少包含一個英文與數字。</p>
          </div>
          
          <button 
            type="submit" 
            :disabled="status === 'loading'" 
            class="w-full bg-[#154337] text-white font-bold py-3.5 px-8 rounded-full hover:bg-[#0D2C24] active:scale-95 transition mt-6 disabled:opacity-50 shadow-md text-sm border border-[#C5A880]/30"
          >
            {{ status === 'loading' ? '儲存中...' : '儲存修改' }}
          </button>
        </form>
      </div>
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