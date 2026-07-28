<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { $liff } = useNuxtApp() 

const route = useRoute()
const router = useRouter()
const isLoginMode = ref(true)
const config = useRuntimeConfig()

const loginForm = reactive({ phone: '', password: '' })
const registerForm = reactive({
  lastName: '', firstName: '', phone: '', password: '', gender: '', email: '',
  lineId: '' 
})

const status = ref('idle') 
const errorMessage = ref('')
const infoMessage = ref('')
const successMessage = ref('')

const backendUrl = config.public.backendUrl
const LINE_CHANNEL_ID = config.public.lineChannelId
const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/login` : ''

// 🌟 1. 終極除錯版：帶有 alert 的按鈕邏輯
const handleLineLogin = async () => {
  const targetPath = route.query.redirect ? String(route.query.redirect) : '/member'
  
  alert('測試點 1：按鈕已成功點擊！')

  if ($liff) {
    try {
      alert('測試點 2：偵測到 liff，正在等待 ready...')
      await $liff.ready; 
      
      alert('測試點 3：liff 準備完畢！是否在 LINE 內: ' + $liff.isInClient())
      
      if ($liff.isInClient()) {
        
        if (!$liff.isLoggedIn()) {
          alert('測試點 4：在 LINE 內但未授權，呼叫 login()...')
          $liff.login({ redirectUri: window.location.href })
          return
        }
        
        alert('測試點 5：已登入！準備讀取使用者資料...')
        status.value = 'loading'
        const profile = await $liff.getProfile()
        
        alert('測試點 6：成功讀取！您的 LINE ID 是: ' + profile.userId)
        await processLineUser(profile.userId, targetPath)
        return 
      }
    } catch (err: any) {
      alert('🚨 發生嚴重錯誤：' + (err.message || String(err)))
      errorMessage.value = 'LIFF 錯誤: ' + (err.message || String(err))
      status.value = 'error'
      return 
    }
  } else {
    alert('🚨 警告：系統完全沒有偵測到 $liff 物件！')
  }

  alert('測試點 7：非 LIFF 環境，準備跳轉一般網頁版授權！')
  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CHANNEL_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(targetPath)}&bot_prompt=normal&scope=profile%20openid`
  window.location.href = lineAuthUrl
}

// 2. 共用邏輯
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
    alert('🚨 後端 API 錯誤：' + error.message)
    status.value = 'error'
    errorMessage.value = error.message
    router.replace({ path: '/login', query: route.query })
  }
}

// 3. 頁面載入時的「自動判斷分流」
onMounted(async () => {
  const targetPath = route.query.redirect ? String(route.query.redirect) : '/member'
  const state = route.query.state ? String(route.query.state) : targetPath

  if ($liff) {
    try {
      await $liff.ready; 
      
      if ($liff.isInClient()) {
        if (!$liff.isLoggedIn()) {
          $liff.login({ redirectUri: window.location.href })
          return
        }
        infoMessage.value = '正在為您確認會員狀態...'
        const profile = await $liff.getProfile()
        await processLineUser(profile.userId, state)
        return 
      }
    } catch (err: any) {
      console.error('LIFF 載入失敗', err)
      // 這裡不放 alert，避免一般網頁載入時一直跳視窗
    }
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

// 4. 傳統手機密碼表單送出
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

      const res = await fetch(`${backendUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          last_name: registerForm.lastName,
          first_name: registerForm.firstName,
          phone: registerForm.phone,
          password: registerForm.password,
          gender: registerForm.gender,
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
      
      <!-- 頂部切換頁籤 -->
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
          <p class="text-gray-500 text-sm mt-2">{{ isLoginMode ? '請登入以預約您的專屬療程' : '請先完成 LINE 驗證，並填寫會員資料' }}</p>
        </div>

        <!-- 提示訊息 -->
        <div v-if="status === 'error'" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
          {{ errorMessage }}
        </div>
        <div v-if="infoMessage" class="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm mb-6 text-center font-medium border border-blue-100">
          {{ infoMessage }}
        </div>
        <div v-if="status === 'success'" class="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-6 text-center">
          {{ successMessage }}
        </div>

        <!-- 登入模式的 LINE 按鈕 -->
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

        <!-- 註冊模式：如果還沒透過 LINE 授權進來，強制顯示 LINE 驗證按鈕 -->
        <div v-else-if="!registerForm.lineId" class="mb-6 text-center bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
          <p class="text-sm text-gray-600 mb-4">本系統採 LINE 帳號綁定制，請先進行驗證：</p>
          <button @click="handleLineLogin" type="button" class="w-full bg-[#06C755] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition flex justify-center items-center gap-2 shadow-sm">
            <Icon name="mdi:line" size="24" />
            <span>使用 LINE 進行驗證與註冊</span>
          </button>
        </div>

        <!-- 表單內容 -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          
          <!-- 註冊專屬欄位 (必須擁有 lineId 才會顯示) -->
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
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">性別 <span class="text-red-500">*</span></label>
              <select v-model="registerForm.gender" required class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]">
                <option value="" disabled>請選擇</option>
                <option value="female">女</option>
                <option value="male">男</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">電子信箱</label>
              <input v-model="registerForm.email" type="email" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" placeholder="example@mail.com" />
            </div>
          </template>

          <!-- 登入專屬欄位 -->
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

          <!-- 註冊專屬的密碼與手機欄位 (必須擁有 lineId 才會顯示) -->
          <template v-if="!isLoginMode && registerForm.lineId">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">手機號碼 <span class="text-red-500">*</span></label>
              <input v-model="registerForm.phone" type="tel" required pattern="[0-9]{10}" placeholder="例如：0912345678" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">設定密碼 <span class="text-red-500">*</span></label>
              <input v-model="registerForm.password" type="password" required placeholder="請包含至少一個英文與數字" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#154337]" />
            </div>

            <!-- 送出註冊按鈕 -->
            <button type="submit" :disabled="status === 'loading'" class="w-full bg-[#154337] text-[#FAF4EE] font-bold py-3 rounded-xl hover:bg-opacity-90 transition mt-4 flex justify-center items-center gap-2 disabled:opacity-50">
              <Icon v-if="status === 'loading'" name="mdi:loading" class="animate-spin" size="20" />
              <span>{{ status === 'loading' ? '處理中...' : '完成註冊並綁定' }}</span>
            </button>
          </template>

          <!-- 傳統登入按鈕 -->
          <button v-if="isLoginMode" type="submit" :disabled="status === 'loading'" class="w-full bg-[#154337] text-[#FAF4EE] font-bold py-3 rounded-xl hover:bg-opacity-90 transition mt-4 flex justify-center items-center gap-2 disabled:opacity-50">
            <Icon v-if="status === 'loading'" name="mdi:loading" class="animate-spin" size="20" />
            <span>{{ status === 'loading' ? '處理中...' : '登入' }}</span>
          </button>

        </form>
      </div>
    </div>
  </div>
</template>