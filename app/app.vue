<script setup>
import { ref, onMounted } from 'vue'

// 控制首次載入畫面的顯示狀態（預設 true 確保首屏遮罩，徹底杜絕無樣式 DOM 閃爍 FOUC）
const isLoading = ref(true)

onMounted(() => {
  if (process.client) {
    const hasLoaded = sessionStorage.getItem('hervive_initial_loaded')
    if (hasLoaded) {
      isLoading.value = false
    }
  }
})

const handleLoadFinish = () => {
  isLoading.value = false
  if (process.client) {
    sessionStorage.setItem('hervive_initial_loaded', 'true')
  }
}
</script>

<template>
  <div class="antialiased min-h-[100dvh] bg-[#FAF4EE] text-[#2D3748] selection:bg-[#154337] selection:text-[#FAF4EE] flex flex-col">

    <!-- 全域頂級 Toast 通知 -->
    <AppToast />

    <!-- 首次訪問輕量進場 -->
    <Transition name="fade-overlay">
      <Load v-if="isLoading" @finished="handleLoadFinish" />
    </Transition>

    <div
      class="transition-opacity duration-700 ease-out flex-grow flex flex-col"
      :class="isLoading ? 'fouc-hidden opacity-0 pointer-events-none' : 'opacity-100'"
      :style="isLoading ? 'opacity: 0 !important; visibility: hidden !important;' : 'opacity: 1; visibility: visible;'"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

  </div>
</template>

<style>
/* 全域設定 */
body {
  background-color: #FAF4EE;
  margin: 0;
  font-family: 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif;
  min-height: 100dvh;
}

/* 載入畫面消失的淡出動畫設定 */
.fade-overlay-leave-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-overlay-leave-to {
  opacity: 0;
}
</style>
