<script setup>
useSeoMeta({
  title: '赫琟美學 HEAVIVE STUDIO - 首頁',
  description: '專屬您的肌膚療癒空間，提供客製化美容護膚服務。',
})
</script>

<template>
  <div class="space-y-12">

    <div class="w-full fade-in">
      <img
        src="/home-banner.jpg"
        alt="HEAVIVE STUDIO Banner"
        class="w-full h-auto object-cover shadow-sm"
      />
    </div>

    <section class="text-center px-6 py-4 max-w-4xl mx-auto space-y-6">
      <span class="text-rose-500 tracking-[0.2em] font-medium uppercase text-sm">Heavive Studio</span>
      <h1 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
        喚醒肌膚<br>
        <span class="text-rose-500">原本的光采</span>
      </h1>
      <p class="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
        我們相信真正的保養，是一場與自己對話的過程。<br>
        在這裡，放下繁雜的思緒，享受專屬於妳的療癒時光。
      </p>
      <div class="pt-4 flex gap-4 justify-center">
        <NuxtLink to="/about" class="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl">
          認識我們
        </NuxtLink>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-8 text-center px-4">
      <div class="space-y-4 p-6 rounded-2xl hover:bg-rose-50 hover:shadow-lg transition duration-300">
        <Icon name="mdi:face-woman-shimmer" size="48" class="text-rose-400" />
        <h3 class="text-xl font-bold text-gray-900">客製化護理</h3>
        <p class="text-gray-500">不使用制式菜單，根據當日膚況量身調配專屬課程。</p>
      </div>
      <div class="space-y-4 p-6 rounded-2xl hover:bg-rose-50 hover:shadow-lg transition duration-300">
        <Icon name="mdi:hand-heart" size="48" class="text-rose-400" />
        <h3 class="text-xl font-bold text-gray-900">溫柔手技</h3>
        <p class="text-gray-500">獨家淋巴引流按摩，讓緊繃的線條與情緒同步釋放。</p>
      </div>
      <div class="space-y-4 p-6 rounded-2xl hover:bg-rose-50 hover:shadow-lg transition duration-300">
        <Icon name="mdi:shield-check" size="48" class="text-rose-400" />
        <h3 class="text-xl font-bold text-gray-900">嚴選產品</h3>
        <p class="text-gray-500">全系列使用國際認證安全產品，敏感肌也能安心享受。</p>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* 加入簡單的進場動畫 */
.fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>