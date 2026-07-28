<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const currentUser = ref<any>(null)
const activeTab = ref('profile') // 'profile' | 'history'
const status = ref('idle')
const message = ref('')

// 預約紀錄清單
const bookingHistory = ref([])

// 修改資料的表單
const profileForm = reactive({
  lastName: '',
  firstName: '',
  gender: '',
  email: '',
  password: ''
})

// 🌟 統一設定後端網址
const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

// 1. 畫面載入時：檢查登入狀態並載入資料
onMounted(async () => {
  const storedUser = localStorage.getItem('hervive_user')
  if (!storedUser) {
    alert('請先登入會員！')
    return navigateTo('/login')
  }
  
  currentUser.value = JSON.parse(storedUser)
  
  // 🌟 將 localStorage 裡的資料寫入表單 (現在有性別和信箱了！)
  profileForm.lastName = currentUser.value.lastName || ''
  profileForm.firstName = currentUser.value.firstName || ''
  profileForm.gender = currentUser.value.gender || ''
  profileForm.email = currentUser.value.email || ''
  
  // 載入預約紀錄
  fetchBookingHistory()
})

// 2. 登出邏輯
const handleLogout = () => {
  localStorage.removeItem('hervive_user')
  alert('您已成功登出！')
  navigateTo('/login')
}

// 3. 取得個人預約紀錄 API
const fetchBookingHistory = async () => {
  try {
    // 🌟 使用正確的 API 網址
    const res = await fetch(`${backendUrl}/api/appointments?user_id=${currentUser.value.id}`)
    if (res.ok) {
      bookingHistory.value = await res.json()
    }
  } catch (error) {
    console.error('讀取預約紀錄失敗', error)
  }
}

// 4. 儲存個人資料 API
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
        password: profileForm.password || undefined // 🌟 如果有填才送出
      })
    })

    if (!res.ok) throw new Error('更新失敗')

    // 更新前端 localStorage 裡的資料
    currentUser.value.lastName = profileForm.lastName
    currentUser.value.firstName = profileForm.firstName
    currentUser.value.gender = profileForm.gender
    currentUser.value.email = profileForm.email
    localStorage.setItem('hervive_user', JSON.stringify(currentUser.value))

    status.value = 'success'
    message.value = '個人資料更新成功！'
  } catch (error: any) {
    status.value = 'error'
    message.value = error.message
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4" v-if="currentUser">
    
    <!-- 頁面標題與登出按鈕 -->
    <div class="flex justify-between items-center mb-8 border-b border-[#C7CDCE] pb-4">
      <div>
        <h1 class="text-3xl font-bold text-[#154337] title-serif">會員中心</h1>
        <p class="text-gray-500 text-sm mt-1">歡迎回來，{{ currentUser.lastName }}{{ currentUser.firstName }}</p>
      </div>
      <button @click="handleLogout" class="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-50 transition text-sm font-bold flex items-center gap-1">
        <Icon name="mdi:logout" size="18" /> 登出
      </button>
    </div>

    <!-- 頁籤切換 -->
    <div class="flex space-x-4 mb-6">
      <button @click="activeTab = 'profile'" :class="['px-6 py-2 rounded-full font-bold transition', activeTab === 'profile' ? 'bg-[#154337] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200']">
        個人資料維護
      </button>
      <button @click="activeTab = 'history'" :class="['px-6 py-2 rounded-full font-bold transition', activeTab === 'history' ? 'bg-[#154337] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200']">
        預約紀錄查詢
      </button>
    </div>

    <!-- 狀態提示 -->
    <div v-if="message" :class="['p-4 rounded-lg mb-6 text-sm text-center', status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600']">
      {{ message }}
    </div>

    <!-- 區塊 A：個人資料維護 -->
    <div v-if="activeTab === 'profile'" class="bg-white p-8 rounded-2xl shadow-sm border border-[#C7CDCE]">
      <form @submit.prevent="updateProfile" class="space-y-5 max-w-lg">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">姓氏</label>
            <input v-model="profileForm.lastName" type="text" required class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#154337]" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">名字</label>
            <input v-model="profileForm.firstName" type="text" required class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#154337]" />
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700">性別</label>
          <select v-model="profileForm.gender" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#154337]">
            <option value="female">女</option>
            <option value="male">男</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700">電子信箱</label>
          <input v-model="profileForm.email" type="email" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#154337]" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700">重設密碼 (若不修改請留空)</label>
          <input v-model="profileForm.password" type="password" placeholder="請輸入新密碼..." class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#154337]" />
        </div>
        
        <button type="submit" :disabled="status === 'loading'" class="bg-[#154337] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition mt-4 disabled:opacity-50">
          儲存修改
        </button>
      </form>
    </div>

    <!-- 區塊 B：預約紀錄查詢 -->
    <div v-if="activeTab === 'history'" class="bg-white p-8 rounded-2xl shadow-sm border border-[#C7CDCE]">
      <div v-if="bookingHistory.length === 0" class="text-center text-gray-500 py-10">
        <Icon name="mdi:calendar-blank" size="48" class="text-gray-300 mb-2 mx-auto" />
        <p>目前還沒有任何預約紀錄喔！</p>
        <NuxtLink to="/booking" class="text-[#154337] font-bold mt-4 inline-block underline">前往預約</NuxtLink>
      </div>
      
      <div v-else class="space-y-4">
        <!-- 🌟 將 key 改為 appt.id，因為資料庫裡沒有 appointment_id -->
        <div v-for="appt in bookingHistory" :key="appt.id" class="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:shadow-sm transition">
          <div class="flex items-center gap-4">
            <div class="bg-[#FAF4EE] text-[#154337] p-3 rounded-lg flex flex-col items-center justify-center min-w-[90px]">
              <!-- 🌟 換成讀取新欄位 date 與 start_time -->
              <span class="text-xs font-bold">{{ appt.date }}</span>
              <span class="text-lg font-bold">{{ appt.start_time }}</span>
            </div>
            <div>
              <h4 class="font-bold text-gray-800">專屬保養管理</h4>
              <!-- 🌟 更新編號顯示 -->
              <p class="text-sm text-gray-500">預約編號：#{{ appt.id }}</p>
            </div>
          </div>
          <div>
            <!-- 🌟 根據預約狀態顯示不同文字 -->
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-bold',
              appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
              appt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-500'
            ]">
              {{ appt.status === 'confirmed' ? '預約成功' : appt.status === 'pending' ? '審核中' : '已取消' }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>