<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// 1. 設定選單開關狀態
const isMenuOpen = ref(false)

// 2. 儲存當前使用者狀態
const currentUser = ref<any>(null)
const route = useRoute()

const closeMenu = () => {
  isMenuOpen.value = false
}

// 3. 檢查登入狀態的函式
const checkLoginStatus = () => {
  // 確保在瀏覽器環境執行 (避免 Nuxt SSR 報錯)
  if (process.client) {
    const storedUser = localStorage.getItem('hervive_user')
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser)
    } else {
      currentUser.value = null
    }
  }
}

// 畫面初次載入時檢查
onMounted(() => {
  checkLoginStatus()
})

// 🌟 關鍵邏輯：當使用者切換頁面（例如登入成功跳轉）時，重新檢查登入狀態
watch(() => route.path, () => {
  checkLoginStatus()
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans bg-[#FAF4EE]">

    <header class="border-b border-[#C7CDCE] bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
<div class="flex items-center gap-10">
          <NuxtLink to="/" class="group flex items-center gap-2" @click="closeMenu">
            <img src="/logo.jpg" alt="HERVIVE STUDIO Logo" class="h-10 w-auto object-contain" />
          </NuxtLink>

          <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-500">
            <NuxtLink to="/" active-class="text-[#154337] font-bold" class="hover:text-[#C7CDCE] transition py-2">首頁</NuxtLink>
            <NuxtLink to="/services" active-class="text-[#154337] font-bold" class="hover:text-[#C7CDCE] transition py-2">服務項目</NuxtLink>
            <NuxtLink to="/about" active-class="text-[#154337] font-bold" class="hover:text-[#C7CDCE] transition py-2">關於我們</NuxtLink>
          </nav>
        </div>

        <!-- 右側：會員狀態與預約按鈕 -->
        <div class="flex items-center gap-4">
          
          <!-- 桌機版：動態登入 / 會員中心按鈕 -->
          <NuxtLink v-if="!currentUser" to="/login" class="hidden md:block text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors">
            登入
          </NuxtLink>
          <NuxtLink class="hidden md:flex text-[#154337] hover:text-opacity-70 text-sm font-bold transition-colors items-center gap-1" to="/member" v-else>
        <Icon name="mdi:account-circle" size="20"/> 會員中心
      </NuxtLink>

          <!-- 桌機版：立即預約按鈕 -->
          <NuxtLink to="/booking" class="hidden md:block bg-[#154337] text-[#FAF4EE] px-6 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all shadow-sm">
            立即預約
          </NuxtLink>

          <!-- 手機版：漢堡選單按鈕 -->
          <button class="md:hidden text-[#154337] p-2" @click="isMenuOpen = !isMenuOpen">
            <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" size="28" />
          </button>
        </div>
      </div>

      <!-- 手機版下拉選單 -->
      <transition name="fade">
        <div v-if="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-[#C7CDCE] shadow-xl z-40">
          <nav class="flex flex-col p-6 space-y-4 text-center">
            <NuxtLink to="/" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100" active-class="font-bold" @click="closeMenu">首頁</NuxtLink>
            <NuxtLink to="/services" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100" active-class="font-bold" @click="closeMenu">服務項目</NuxtLink>
            <NuxtLink to="/about" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100" active-class="font-bold" @click="closeMenu">關於我們</NuxtLink>
            
            <!-- 手機版：動態登入 / 會員中心按鈕 -->
            <NuxtLink v-if="!currentUser" to="/login" class="text-gray-400 text-lg font-medium py-2" @click="closeMenu">
              登入 / 註冊
            </NuxtLink>
            <NuxtLink v-else to="/member" class="text-[#154337] text-lg font-bold py-2 flex items-center justify-center gap-2" @click="closeMenu">
              <Icon name="mdi:account-circle" size="24" /> 會員中心
            </NuxtLink>

            <!-- 手機版預約按鈕 -->
            <NuxtLink to="/booking" class="bg-[#154337] text-[#FAF4EE] text-lg font-bold py-3 rounded-full mt-2 hover:bg-opacity-90 transition-all shadow-sm" @click="closeMenu">
              立即預約
            </NuxtLink>
          </nav>
        </div>
      </transition>
    </header>

    <div class="w-full h-5 bg-[#154337]"></div>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-[#154337] text-[#FAF4EE] py-12 text-center text-sm relative overflow-hidden">
        <div class="relative z-10 container mx-auto px-4 space-y-4">
            <h4 class="title-serif text-lg font-bold tracking-widest text-[#C7CDCE]">HERVIVE STUDIO</h4>
            <p class="opacity-80 text-xs">妳的「肌膚專屬療癒所」客製化專業美容護膚</p>
        </div>
    </footer>
  </div>
</template>

<style>
/* 選單淡入動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>