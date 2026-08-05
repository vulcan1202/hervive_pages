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
  <div class="page-wrapper space-y-16 md:space-y-24">
    <!-- Banner 區 (藝廊雙層柔光融入框體) -->
    <div class="banner-container double-bezel-outer transition-all duration-700 hover:shadow-xl group">
      <div class="double-bezel-inner overflow-hidden relative rounded-2xl bg-[#FAF4EE]">
        <img
          src="/index/home-banner.png"
          alt="Hervive STUDIO Banner"
          class="banner-image w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.01]"
        />
        <!-- 柔和漸層與內邊界融入，消解影像圖片硬邊感 -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#FAF4EE]/15 via-transparent to-[#154337]/20 pointer-events-none"></div>
        <div class="absolute inset-0 ring-1 ring-inset ring-[#C5A880]/20 rounded-2xl pointer-events-none"></div>
      </div>
    </div>

    <!-- 主內容 -->
    <div class="content-wrapper space-y-16">
      <!-- 品牌標題區 (Hero Section) -->
      <section class="hero-section text-center relative py-6 md:py-10">
        <div class="hero-content max-w-3xl mx-auto space-y-8">
          
          <!-- 品牌微標籤 -->
          <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/70 border border-[#C5A880]/30 shadow-sm backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse"></span>
            <span class="text-[11px] font-medium tracking-[0.25em] text-[#154337] uppercase font-serif-luxury">客製化皮膚管理</span>
            <span class="w-4 h-[1px] bg-[#C5A880]"></span>
            <span class="text-[11px] font-semibold tracking-widest text-[#C5A880]">HERVIVE STUDIO</span>
          </div>

          <h1 class="hero-title text-4xl sm:text-5xl md:text-6xl font-bold font-serif-luxury text-[#154337] tracking-wider leading-tight">
            喚醒肌膚
            <span class="block sm:inline text-[#C5A880] italic font-normal">原本的光采</span>
          </h1>

          <div class="hero-description space-y-4 max-w-2xl mx-auto px-2">
            <p class="hero-description-main text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              <span class="highlight text-[#154337] font-semibold border-b border-[#C5A880]/40 pb-0.5">Hervie</span> 的名字，是由 <span class="highlight text-[#154337] font-semibold">「Her」（她）</span>和 <span class="highlight text-[#154337] font-semibold">「Vive」（生活）</span>結合而來<br class="hidden sm:block" />
              <span class="text-sm sm:text-base text-gray-500 font-normal">Vive 是西班牙語中「活；生活」的意思</span>
            </p>
            <p class="hero-description-sub text-sm sm:text-base text-gray-600 leading-relaxed font-light italic">
              Hervie 希望每一位女性都能夠在生活中找到屬於自己的節奏，活出最真實的自我<br class="hidden sm:block" />
              在赫琟，每個人都能擁有自信且舒適的氛圍
            </p>
          </div>

          <!-- 分隔金句引言框 -->
          <div class="divider-group relative p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#C5A880]/25 shadow-sm backdrop-blur-md max-w-xl mx-auto">
            <div class="w-10 h-[1px] bg-[#C5A880] mx-auto mb-4"></div>
            <p class="divider-text text-sm sm:text-base font-medium text-[#154337] tracking-widest leading-relaxed">
              每個女人都擁有屬於自己的氛圍，從內而外擁有無限可能<br />
              讓您內在充滿自信，外在展現美麗✨
            </p>
            <div class="w-10 h-[1px] bg-[#C5A880] mx-auto mt-4"></div>
          </div>

          <!-- CTA 按鈕群組 -->
          <div class="cta-group flex flex-wrap justify-center gap-4 pt-2">
            <NuxtLink to="/services" class="btn btn-outline border border-[#154337] text-[#154337] bg-white hover:bg-[#FAF4EE] px-8 py-3.5 rounded-full text-sm font-medium tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-2 group">
              <span>服務項目</span>
              <span class="text-[#C5A880] group-hover:translate-x-1 transition-transform">→</span>
            </NuxtLink>
            
            <NuxtLink to="/about" class="btn btn-primary bg-[#154337] text-[#FAF4EE] hover:bg-[#0D2C24] px-8 py-3.5 rounded-full text-sm font-medium tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 group border border-[#C5A880]/40">
              <span>認識我們</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </NuxtLink>
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
            <div class="double-bezel-inner p-8 text-center flex flex-col items-center h-full relative overflow-hidden">
              <div class="w-16 h-16 rounded-2xl bg-[#FAF4EE] border border-[#C5A880]/30 flex items-center justify-center mb-6 text-[#154337] group-hover:bg-[#154337] group-hover:text-[#FAF4EE] transition-colors duration-500 shadow-sm">
                <Icon :name="card.icon" size="32" class="card-icon transition-transform duration-500 group-hover:scale-110" />
              </div>

              <h3 class="card-title text-lg font-bold font-serif-luxury text-[#154337] tracking-wider mb-3 group-hover:text-[#C5A880] transition-colors">
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
  </div>
</template>

<style scoped>
.page-wrapper {
  max-width: 1140px;
  margin: 0 auto;
}
</style>