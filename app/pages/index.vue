<script setup>
useSeoMeta({
  title: '赫琟美學 HEAVIVE STUDIO - 首頁',
  description: '專屬您的肌膚療癒空間，提供客製化美容護膚服務。',
})
</script>

<template>
  <div class="space-y-12">
    <div class="max-w-xl mx-auto px-4 fade-in">
      <img
        src="/home-banner.png"
        alt="HEAVIVE STUDIO Banner"
        class="w-full h-auto object-cover block"
      />
    </div>

    <section class="text-center px-6 py-4 max-w-4xl mx-auto space-y-6">
      <span class="text-[#C7CDCE] tracking-[0.2em] font-medium uppercase text-sm">Heavive Studio</span>
      <h1 class="title-serif text-3xl md:text-5xl font-bold text-[#154337] leading-tight md:leading-[1.2]">
        喚醒肌膚<br>
        <span class="text-[#C7CDCE]">原本的光采</span>
      </h1>
      <p class="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
        我們相信真正的保養，是一場與自己對話的過程。<br>
        在這裡，放下繁雜的思緒，享受專屬於妳的療癒時光。
      </p>
      <div class="pt-4 flex gap-4 justify-center">
        <NuxtLink to="/about" class="px-8 py-3 bg-[#154337] text-[#FAF4EE] rounded-full font-medium hover:opacity-90 transition shadow-lg">
          認識我們
        </NuxtLink>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-8 text-center px-4">
      <div v-for="card in [
        { icon: 'mdi:face-woman-shimmer', title: '客製化護理', desc: '不使用制式菜單，根據當日膚況量身調配專屬課程。' },
        { icon: 'mdi:hand-heart', title: '溫柔手技', desc: '獨家淋巴引流按摩，讓緊繃的線條與情緒同步釋放。' },
        { icon: 'mdi:shield-check', title: '嚴選產品', desc: '全系列使用國際認證安全產品，敏感肌也能安心享受。' }
      ]" :key="card.title" class="space-y-4 p-6 rounded-2xl border border-transparent hover:border-[#C7CDCE] hover:bg-white transition duration-300">
        <Icon :name="card.icon" size="48" class="text-[#154337]" />
        <h3 class="text-xl font-bold text-gray-900">{{ card.title }}</h3>
        <p class="text-gray-500 text-sm">{{ card.desc }}</p>
      </div>
    </section>
  </div>
</template>