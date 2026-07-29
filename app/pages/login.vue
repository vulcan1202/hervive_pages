<script setup lang="ts">
// 台灣 22 縣市清單
const locationOptions = [
  '基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣',
  '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '台南市',
  '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣',
  '其他'
]
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { $liff } = useNuxtApp() 

const route = useRoute()
const router = useRouter()
const isLoginMode = ref(true)
const config = useRuntimeConfig()

const loginForm = reactive({ phone: '', password: '' })
const registerForm = reactive({
  lastName: '',
  firstName: '',
  phone: '',
  password: '',
  gender: '',
  dateOfBirth: '',
  location: '', // 🌟 新增可選欄位
  email: '',
  lineId: '' 
})

// 生日專用 Date 物件
const dobDateObj = ref<Date | null>(null)
const maxDobDate = computed(() => new Date()) //限制生日不能超過今天

// 當選擇生日時，格式化為 YYYY-MM-DD 字串
watch(dobDateObj, (newVal) => {
  if (newVal) {
    const yyyy = newVal.getFullYear()
    const mm = String(newVal.getMonth() + 1).padStart(2, '0')
    const dd = String(newVal.getDate()).padStart(2, '0')
    registerForm.dateOfBirth = `${yyyy}-${mm}-${dd}`
  } else {
    registerForm.dateOfBirth = ''
  }
})

const status = ref('idle') 
const errorMessage = ref('')
const infoMessage = ref('')
const successMessage = ref('')

const backendUrl = config.public.backendUrl
const LINE_CHANNEL_ID = config.public.lineChannelId
const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/login` : ''

const handleLineLogin = async () => {
  const targetPath = route.query.redirect ? String(route.query.redirect) : '/member'
  
  if ($liff && $liff.isInClient()) {
    if (!$liff.isLoggedIn()) {
      $liff.login({ redirectUri: window.location.href })
      return
    }
    try {
      status.value = 'loading'
      const profile = await $liff.getProfile()
      await processLineUser(profile.userId, targetPath)
    } catch (err) {
      errorMessage.value = '讀取 LINE 資料失敗，請重試'
      status.value = 'error'
    }
    return
  }

  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CHANNEL_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(targetPath)}&bot_prompt=normal&scope=profile%20openid`
  window.location.href = lineAuthUrl
}

const processLineUser = async (lineId: string, actionRedirect: string) => {
  try {
    status.value = 'loading'
    
    const res = await fetch(`${backendUrl}/api/liff-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line_id: lineId })
    })
    const data = await res.json()
    
    if (!res.ok) throw new Error(data.error || 'LINE 驗證失敗')

    if (data.action === 'login') {
      localStorage.setItem('hervive_user', JSON.stringify(data.user))
      status.value = 'success'
      successMessage.value = 'LINE 登入成功！正在跳轉...'
      router.push(actionRedirect)
    } else if (data.action === 'require_register') {
      isLoginMode.value = false
      registerForm.lineId = data.line_id
      status.value = 'idle'
      infoMessage.value = '✅ LINE 授權成功！若您是新朋友請填寫資料；若已有帳號請切換上方「會員登入」。'
      router.replace({ path: '/login', query: route.query }) 
    }
  } catch (error: any) {
    status.value = 'error'
    errorMessage.value = error.message
    router.replace({ path: '/login', query: route.query })
  }
}

onMounted(async () => {
  const targetPath = route.query.redirect ? String(route.query.redirect) : '/member'
  const state = route.query.state ? String(route.query.state) : targetPath

  if ($liff && $liff.isInClient()) {
    try {
      if (!$liff.isLoggedIn()) {
        $liff.login({ redirectUri: window.location.href })
        return
      }
      
      const profile = await $liff.getProfile()
      infoMessage.value = '正在為您確認會員狀態...'
      await processLineUser(profile.userId, state)

    } catch (err) {
      console.error('LIFF 處理失敗', err)
      errorMessage.value = 'LINE 自動連線失敗，請嘗試手動登入。'
    }
    return 
  }

  const code = route.query.code
  if (code) {
    status.value = 'loading'
    try {
      const res = await fetch(`${backendUrl}/api/line-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, redirectUri: redirectUri })
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || 'LINE 驗證失敗')

      if (data.action === 'login') {
        localStorage.setItem('hervive_user', JSON.stringify(data.user))
        status.value = 'success'
        successMessage.value = 'LINE 登入成功！正在跳轉...'
        router.push(state)
      } else if (data.action === 'require_register') {
        isLoginMode.value = false
        registerForm.lineId = data.line_id
        status.value = 'idle'
        infoMessage.value = '✅ LINE 授權成功！若您是新朋友請填寫資料；若已有帳號請切換上方「會員登入」。'
        router.replace({ path: '/login', query: route.query })
      }
    } catch (error: any) {
      status.value = 'error'
      errorMessage.value = error.message
      router.replace({ path: '/login', query: route.query })
    }
  }
})

const handleSubmit = async () => {
  status.value = 'loading'
  errorMessage.value = ''
  infoMessage.value = ''

  try {
    if (isLoginMode.value) {
      const res = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginForm.phone, password: loginForm.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '登入失敗')
      
      localStorage.setItem('hervive_user', JSON.stringify(data.user))
      status.value = 'success'
      successMessage.value = '登入成功！正在跳轉...'
      const redirectPath = route.query.redirect ? String(route.query.redirect) : '/member'
      navigateTo(redirectPath)
    } else {
      if (!registerForm.lineId) {
        throw new Error('請先完成 LINE 授權！')
      }

      // 🌟 前端欄位檢查
      if (!registerForm.dateOfBirth) {
        throw new Error('請選擇生日！')
      }

      const res = await fetch(`${backendUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          last_name: registerForm.lastName,
          first_name: registerForm.firstName,
          phone: registerForm.phone,
          password: registerForm.password,
          gender: registerForm.gender,
          date_of_birth: registerForm.dateOfBirth, // 🌟 新增傳送生日
          location: registerForm.location, // 🌟 新增傳送居住地區
          email: registerForm.email,
          line_id: registerForm.lineId
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '註冊失敗')
      
      status.value = 'success'
      successMessage.value = '註冊成功！系統將自動為您登入...'
      
      const targetPath = route.query.redirect ? String(route.query.redirect) : '/member'
      await processLineUser(registerForm.lineId, targetPath)
    }
  } catch (error: any) {
    status.value = 'error'
    errorMessage.value = error.message || '發生錯誤，請稍後再試。'
  }
}

const switchMode = (mode: boolean) => {
  isLoginMode.value = mode
  status.value = 'idle'
  errorMessage.value = ''
  infoMessage.value = ''
  successMessage.value = ''
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
    <div class="bg-white max-w-md w-full rounded-2xl shadow-sm border border-[#C7CDCE] overflow-hidden">
      
      <div class="flex border-b border-[#C7CDCE]">
        <button @click="switchMode(true)" :class="['flex-1 py-4 text-center font-bold transition', isLoginMode ? 'text-[#154337] border-b-2 border-[#154337]' : 'text-gray-400 hover:text-gray-600']">
          會員登入
        </button>
        <button @click="switchMode(false)" :class="['flex-1 py-4 text-center font-bold transition', !isLoginMode ? 'text-[#154337] border-b-2 border-[#154337]' : 'text-gray-400 hover:text-gray-600']">
          註冊新會員
        </button>
      </div>

      <div class="p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-[#154337] title-serif">{{ isLoginMode ? '歡迎回來' : '加入 HERVIVE' }}</h2>
          <p class="text-gray-500 text-sm mt-2">{{ isLoginMode ? '請登入以預約您的專屬管理' : '請先完成 LINE 驗證，並填寫會員資料' }}</p>
        </div>

        <div v-if="status === 'error'" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
          {{ errorMessage }}
        </div>
        <div v-if="infoMessage" class="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm mb-6 text-center font-medium border border-blue-100">
          {{ infoMessage }}
        </div>
        <div v-if="status === 'success'" class="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-6 text-center">
          {{ successMessage }}
        </div>

        <div v-if="isLoginMode" class="mb-6">
          <button @click="handleLineLogin" type="button" class="w-full bg-[#06C755] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition flex justify-center items-center gap-2 shadow-sm">
            <Icon name="mdi:line" size="24" />
            <span>使用 LINE 快速登入</span>
          </button>
          
          <div class="flex items-center my-6">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="px-3 text-sm text-gray-400">或使用手機登入</span>
            <div class="flex-grow border-t border-gray-200"></div>
          </div>
        </div>

        <div v-else-if="!registerForm.lineId" class="mb-6 text-center bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
          <p class="text-sm text-gray-600 mb-4">本系統採 LINE 帳號綁定制，請先進行驗證：</p>
          <button @click="handleLineLogin" type="button" class="w-full bg-[#06C755] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition flex justify-center items-center gap-2 shadow-sm">
            <Icon name="mdi:line" size="24" />
            <span>使用 LINE 進行驗證與註冊</span>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          
          <template v-if="!isLoginMode && registerForm.lineId">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-sm font-medium text-gray-700">姓氏 <span class="text-red-500">*</span></label>
                <input v-model="registerForm.lastName" type="text" required class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" placeholder="例如：林" />
              </div>
              <div class="space-y-1">
                <label class="text-sm font-medium text-gray-700">名字 <span class="text-red-500">*</span></label>
                <input v-model="registerForm.firstName" type="text" required class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" placeholder="例如：小美" />
              </div>
            </div>

            <!-- 性別 -->
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">性別 <span class="text-red-500">*</span></label>
              <select v-model="registerForm.gender" required class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]">
                <option value="" disabled>請選擇</option>
                <option value="female">女</option>
                <option value="male">男</option>
                <option value="other">其他</option>
              </select>
            </div>

            <!-- 🌟 2. 新增出生日期 (Date of Birth) -->
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">出生日期 <span class="text-red-500">*</span></label>
              <ClientOnly>
                <MyCalendar 
                  v-model="dobDateObj" 
                  :max-date="maxDobDate"
                  placeholder="點擊選擇出生日期" 
                />
              </ClientOnly>
            </div>

            <!-- 電子信箱 -->
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">電子信箱</label>
              <input v-model="registerForm.email" type="email" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" placeholder="example@mail.com" />
            </div>
            <!-- 🌟 居住地區/來自哪裡 (下拉選單 - 選填) -->
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">來自哪裡 <span class="text-gray-400 text-xs">(選填)</span></label>
              <select v-model="registerForm.location" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337] bg-white">
                <option value="">請選擇縣市</option>
                <option v-for="loc in locationOptions" :key="loc" :value="loc">{{ loc }}</option>
              </select>
            </div>
          </template>

          <template v-if="isLoginMode">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">手機號碼 <span class="text-red-500">*</span></label>
              <input v-model="loginForm.phone" type="tel" required pattern="[0-9]{10}" placeholder="例如：0912345678" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">密碼 <span class="text-red-500">*</span></label>
              <input v-model="loginForm.password" type="password" required placeholder="請輸入密碼" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" />
            </div>
          </template>

          <template v-if="!isLoginMode && registerForm.lineId">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">手機號碼 <span class="text-red-500">*</span></label>
              <input v-model="registerForm.phone" type="tel" required pattern="[0-9]{10}" placeholder="例如：0912345678" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">設定密碼 <span class="text-red-500">*</span></label>
              <input v-model="registerForm.password" type="password" required placeholder="請包含至少一個英文與數字" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" />
            </div>

            <button type="submit" :disabled="status === 'loading'" class="w-full bg-[#154337] text-[#FAF4EE] font-bold py-3 rounded-xl hover:bg-opacity-90 transition mt-4 flex justify-center items-center gap-2 disabled:opacity-50">
              <Icon v-if="status === 'loading'" name="mdi:loading" class="animate-spin" size="20" />
              <span>{{ status === 'loading' ? '處理中...' : '完成註冊並綁定' }}</span>
            </button>
          </template>

          <button v-if="isLoginMode" type="submit" :disabled="status === 'loading'" class="w-full bg-[#154337] text-[#FAF4EE] font-bold py-3 rounded-xl hover:bg-opacity-90 transition mt-4 flex justify-center items-center gap-2 disabled:opacity-50">
            <Icon v-if="status === 'loading'" name="mdi:loading" class="animate-spin" size="20" />
            <span>{{ status === 'loading' ? '處理中...' : '登入' }}</span>
          </button>

        </form>
      </div>
    </div>
  </div>
</template>