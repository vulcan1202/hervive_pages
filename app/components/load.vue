<script setup>
import { ref, onMounted } from 'vue'

// 定義事件：當進度跑完時，通知外層 (app.vue)
const emit = defineEmits(['finished'])

const progress = ref(0)

onMounted(() => {
  // 設定載入總時間 (例如 2.5 秒)
  const duration = 2500
  const intervalTime = 50 // 每 50ms 更新一次

  const timer = setInterval(() => {
    if (progress.value < 100) {
      // 模擬真實載入：每次增加隨機的 % 數，讓跑條看起來自然
      const increment = (100 / (duration / intervalTime)) + (Math.random() * 2)
      progress.value = Math.min(progress.value + increment, 100)
    } else {
      clearInterval(timer)
      // 100% 後稍微停頓 0.5 秒，讓眼睛適應，再觸發結束
      setTimeout(() => {
        emit('finished')
      }, 500)
    }
  }, intervalTime)
})
</script>

<template>
  <div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF4EE] overflow-hidden">
    <!-- 背景奢華光暈飾板 -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#154337]/5 via-[#C5A880]/10 to-transparent blur-3xl"></div>
    </div>

    <!-- 載入外框結構 -->
    <div class="relative flex flex-col items-center w-full max-w-[280px] sm:max-w-[340px] px-8 py-10 rounded-[2.25rem] bg-white/70 border border-[#C5A880]/30 shadow-[0_24px_60px_rgba(21,67,55,0.08)] backdrop-blur-xl">
      <div class="relative p-4 mb-6 rounded-2xl bg-white border border-[#154337]/10 shadow-sm">
        <img
          src="/load/load.png"
          alt="HERVIVE STUDIO Loading..."
          class="w-full h-auto max-h-[64px] sm:max-h-[76px] object-contain animate-fade-up opacity-0"
        />
      </div>

      <!-- 金屬滑軌進度條 -->
      <div class="w-full h-[4px] bg-[#154337]/10 relative overflow-hidden rounded-full p-[0.5px] border border-[#C5A880]/20">
        <div
          class="h-full bg-gradient-to-r from-[#154337] via-[#2A6656] to-[#C5A880] transition-all duration-100 ease-out rounded-full shadow-[0_0_12px_rgba(197,168,128,0.5)]"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <div class="mt-4 flex items-center justify-between w-full text-[10px] tracking-[0.25em] font-medium uppercase font-mono">
        <span class="text-[#C5A880] font-serif-luxury tracking-widest font-semibold">HERVIVE STUDIO</span>
        <span class="text-[#154337]/70">{{ Math.floor(progress) }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Logo 優雅進場動畫 */
.animate-fade-up {
  animation: fadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>