<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['finished'])
const progress = ref(0)

onMounted(() => {
  // 輕量優雅的首次進場過渡 (約 500ms)，避免長時間阻礙使用者操作
  const duration = 500
  const intervalTime = 20

  const timer = setInterval(() => {
    if (progress.value < 100) {
      const increment = (100 / (duration / intervalTime)) + (Math.random() * 4)
      progress.value = Math.min(progress.value + increment, 100)
    } else {
      clearInterval(timer)
      setTimeout(() => {
        emit('finished')
      }, 150)
    }
  }, intervalTime)
})
</script>

<template>
  <div
    class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF4EE] overflow-hidden"
    style="position: fixed; inset: 0; width: 100vw; height: 100vh; background-color: #FAF4EE; z-index: 99999; display: flex; align-items: center; justify-content: center;"
  >
    <!-- 背景奢華光暈飾板 -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#154337]/5 via-[#C5A880]/10 to-transparent blur-3xl"></div>
    </div>

    <!-- 載入外框結構 -->
    <div class="relative flex flex-col items-center w-full max-w-[280px] sm:max-w-[320px] px-8 py-8 rounded-[2rem] bg-white/70 border border-[#C5A880]/30 shadow-[0_24px_60px_rgba(21,67,55,0.08)] backdrop-blur-xl">
      <div class="relative p-3 mb-5 rounded-2xl bg-white border border-[#154337]/10 shadow-xs">
        <img
          src="/load/load.png"
          alt="HERVIVE STUDIO Loading..."
          class="w-full h-auto max-h-[56px] sm:max-h-[64px] object-contain animate-fade-up opacity-0"
        />
      </div>

      <!-- 金屬滑軌進度條 -->
      <div class="w-full h-[3px] bg-[#154337]/10 relative overflow-hidden rounded-full p-[0.5px] border border-[#C5A880]/20">
        <div
          class="h-full bg-gradient-to-r from-[#154337] via-[#2A6656] to-[#C5A880] transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_rgba(197,168,128,0.5)]"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <div class="mt-3 flex items-center justify-between w-full text-[11px] tracking-[0.25em] font-medium uppercase font-mono">
        <span class="text-[#8A6A3B] font-serif-luxury tracking-widest font-semibold">HERVIVE STUDIO</span>
        <span class="text-[#154337]/70">{{ Math.floor(progress) }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
