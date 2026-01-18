<script setup>
import { ref } from 'vue'

// 控制載入畫面的顯示狀態
const isLoading = ref(true)

// 當 Load 組件發出 'finished' 通知時，執行此函式
const handleLoadFinish = () => {
  isLoading.value = false
}
</script>

<template>
  <div class="antialiased min-h-screen bg-[#FAF4EE]">

    <Transition name="fade-overlay">
      <Load v-if="isLoading" @finished="handleLoadFinish" />
    </Transition>

    <div
      class="transition-opacity duration-1000 ease-in-out"
      :class="isLoading ? 'opacity-0' : 'opacity-100'"
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
  font-family: 'Noto Sans TC', sans-serif; /* 確保字體一致 */
}

/* 載入畫面消失的淡出動畫設定 */
.fade-overlay-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-overlay-leave-to {
  opacity: 0;
}
</style>