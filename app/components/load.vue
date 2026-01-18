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
  <div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF4EE]">

    <div class="flex flex-col items-center w-full max-w-[240px] md:max-w-[300px]">
      <img
        src="/load/load.png"
        alt="Loading..."
        class="w-full h-auto mb-8 animate-fade-up opacity-0"
      />

      <div class="w-full h-[2px] bg-[#154337]/10 relative overflow-hidden rounded-full">
        <div
          class="absolute left-0 top-0 h-full bg-[#154337] transition-all duration-100 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <p class="mt-3 text-[10px] text-[#154337]/40 tracking-[0.3em] font-light font-mono">
        {{ Math.floor(progress) }}%
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Logo 優雅進場動畫 */
.animate-fade-up {
  animation: fadeUp 1s ease-out 0.2s forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>