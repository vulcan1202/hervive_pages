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
  <div :class="['min-h-screen flex flex-col font-sans', isLiffMode ? 'pb-[70px]' : '']">

    <!-- 一般網頁版 Header -->
    <header v-if="!isLiffMode" class="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-[#e8e6e4] shadow-sm">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-10">
          <NuxtLink to="/" class="group flex items-center gap-2" @click="closeMenu">
            <img src="/logo.png" alt="HERVIVE STUDIO Logo" class="h-10 w-auto object-contain" />
          </NuxtLink>

          <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-500 tracking-wide">
            <NuxtLink to="/" active-class="text-[#154337] font-semibold" class="hover:text-[#154337] transition py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#154337] after:transition-all hover:after:w-full">首頁</NuxtLink>
            <NuxtLink to="/services" active-class="text-[#154337] font-semibold" class="hover:text-[#154337] transition py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#154337] after:transition-all hover:after:w-full">服務項目</NuxtLink>
            <NuxtLink to="/about" active-class="text-[#154337] font-semibold" class="hover:text-[#154337] transition py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#154337] after:transition-all hover:after:w-full">關於我們</NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink v-if="!currentUser" to="/login" class="hidden md:block text-gray-400 hover:text-[#154337] text-sm font-medium transition-colors tracking-wide">
            登入
          </NuxtLink>
          <NuxtLink class="hidden md:flex text-[#154337] hover:text-opacity-70 text-sm font-medium transition-colors items-center gap-1 tracking-wide" to="/member" v-else>
            <Icon name="mdi:account-circle" size="20"/> 會員中心
          </NuxtLink>

          <NuxtLink to="/booking" class="hidden md:block bg-[#154337] text-[#FAF4EE] px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            立即預約
          </NuxtLink>

          <button class="md:hidden text-[#154337] p-2" @click="isMenuOpen = !isMenuOpen">
            <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" size="28" />
          </button>
        </div>
      </div>

      <!-- 行動選單 -->
      <transition name="fade">
        <div v-if="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md border-b border-[#e8e6e4] shadow-lg z-40">
          <nav class="flex flex-col p-6 space-y-4 text-center">
            <NuxtLink to="/" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100/50" active-class="font-semibold" @click="closeMenu">首頁</NuxtLink>
            <NuxtLink to="/services" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100/50" active-class="font-semibold" @click="closeMenu">服務項目</NuxtLink>
            <NuxtLink to="/about" class="text-[#154337] text-lg font-medium py-2 border-b border-gray-100/50" active-class="font-semibold" @click="closeMenu">關於我們</NuxtLink>
            
            <NuxtLink v-if="!currentUser" to="/login" class="text-gray-400 text-lg font-medium py-2" @click="closeMenu">
              登入 / 註冊
            </NuxtLink>
            <NuxtLink v-else to="/member" class="text-[#154337] text-lg font-medium py-2 flex items-center justify-center gap-2" @click="closeMenu">
              <Icon name="mdi:account-circle" size="24" /> 會員中心
            </NuxtLink>

            <NuxtLink to="/booking" class="bg-[#154337] text-[#FAF4EE] text-lg font-medium py-3 rounded-full mt-2 hover:bg-opacity-90 transition-all shadow-md" @click="closeMenu">
              立即預約
            </NuxtLink>
          </nav>
        </div>
      </transition>
    </header>

    <!-- 裝飾線（更細膩） -->
    <div v-if="!isLiffMode" class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#154337]/20 to-transparent"></div>

    <main class="flex-grow container mx-auto px-4 py-10 md:py-14">
      <slot />
    </main>

    <!-- 一般網頁版 Footer -->
    <footer v-if="!isLiffMode" class="bg-[#154337] text-[#FAF4EE] pt-14 pb-10 text-center text-sm relative overflow-hidden border-t border-white/10">
        <div class="relative z-10 container mx-auto px-4 space-y-4">
            <h4 class="title-serif text-lg font-bold tracking-[0.3em] text-[#C7CDCE]">HERVIVE STUDIO</h4>
            <p class="opacity-70 text-xs tracking-wider">妳的「肌膚專屬療癒所」客製化專業美容護膚</p>
            <div class="w-12 h-[1px] bg-white/20 mx-auto mt-6"></div>
        </div>
    </footer>

    <!-- LIFF 底部導覽列（優化質感） -->
    <div v-if="isLiffMode" class="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-[#e8e6e4] shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 px-6 py-3 flex justify-around items-center pb-[env(safe-area-inset-bottom)]">
      
      <NuxtLink to="/booking" active-class="text-[#154337]" class="flex flex-col items-center text-gray-400 hover:text-[#154337] transition-colors group">
        <Icon name="mdi:calendar-check" size="24" class="group-hover:scale-110 transition-transform" />
        <span class="text-xs mt-1 font-medium tracking-wide">預約</span>
      </NuxtLink>
      
      <NuxtLink to="/member" active-class="text-[#154337]" class="flex flex-col items-center text-gray-400 hover:text-[#154337] transition-colors group">
        <Icon name="mdi:account" size="24" class="group-hover:scale-110 transition-transform" />
        <span class="text-xs mt-1 font-medium tracking-wide">會員</span>
      </NuxtLink>
      
    </div>

  </div>
</template>

<style>
/* 選單淡入動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 提升整體字感 */
body {
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 裝飾下劃線效果（已用 after 實現） */
</style>