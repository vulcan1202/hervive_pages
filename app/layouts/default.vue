<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const { $liff } = useNuxtApp() 

const isMenuOpen = ref(false)
const currentUser = ref<any>(null)
const route = useRoute()

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
  
  if ($liff && $liff.isInClient()) {
    isLiffMode.value = true
  }
})

watch(() => route.path, () => {
  checkLoginStatus()
})
</script>

<template>
  <div :class="['min-h-screen flex flex-col font-sans bg-[#FAF4EE]', isLiffMode ? (route.path === '/booking' ? 'pb-[145px]' : 'pb-[75px]') : '']">

    <!-- 一般網頁版 Header - 懸浮精品膠囊導覽列 -->
    <header v-if="!isLiffMode" class="sticky top-3 sm:top-4 z-50 px-3 sm:px-6">
      <div class="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-[#C5A880]/30 shadow-[0_8px_30px_rgba(21,67,55,0.06)] rounded-full px-5 sm:px-8 h-16 sm:h-18 flex items-center justify-between transition-all duration-300">
        
        <div class="flex items-center gap-8 lg:gap-12">
          <NuxtLink to="/" class="group flex items-center gap-2" @click="closeMenu">
            <img src="/logo.png" alt="HERVIVE STUDIO Logo" class="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105" />
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium text-gray-600 tracking-wider">
            <NuxtLink to="/" active-class="text-[#154337] font-semibold" class="hover:text-[#154337] transition py-1 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-[#C5A880] after:transition-all hover:after:w-full">首頁</NuxtLink>
            <NuxtLink to="/services" active-class="text-[#154337] font-semibold" class="hover:text-[#154337] transition py-1 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-[#C5A880] after:transition-all hover:after:w-full">服務項目</NuxtLink>
            <NuxtLink to="/about" active-class="text-[#154337] font-semibold" class="hover:text-[#154337] transition py-1 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-[#C5A880] after:transition-all hover:after:w-full">關於我們</NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-3 sm:gap-5">
          <NuxtLink v-if="!currentUser" to="/login" class="hidden md:block text-gray-500 hover:text-[#154337] text-xs sm:text-sm font-medium transition-colors tracking-wider px-2">
            登入
          </NuxtLink>
          <NuxtLink v-else to="/member" class="hidden md:flex text-[#154337] hover:text-opacity-80 text-xs sm:text-sm font-medium transition-colors items-center gap-1.5 tracking-wider px-2">
            <Icon name="mdi:account-circle-outline" size="20" class="text-[#C5A880]"/> 會員中心
          </NuxtLink>

          <!-- 嵌套按鈕 Button-in-Button -->
          <NuxtLink to="/booking" class="hidden md:inline-flex bg-[#154337] text-[#FAF4EE] pl-5 pr-2 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-[#0D2C24] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 items-center gap-2 group border border-[#C5A880]/30">
            <span>立即預約</span>
            <span class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-[#FAF4EE] group-hover:translate-x-0.5 transition-transform">
              <Icon name="mdi:arrow-right" size="14" />
            </span>
          </NuxtLink>

          <button class="md:hidden text-[#154337] p-2 focus:outline-none" @click="isMenuOpen = !isMenuOpen" aria-label="選單">
            <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" size="26" />
          </button>
        </div>
      </div>

      <!-- 行動裝置浮動選單 -->
      <transition name="fade">
        <div v-if="isMenuOpen" class="md:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-[#C5A880]/30 shadow-2xl rounded-3xl z-40 overflow-hidden">
          <nav class="flex flex-col p-6 space-y-4 text-center">
            <NuxtLink to="/" class="text-[#154337] text-base font-medium py-2.5 border-b border-gray-100" active-class="font-bold text-[#C5A880]" @click="closeMenu">首頁</NuxtLink>
            <NuxtLink to="/services" class="text-[#154337] text-base font-medium py-2.5 border-b border-gray-100" active-class="font-bold text-[#C5A880]" @click="closeMenu">服務項目</NuxtLink>
            <NuxtLink to="/about" class="text-[#154337] text-base font-medium py-2.5 border-b border-gray-100" active-class="font-bold text-[#C5A880]" @click="closeMenu">關於我們</NuxtLink>
            
            <NuxtLink v-if="!currentUser" to="/login" class="text-gray-500 text-base font-medium py-2" @click="closeMenu">
              登入 / 註冊
            </NuxtLink>
            <NuxtLink v-else to="/member" class="text-[#154337] text-base font-medium py-2 flex items-center justify-center gap-2" @click="closeMenu">
              <Icon name="mdi:account-circle-outline" size="22" class="text-[#C5A880]" /> 會員中心
            </NuxtLink>

            <NuxtLink to="/booking" class="bg-[#154337] text-[#FAF4EE] text-base font-medium py-3 rounded-full mt-2 hover:bg-[#0D2C24] transition-all shadow-md flex items-center justify-center gap-2" @click="closeMenu">
              <span>立即預約</span>
              <Icon name="mdi:calendar-check" size="20" />
            </NuxtLink>
          </nav>
        </div>
      </transition>
    </header>

    <main class="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 md:py-12">
      <slot />
    </main>

    <!-- 一般網頁版 Footer -->
    <footer v-if="!isLiffMode" class="bg-[#154337] text-[#FAF4EE] pt-14 pb-10 text-center text-sm relative overflow-hidden border-t border-[#C5A880]/30 mt-12">
      <!-- 柔光幾何裝飾 -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 space-y-6">
        <div class="space-y-2">
          <span class="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] bg-white/10 text-[#C5A880] border border-[#C5A880]/20 font-medium">專屬於你的美好時光</span>
          <h4 class="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.3em] text-[#FAF4EE]">HERVIVE STUDIO</h4>
        </div>

        <p class="opacity-80 text-xs sm:text-sm tracking-widest max-w-md mx-auto font-light">
          妳的「肌膚專屬療癒所」客製化專業美容護膚
        </p>

        <div class="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent mx-auto my-6"></div>

        <p class="text-[11px] text-[#FAF4EE]/50 tracking-wider">
          © {{ new Date().getFullYear() }} HERVIVE STUDIO. All rights reserved.
        </p>
      </div>
    </footer>

    <!-- LIFF 底部導覽列 (固定 60px 高度，與 booking 頁面的確認 Bar 無縫精密貼合) -->
    <div v-if="isLiffMode" class="fixed bottom-0 left-0 right-0 h-[60px] bg-white/95 backdrop-blur-xl border-t border-[#C5A880]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-50 px-8 flex justify-around items-center pb-[env(safe-area-inset-bottom)]">
      <NuxtLink to="/booking" class="flex flex-col items-center text-gray-400 hover:text-[#154337] transition-colors group relative">
        <Icon name="mdi:calendar-check" size="22" :class="[route.path === '/booking' ? 'text-[#154337] scale-110' : 'text-gray-400', 'transition-transform']" />
        <span :class="['text-[11px] mt-0.5 font-medium tracking-wider', route.path === '/booking' ? 'text-[#154337] font-bold' : 'text-gray-500']">線上預約</span>
      </NuxtLink>
      
      <NuxtLink to="/member" class="flex flex-col items-center text-gray-400 hover:text-[#154337] transition-colors group relative">
        <Icon name="mdi:account-circle-outline" size="22" :class="[route.path === '/member' ? 'text-[#154337] scale-110' : 'text-gray-400', 'transition-transform']" />
        <span :class="['text-[11px] mt-0.5 font-medium tracking-wider', route.path === '/member' ? 'text-[#154337] font-bold' : 'text-gray-500']">會員中心</span>
      </NuxtLink>
    </div>

  </div>
</template>

<style>
/* 選單淡入動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>