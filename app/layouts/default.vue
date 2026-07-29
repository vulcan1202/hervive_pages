<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// 🌟 1. 引入 useNuxtApp 來取得我們寫好的 liff 插件
const { $liff } = useNuxtApp() 

const isMenuOpen = ref(false)
const currentUser = ref<any>(null)
const route = useRoute()

// 🌟 2. 建立 LIFF 模式狀態
const isLiffMode = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}

const checkLoginStatus = () => {
  if (process.client) {
    const storedUser = localStorage.getItem('hervive_user')
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser)
    } else {
      currentUser.value = null
    }
  }
}

onMounted(() => {
  checkLoginStatus()
  
  // 🌟 3. 檢查是否在 LINE LIFF 環境中
  if ($liff && $liff.isInClient()) {
    isLiffMode.value = true
  }
})

watch(() => route.path, () => {
  checkLoginStatus()
})
</script>

<template>
  <!-- 🌟 4. 動態調整底部邊距：如果在 LIFF 模式，底部預留空間給固定選單以免擋住內容 -->
  <div :class="['min-h-screen min-h-[100dvh] flex flex-col font-sans bg-[#FAF4EE]', isLiffMode ? 'pb-[calc(var(--liff-nav-h)+env(safe-area-inset-bottom))]' : '']">

    <!-- 🌟 5. 一般網頁版才顯示的 Header -->
    <header v-if="!isLiffMode" class="border-b border-[#C7CDCE] bg-white/95 backdrop-blur-sm sticky top-0 z-50">
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

        <div class="flex items-center gap-4">
          <NuxtLink v-if="!currentUser" to="/login" class="hidden md:block text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors">
            登入
          </NuxtLink>
          <NuxtLink class="hidden md:flex text-[#154337] hover:text-opacity-70 text-sm font-bold transition-colors items-center gap-1" to="/member" v-else>
            <Icon name="mdi:account-circle" size="20"/> 會員中心
          </NuxtLink>

          <NuxtLink to="/booking" class="hidden md:block bg-[#154337] text-[#FAF4EE] px-6 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all shadow-sm">
            立即預約
          </NuxtLink>

          <button class="md:hidden text-[#154337] p-2" @click="isMenuOpen = !isMenuOpen">
            <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" size="28" />
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-if="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-[#C7CDCE] shadow-xl z-40">
          <nav class="flex flex-col p-6 space-y-4 text-center">
            <NuxtLink to="/" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100" active-class="font-bold" @click="closeMenu">首頁</NuxtLink>
            <NuxtLink to="/services" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100" active-class="font-bold" @click="closeMenu">服務項目</NuxtLink>
            <NuxtLink to="/about" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100" active-class="font-bold" @click="closeMenu">關於我們</NuxtLink>
            
            <NuxtLink v-if="!currentUser" to="/login" class="text-gray-400 text-lg font-medium py-2" @click="closeMenu">
              登入 / 註冊
            </NuxtLink>
            <NuxtLink v-else to="/member" class="text-[#154337] text-lg font-bold py-2 flex items-center justify-center gap-2" @click="closeMenu">
              <Icon name="mdi:account-circle" size="24" /> 會員中心
            </NuxtLink>

            <NuxtLink to="/booking" class="bg-[#154337] text-[#FAF4EE] text-lg font-bold py-3 rounded-full mt-2 hover:bg-opacity-90 transition-all shadow-sm" @click="closeMenu">
              立即預約
            </NuxtLink>
          </nav>
        </div>
      </transition>
    </header>

    <!-- 🌟 一般網頁版才顯示的裝飾線 -->
    <div v-if="!isLiffMode" class="w-full h-5 bg-[#154337]"></div>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- 🌟 一般網頁版才顯示的 Footer -->
    <footer v-if="!isLiffMode" class="bg-[#154337] text-[#FAF4EE] py-12 text-center text-sm relative overflow-hidden">
        <div class="relative z-10 container mx-auto px-4 space-y-4">
            <h4 class="title-serif text-lg font-bold tracking-widest text-[#C7CDCE]">HERVIVE STUDIO</h4>
            <p class="opacity-80 text-xs">妳的「肌膚專屬療癒所」客製化專業美容護膚</p>
        </div>
    </footer>

    <!-- 🌟 6. LIFF 專屬的底部導覽列 (僅在 LINE 中顯示) -->
    <div
      v-if="isLiffMode"
      class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50 px-6 py-3 flex justify-around items-center pb-[env(safe-area-inset-bottom)] [transform:translateZ(0)] [will-change:transform] [backface-visibility:hidden]"
    >
      
      <NuxtLink to="/booking" active-class="text-[#154337]" class="flex flex-col items-center text-gray-400 hover:text-[#154337] transition-colors">
        <Icon name="mdi:calendar-check" size="24" />
        <span class="text-xs mt-1 font-medium">預約</span>
      </NuxtLink>
      
      <NuxtLink to="/member" active-class="text-[#154337]" class="flex flex-col items-center text-gray-400 hover:text-[#154337] transition-colors">
        <Icon name="mdi:account" size="24" />
        <span class="text-xs mt-1 font-medium">會員</span>
      </NuxtLink>
      
    </div>

  </div>
</template>

<style>
/* 🌟 LIFF 底部導覽列高度，供本檔案與 booking.vue 共用同一數值，
   避免手機端上下滑動時，因兩處各自寫死不同 px 數字造成「確認預約」浮動列
   與底部導覽列對不齊（出現縫隙露出內容，或反過來互相遮擋）的問題 */
:root {
  --liff-nav-h: 64px;
}

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