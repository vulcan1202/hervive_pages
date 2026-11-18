<script setup>
useSeoMeta({
  title: '首頁',
  description: 'Hervive STUDIO 位於新北三重，提供專屬您的客製化美容護膚與皮膚管理。品牌結合了 Her 與 Vive（生活）之意，致力於讓每位女性在生活中找到屬於自己的節奏。提供水光透亮、緊顏管理等專業課程，讓您由內而外散發自信美麗。',
  ogTitle: 'Hervive STUDIO - 每個女人都擁有屬於自己的氛圍',
  ogDescription: '專注於客製化皮膚管理與療癒手技。在 Hervive STUDIO，我們陪您一起活出最真實、最自信的自我。立即預約您的水光之旅。',
})
</script>

<template>
  <div class="page-wrapper space-y-12 sm:space-y-16 md:space-y-20">
    <!-- 品牌旗艦 Hero (Week 08 混合模式 background-blend-mode: multiply + 實拍光影沉浸感) -->
    <section class="banner-container">
      <div class="double-bezel-outer shadow-2xl transition-all duration-700 hover:shadow-luxury-hover">
        <div class="hero-blend-card double-bezel-inner overflow-hidden relative rounded-2xl px-6 sm:px-12 py-16 sm:py-20 text-center flex flex-col items-center border border-[#C5A880]/30 text-[#FAF4EE]">
          
          <!-- 柔光氣氛流動飾板 -->
          <div class="pointer-events-none absolute inset-0">
            <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl"></div>
            <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#154337]/40 blur-3xl"></div>
          </div>

          <!-- 品牌微標記 Eyebrow Badging -->
          <div class="relative z-10 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/30 text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] shadow-sm mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
            <span>EST. 2026 • HERVIVE AESTHETIC STUDIO</span>
          </div>

          <!-- 巨型奢華雙襯線標題 -->
          <h1 class="brand-hero-title relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif-luxury tracking-[0.12em] sm:tracking-[0.18em] uppercase leading-none select-none text-[#FAF4EE] mt-2">
            HERVIVE STUDIO
          </h1>

          <p class="relative z-10 text-xs sm:text-sm text-[#FAF4EE]/80 font-light tracking-[0.25em] mt-3">
            活出真實的女性節奏 • 客製肌膚管理
          </p>

          <!-- 品牌金線分隔點 -->
          <div class="relative z-10 w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-6"></div>

          <!-- 副標題 -->
          <h2 class="relative z-10 text-lg sm:text-2xl md:text-3xl font-semibold font-serif-luxury text-[#FAF4EE] tracking-[0.15em] leading-normal">
            喚醒肌膚 <span class="text-[#C5A880] italic font-normal">原本的光采</span>
          </h2>

          <!-- 品牌故事哲學摘要 -->
          <div class="relative z-10 hero-description mt-5 space-y-4 max-w-2xl mx-auto text-[#FAF4EE]/90">
            <p class="text-sm sm:text-base leading-relaxed font-normal">
              <span class="text-[#C5A880] font-semibold border-b border-[#C5A880]/50 pb-0.5">Hervie</span> 的名字，是由 
              <span class="font-semibold text-white">「Her」（她）</span>與 
              <span class="font-semibold text-white">「Vive」（生活）</span>結合而來。
              <span class="block text-xs sm:text-sm text-[#FAF4EE]/70 font-light mt-1">Vive 是西班牙語中「活；生活」之意，願每位女性在節奏中綻放自信本色。</span>
            </p>
          </div>

          <!-- 引言金句方塊 -->
          <div class="relative z-10 w-full max-w-xl mx-auto mt-6 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 p-4 sm:p-5">
            <p class="text-xs sm:text-sm font-light text-[#FAF4EE] tracking-widest leading-relaxed">
              每個女人都擁有屬於自己的氛圍，從內而外擁有無限可能✨<br class="hidden sm:block" />
              在芯荷肌膚養護，找回肌膚最舒適、最從容的發光狀態。
            </p>
          </div>

          <!-- 雙重 Island 按鈕群組 (Button-in-Button Physics) -->
          <div class="relative z-10 flex flex-wrap justify-center gap-4 mt-8">
            <NuxtLink 
              to="/services" 
              class="group bg-[#C5A880] text-[#154337] px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider shadow-lg hover:shadow-xl hover:bg-white transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <span>探索服務課程</span>
              <span class="w-6 h-6 rounded-full bg-[#154337]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <Icon name="mdi:arrow-right" size="14" />
              </span>
            </NuxtLink>
            
            <NuxtLink 
              to="/about" 
              class="group bg-white/10 hover:bg-white/20 text-[#FAF4EE] border border-white/25 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wider backdrop-blur-md transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <span>認識芯荷沙龍</span>
              <Icon name="mdi:arrow-top-right" size="15" class="text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </NuxtLink>
          </div>

          <!-- 邊緣金質細緻反光線 -->
          <div class="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-2xl pointer-events-none"></div>
        </div>
      </div>
    </section>

    <!-- 特色展演區：非對稱 Bento Grid (The Asymmetrical Bento Box) 告別死板三等分卡片 -->
    <section class="cards-section space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-[#C5A880]/30">
        <div>
          <p class="text-xs text-[#8A6A3B] tracking-[0.25em] uppercase font-semibold">OUR CORE VALUES</p>
          <h2 class="text-xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tracking-wider">
            三大美學承諾 <span class="text-[#8A6A3B] italic font-normal">Philosophy</span>
          </h2>
        </div>
        <p class="text-xs sm:text-sm text-gray-500 font-light tracking-wide">
          以溫柔的手感與科學的調理，為肌膚找回自然的平衡光澤
        </p>
      </div>

      <!-- Bento Grid 排版：左側 8 欄主卡 + 右側 4 欄兩張疊卡 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <!-- 主卡片：客製化護理 (8 欄，帶實拍照光影與大器展現) -->
        <div class="lg:col-span-7 double-bezel-outer group hover:-translate-y-1 transition-all duration-500">
          <div class="double-bezel-inner p-8 sm:p-10 bg-white flex flex-col justify-between h-full relative overflow-hidden rounded-2xl">
            <!-- 內部底層微裝飾圖標 -->
            <Icon name="mdi:face-woman-shimmer" class="absolute -right-6 -bottom-6 text-[#154337]/5 pointer-events-none transition-transform duration-700 group-hover:scale-110" size="180" />

            <div>
              <div class="flex items-center justify-between mb-6">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#154337]/10 text-[#154337] text-xs font-semibold tracking-widest uppercase">
                  <Icon name="mdi:star-four-points" size="13" class="text-[#8A6A3B]" />
                  <span>SIGNATURE CARE</span>
                </span>
                <span class="text-3xl font-serif-luxury font-bold text-[#8A6A3B]">01</span>
              </div>

              <h3 class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tracking-wide mb-4 group-hover:text-[#8A6A3B] transition-colors">
                客製化全方位皮膚管理
              </h3>

              <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-light mb-6">
                捨棄固定制式的套餐公式。每一堂護理均由專業護理師仔細檢視當日水油平衡、角質代謝與敏感耐受度，調配專屬修護安瓶與技術導入，精準改善膚況困擾。
              </p>
            </div>

            <!-- 特色標籤群 -->
            <div class="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2 relative z-10">
              <span class="text-xs px-3 py-1 rounded-lg bg-[#FAF4EE] text-[#154337] font-medium border border-[#C5A880]/20">精準當日膚況檢測</span>
              <span class="text-xs px-3 py-1 rounded-lg bg-[#FAF4EE] text-[#154337] font-medium border border-[#C5A880]/20">高濃度客製安瓶</span>
              <span class="text-xs px-3 py-1 rounded-lg bg-[#FAF4EE] text-[#154337] font-medium border border-[#C5A880]/20">敏感肌屏障友善</span>
            </div>
          </div>
        </div>

        <!-- 右側疊層卡片 (5 欄)：溫柔手技 + 嚴選純淨產品 -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          
          <!-- 副卡 1：溫柔手技 -->
          <div class="double-bezel-outer group hover:-translate-y-1 transition-all duration-500 flex-1">
            <div class="double-bezel-inner p-6 sm:p-7 bg-white flex flex-col justify-between h-full relative overflow-hidden rounded-2xl">
              <div class="flex items-start justify-between">
                <div class="w-12 h-12 rounded-xl bg-[#FAF4EE] border border-[#C5A880]/30 flex items-center justify-center text-[#154337] group-hover:bg-[#154337] group-hover:text-[#FAF4EE] transition-colors duration-500 shadow-xs mb-3">
                  <Icon name="mdi:hand-heart" size="24" class="transition-transform duration-500 group-hover:scale-110" />
                </div>
                <span class="text-2xl font-serif-luxury font-bold text-gray-300">02</span>
              </div>

              <div>
                <h4 class="text-lg sm:text-xl font-bold font-serif-luxury text-[#154337] tracking-wide mb-2 group-hover:text-[#8A6A3B] transition-colors">
                  獨家溫柔手技按摩
                </h4>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  融合理膚淋巴引流與小顏提拉手法，在舒緩肌肉緊繃的同時釋放日常情緒壓力，使臉部輪廓自然清新重現。
                </p>
              </div>
            </div>
          </div>

          <!-- 副卡 2：嚴選產品 -->
          <div class="double-bezel-outer group hover:-translate-y-1 transition-all duration-500 flex-1">
            <div class="double-bezel-inner p-6 sm:p-7 bg-[#FDFBF7] flex flex-col justify-between h-full relative overflow-hidden rounded-2xl">
              <div class="flex items-start justify-between">
                <div class="w-12 h-12 rounded-xl bg-white border border-[#C5A880]/30 flex items-center justify-center text-[#154337] group-hover:bg-[#154337] group-hover:text-[#FAF4EE] transition-colors duration-500 shadow-xs mb-3">
                  <Icon name="mdi:shield-check" size="24" class="transition-transform duration-500 group-hover:scale-110" />
                </div>
                <span class="text-2xl font-serif-luxury font-bold text-gray-300">03</span>
              </div>

              <div>
                <h4 class="text-lg sm:text-xl font-bold font-serif-luxury text-[#154337] tracking-wide mb-2 group-hover:text-[#8A6A3B] transition-colors">
                  國際純淨安心配方
                </h4>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  全系列導入國際醫美級安全檢驗認證產品，不添加致敏性多餘香料與刺激性成分，即使脆弱敏感肌也能無憂享受。
                </p>
              </div>
            </div>
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

/* Week 08 沉浸式 Hero 混合模式技術 */
.hero-blend-card {
  background-image: url('/view_photo/views1.jpg');
  background-color: rgba(21, 67, 55, 0.90);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.brand-hero-title {
  text-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.4),
    0 12px 35px rgba(21, 67, 55, 0.6),
    0 0 45px rgba(197, 168, 128, 0.25);
}
</style>
