<script setup>
useSeoMeta({
  title: '首頁',
  description: 'Hervive STUDIO 位於新北三重，提供專屬您的客製化美容護膚與皮膚管理。品牌結合了 Her 與 Vive（生活）之意，致力於讓每位女性在生活中找到屬於自己的節奏。提供水光透亮、緊顏管理等專業課程，讓您由內而外散發自信美麗。',
  ogTitle: 'Hervive STUDIO - 每個女人都擁有屬於自己的氛圍',
  ogDescription: '專注於客製化皮膚管理與療癒手技。在 Hervive STUDIO，我們陪您一起活出最真實、最自信的自我。立即預約您的水光之旅。',
})

const cards = [
  { icon: 'mdi:face-woman-shimmer', title: '客製化護理', desc: '不使用制式菜單，根據當日膚況量身調配專屬課程。' },
  { icon: 'mdi:hand-heart', title: '溫柔手技', desc: '獨家淋巴引流按摩，讓緊繃的線條與情緒同步釋放。' },
  { icon: 'mdi:shield-check', title: '嚴選產品', desc: '全系列使用國際認證安全產品，敏感肌也能安心享受。' },
]
</script>

<template>
  <div class="page-wrapper space-y-10 sm:space-y-14 md:space-y-16">
    <!-- 品牌 Hero (合併原 Banner 與品牌介紹，減少首屏重複資訊) -->
    <section class="banner-container">
      <div class="double-bezel-outer transition-all duration-700 hover:shadow-xl">
        <div class="double-bezel-inner overflow-hidden relative rounded-2xl bg-[#FAF7F2] px-6 sm:px-10 py-12 sm:py-16 text-center flex flex-col items-center border border-[#C5A880]/30">
          <!-- 柔和氣氛燈 (消解板塊單調感) -->
          <div class="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#154337]/5 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none"></div>

          <!-- 品牌小 Eyebrow Badging -->
          <p class="text-xs text-[#8A6A3B] tracking-[0.3em] uppercase font-medium">EST. 2026 • HERVIVE AESTHETIC STUDIO</p>

          <!-- HERVIVE STUDIO 巨型綠色精品陰影文字 -->
          <h1 class="brand-hero-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-serif-luxury text-[#154337] tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-none select-none mt-4">
            HERVIVE STUDIO
          </h1>

          <p class="text-xs sm:text-sm text-gray-600 font-light tracking-[0.2em] mt-3">
            活出真實的女性節奏 • 客製美學護理
          </p>

          <!-- 品牌標語 -->
          <div class="w-10 h-[1px] bg-[#C5A880] my-5 sm:my-6"></div>
          <h2 class="text-base sm:text-xl md:text-2xl font-semibold font-serif-luxury text-[#154337] tracking-[0.15em] leading-normal">
            喚醒肌膚 <span class="text-[#8A6A3B] italic font-normal">原本的光采</span>
          </h2>

          <!-- 品牌介紹 -->
          <div class="hero-description mt-5 space-y-4 max-w-2xl mx-auto">
            <p class="hero-description-main text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <span class="highlight text-[#154337] font-semibold border-b border-[#C5A880]/40 pb-0.5">Hervie</span> 的名字，是由 <span class="highlight text-[#154337] font-semibold">「Her」（她）</span>和 <span class="highlight text-[#154337] font-semibold">「Vive」（生活）</span>結合而來
              <span class="block text-sm sm:text-base text-gray-500 font-normal">Vive 是西班牙語中「活；生活」的意思</span>
            </p>
            <p class="hero-description-sub text-sm sm:text-base text-gray-600 leading-relaxed font-light italic">
              Hervie 希望每一位女性都能夠在生活中找到屬於自己的節奏，活出最真實的自我
              <span class="block not-italic">在芯荷肌膚養護，每個人都能擁有自信且舒適的氛圍</span>
            </p>
          </div>

          <!-- 分隔金句引言 -->
          <div class="divider-group w-full max-w-xl mx-auto mt-6 border-y border-[#C5A880]/25 py-4">
            <p class="divider-text text-sm sm:text-base font-medium text-[#154337] tracking-widest leading-relaxed">
              每個女人都擁有屬於自己的氛圍，從內而外擁有無限可能<br class="hidden sm:block" />
              讓您內在充滿自信，外在展現美麗✨
            </p>
          </div>

          <!-- CTA 按鈕群組 -->
          <div class="cta-group flex flex-wrap justify-center gap-4 mt-6">
            <NuxtLink to="/services" class="btn btn-outline border border-[#154337] text-[#154337] bg-white hover:bg-[#FAF4EE] px-8 py-3.5 rounded-xl text-sm font-medium tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-2 group">
              <span>服務項目</span>
              <span class="text-[#8A6A3B] group-hover:translate-x-1 transition-transform">→</span>
            </NuxtLink>
            
            <NuxtLink to="/about" class="btn btn-primary bg-[#154337] text-[#FAF4EE] hover:bg-[#0D2C24] px-8 py-3.5 rounded-xl text-sm font-medium tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 group border border-[#C5A880]/40">
              <span>認識我們</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </NuxtLink>
          </div>

          <!-- 極細光線框體融入 -->
          <div class="absolute inset-0 ring-1 ring-inset ring-[#C5A880]/20 rounded-2xl pointer-events-none"></div>
        </div>
      </div>
    </section>

    <!-- 特色卡片區 (3大特色) -->
    <section class="cards-section">
      <div class="cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(card, index) in cards"
          :key="card.title"
          class="card-item double-bezel-outer group transition-all duration-500 hover:-translate-y-1.5"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <div class="double-bezel-inner p-8 text-center flex flex-col items-center h-full relative overflow-hidden rounded-2xl">
            <div class="w-16 h-16 rounded-xl bg-[#FAF4EE] border border-[#C5A880]/30 flex items-center justify-center mb-6 text-[#154337] group-hover:bg-[#154337] group-hover:text-[#FAF4EE] transition-colors duration-500 shadow-sm">
              <Icon :name="card.icon" size="32" class="card-icon transition-transform duration-500 group-hover:scale-110" />
            </div>

            <h3 class="card-title text-lg font-bold font-serif-luxury text-[#154337] tracking-wider mb-3 group-hover:text-[#8A6A3B] transition-colors">
              {{ card.title }}
            </h3>

            <p class="card-description text-xs sm:text-sm text-gray-600 leading-relaxed tracking-wide max-w-xs font-light">
              {{ card.desc }}
            </p>

            <!-- 底部懸停金邊指示 -->
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#154337] to-[#C5A880] transition-all duration-500 group-hover:w-1/2"></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-wrapper {
  max-width: 1140px;
  margin: 0 auto;
}

.brand-hero-text {
  text-shadow: 
    0 4px 16px rgba(21, 67, 55, 0.22),
    0 12px 30px rgba(21, 67, 55, 0.12),
    0 0 35px rgba(197, 168, 128, 0.35);
}
</style>