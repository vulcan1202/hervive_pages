<script setup>
useSeoMeta({
  title: '首頁',
  description: 'Hervive STUDIO 位於新北三重，提供專屬您的客製化美容護膚與皮膚管理。品牌結合了 Her 與 Vive（生活）之意，致力於讓每位女性在生活中找到屬於自己的節奏。提供水光透亮、緊顏管理等專業課程，讓您由內而外散發自信美麗。',
  ogTitle: 'Hervive STUDIO - 每個女人都擁有屬於自己的氛圍',
  ogDescription: '專注於客製化皮膚管理與療癒手技。在 Hervive STUDIO，我們陪您一起活出最真實、最自信的自我。立即預約您的水光之旅。',
})
</script>

<template>
  <div class="space-y-12">
    <div class="max-w-xl mx-auto px-4 fade-in">
      <img
        src="/index/home-banner.png"
        alt="Hervie STUDIO Banner"
        class="w-full h-auto object-cover block"
      />
    </div>

    <section class="text-center px-6 py-4 max-w-4xl mx-auto space-y-8">
      <div class="space-y-4">
        <span class="text-[#C7CDCE] tracking-[0.2em] font-medium uppercase text-sm">Hervie Studio</span>
        <h1 class="title-serif text-3xl md:text-5xl font-bold text-[#154337] leading-tight md:leading-[1.2]">
          喚醒肌膚<br>
          <span class="text-[#C7CDCE]">原本的光采</span>
        </h1>
      </div>

      <div class="max-w-2xl mx-auto space-y-6">
        <div class="text-gray-600 leading-relaxed">
          <p class="mb-4">
            <span class="font-bold text-[#154337]">Hervie</span> 的名字，是由 <span class="text-[#154337] font-medium">“Her”（她）</span>和 <span class="text-[#154337] font-medium">“Vive”（生活）</span>結合而來<br>
            Vive 是西班牙語中「活；生活」的意思
          </p>
          <p class="text-sm md:text-base italic text-gray-500">
            Hervie 希望每一位女性都能夠在生活中找到屬於自己的節奏，活出最真實的自我<br>
            在赫琟，每個人都能擁有自信且舒適的氛圍
          </p>
        </div>

        <div class="py-8 flex flex-col items-center">
          <div class="w-12 h-[1px] bg-[#C7CDCE] mb-6"></div>
          <p class="text-[#154337] font-medium tracking-widest leading-loose text-center">
            每個女人都擁有屬於自己的氛圍，從內而外擁有無限可能<br>
            讓您內在充滿自信，外在展現美麗✨
          </p>
          <div class="w-12 h-[1px] bg-[#C7CDCE] mt-6"></div>
        </div>
      </div>

      <div class="pt-4 flex gap-4 justify-center">
        <NuxtLink to="/services" class="px-8 py-3 bg-white text-[#154337] border border-[#154337] rounded-full font-medium hover:bg-[#FAF4EE] transition shadow-md">
          服務項目
        </NuxtLink>
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