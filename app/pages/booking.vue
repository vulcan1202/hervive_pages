<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 1. 取得當前登入的使用者狀態
const currentUser = ref<any>(null)

// 畫面載入時檢查 localStorage 中是否有會員資料
onMounted(() => {
  const storedUser = localStorage.getItem('hervive_user')
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  }
})

// 2. 表單資料：因為是會員，只需要選擇時間就好！
const formData = ref({
  date: '',
  time: ''
})

// 3. 定義畫面狀態 ('idle' | 'loading' | 'success' | 'error')
const status = ref('idle')
const errorMessage = ref('')

// 4. 送出預約邏輯
const submitBooking = async () => {
  // 防呆：沒有登入就不能送出
  if (!currentUser.value) return

  status.value = 'loading'
  errorMessage.value = ''

  try {
    // 🌟 請換成你從 Cloudflare 拿到的真實 Worker 網址
    const backendUrl = 'https://reserve-backend.gta510564.workers.dev'

    // ==========================================
    // 會員制優勢：直接拿登入的 ID 新增預約 (POST /api/appointments)
    // ==========================================
    const apptRes = await fetch(`${backendUrl}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUser.value.id, // 從 localStorage 取出的會員 ID
        appointment_time: `${formData.value.date} ${formData.value.time}`
      })
    })

    if (!apptRes.ok) {
      const errData = await apptRes.json()
      throw new Error(errData.error || '預約時段保留失敗')
    }

    // 成功完成！
    status.value = 'success'

  } catch (error: any) {
    status.value = 'error'
    errorMessage.value = error.message || '伺服器發生錯誤，請稍後再試。'
  }
}

// 5. 重設表單
const resetForm = () => {
  formData.value.date = ''
  formData.value.time = ''
  status.value = 'idle'
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-8">
    
    <!-- 頁面標題 -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-[#154337] mb-3 title-serif">預約專屬療程</h1>
      <p class="text-gray-500 text-sm" v-if="currentUser">
        親愛的 {{ currentUser.lastName }}{{ currentUser.firstName }}，請選擇您的專屬療癒時光。
      </p>
    </div>

    <!-- 狀態 A：尚未登入的提示畫面 -->
    <div v-if="!currentUser" class="bg-white p-10 rounded-2xl shadow-sm border border-[#C7CDCE] text-center">
      <Icon class="text-gray-400 mb-4 mx-auto" name="mdi:account-lock-outline" size="64"/>
      <h2 class="text-xl font-bold text-[#154337] mb-2">請先登入會員</h2>
      <p class="text-gray-600 mb-6">您需要登入或註冊 HERVIVE 會員，才能進行線上預約。</p>
      
      <!-- 🌟 修正：加上 ?redirect=/booking 參數 -->
      <NuxtLink class="inline-block bg-[#154337] text-[#FAF4EE] px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition shadow-sm" to="/login?redirect=/booking">
        前往登入 / 註冊
      </NuxtLink>
    </div>

    <!-- 狀態 B：預約成功畫面 -->
    <div v-else-if="status === 'success'" class="bg-white p-10 rounded-2xl shadow-sm border border-[#C7CDCE] text-center">
      <Icon name="mdi:check-circle-outline" size="64" class="text-[#154337] mb-4 mx-auto" />
      <h2 class="text-2xl font-bold text-[#154337] mb-2">預約成功！</h2>
      <p class="text-gray-600 mb-6">我們已收到您的預約資訊，期待在 {{ formData.date }} 為您服務。</p>
      <button @click="resetForm" class="border border-[#154337] text-[#154337] px-6 py-2 rounded-full hover:bg-gray-50 transition">
        返回重新預約
      </button>
    </div>

    <!-- 狀態 C：會員預約表單 (只剩下選時間) -->
    <form v-else @submit.prevent="submitBooking" class="bg-white p-8 rounded-2xl shadow-sm border border-[#C7CDCE] space-y-6">
      
      <!-- 錯誤提示 -->
      <div v-if="status === 'error'" class="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-4">
        {{ errorMessage }}
      </div>

      <!-- 區塊一：預約時間 -->
      <div>
        <h3 class="text-lg font-bold text-[#154337] mb-4 border-b pb-2">選擇時間</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">預約日期 <span class="text-red-500">*</span></label>
            <input v-model="formData.date" type="date" required 
                   class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#154337] focus:border-transparent" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">預約時段 <span class="text-red-500">*</span></label>
            <select v-model="formData.time" required 
                    class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#154337] focus:border-transparent">
              <option value="" disabled>選擇時段 (10:00 - 22:00)</option>
              <option value="10:00">10:00</option>
              <option value="13:00">13:00</option>
              <option value="16:00">16:00</option>
              <option value="19:00">19:00</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 送出按鈕 -->
      <button type="submit" :disabled="status === 'loading'"
              class="w-full bg-[#154337] text-[#FAF4EE] font-bold text-lg py-4 rounded-xl hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
        <Icon v-if="status === 'loading'" name="mdi:loading" class="animate-spin" size="24" />
        <span v-if="status === 'loading'">處理中...</span>
        <span v-else>確認預約</span>
      </button>

    </form>
  </div>
</template>