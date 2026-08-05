<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

useSeoMeta({
  title: '關於赫琟美學',
  description: 'Hervive STUDIO 位於新北三重，由寧寧與容容姐妹共同經營。專注於客製化皮膚管理、水光透亮護理、緊顏管理與藻針修復。提供溫暖且專業的療癒空間，針對敏感肌、粉刺痘痘及臉部拉提，為您打造專屬的美學方案。',
  ogTitle: '關於赫琟美學 HERVIVE STUDIO - 找回肌膚原本的光采',
  ogDescription: '專業三重皮膚管理，姐妹經營的有溫度美學空間，立即預約您的客製化護理課程。',
  ogImage: '/about/about_logo.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineLocalBusiness({
    name: '赫琟美學 HEAVIVE STUDIO',
    image: '/about/about_logo.jpg',
    address: {
      streetAddress: '三和路三段103號1樓',
      addressLocality: '三重區',
      addressRegion: '新北市',
      postalCode: '241',
      addressCountry: 'TW',
    },
    geo: { latitude: '25.0726592', longitude: '121.491917' },
    url: 'https://hervive-pages.pages.dev',
    openingHours: [{ opens: '11:00', closes: '21:00', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
    description: '赫琟美學專注於提供客製化的美容護膚服務，包含水光透亮、緊顏管理、皮膚管理、霧眉等服務體驗。',
  })
])

const currentImage = ref(0)
const photos = [
  { src: '/view_photo/views1.jpg', mode: 'cover' },
  { src: '/view_photo/views2.jpg', mode: 'contain' },
  { src: '/view_photo/views3.jpg', mode: 'cover' },
]
let timer = null
  
const resetTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % photos.length
  }, 4000)
}
  
onMounted(() => {
  resetTimer()
})
  
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
  
const selectImage = (index) => {
  currentImage.value = index
  resetTimer()
}
</script>

<template>
  <div class="space-y-16 sm:space-y-20 py-4 max-w-5xl mx-auto">
    <!-- Hero 品牌故事 (雙層質感圖文) -->
    <section class="relative overflow-hidden">
      <!-- 柔光背景光影 -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#154337]/10 blur-3xl"></div>
        <div class="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#C5A880]/15 blur-3xl"></div>
      </div>

      <div class="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <!-- Logo 展示照 雙層框體 -->
        <div class="w-full max-w-[320px] md:w-5/12 relative group mx-auto md:mx-0 double-bezel-outer">
          <div class="double-bezel-inner overflow-hidden shadow-2xl relative">
            <img
              src="/about/about_logo.jpg"
              alt="Hervive Studio Logo"
              class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <!-- 品牌文字介紹 -->
        <div class="w-full md:w-7/12 space-y-6 flex flex-col justify-center slide-in-from-left">
          <div class="space-y-2 text-center md:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#C5A880]/30 text-[10px] uppercase tracking-[0.2em] font-medium text-[#C5A880]">
              ABOUT US
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#154337] tracking-wider leading-tight">
              關於 <span class="text-[#C5A880] italic">赫琟美學</span>
            </h1>
            <h2 class="text-xs sm:text-sm text-gray-500 font-medium tracking-[0.3em] uppercase">Hervive Studio</h2>
          </div>

          <div class="space-y-5 text-gray-700 leading-relaxed text-center md:text-left">
            <p class="text-base sm:text-lg font-medium text-gray-800">
              赫琟美學，專注於提供 <span class="text-[#154337] font-bold border-b border-[#C5A880]">客製化的美容護膚服務</span>。
            </p>
            
            <!-- 精緻引言卡片 -->
            <div class="relative p-6 sm:p-8 bg-white/80 rounded-3xl shadow-sm border border-[#C5A880]/30 backdrop-blur-md">
              <Icon name="mdi:format-quote-open" class="absolute -top-3 -left-3 text-[#C5A880]/30" size="44" />
              <p class="italic text-[#154337] tracking-widest leading-loose font-serif-luxury text-base sm:text-lg">
                在赫琟美學，我們用溫柔的節奏與安心的環境，<br class="hidden md:block">
                讓每一位走進來的妳，都能感受到自信與時尚感的提升。
              </p>
              <Icon name="mdi:format-quote-close" class="absolute -bottom-3 -right-3 text-[#C5A880]/30" size="44" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 姐妹經營特色區 (Sisters Concept) -->
    <section class="max-w-5xl mx-auto">
      <div class="double-bezel-outer">
        <div class="double-bezel-inner flex flex-col md:flex-row items-stretch overflow-hidden">
          
          <!-- 左側文字說明 -->
          <div class="md:w-5/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 bg-[#FDFBF7] border-b md:border-b-0 md:border-r border-[#C5A880]/20">
            <div class="space-y-3">
              <span class="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] bg-[#154337]/10 text-[#154337] font-semibold">SISTER BEAUTY CARE</span>
              <h3 class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tracking-widest">姐妹經營</h3>
              <p class="text-[#C5A880] text-xs font-medium tracking-[0.25em] uppercase">具有專業與溫度的美學空間</p>
            </div>

            <!-- 姐妹個人介紹卡片 -->
            <div class="space-y-4">
              <div class="group w-full text-left rounded-2xl border border-[#C5A880]/30 bg-white p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-[#154337]">
                <div class="mb-2 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-[#154337] text-white flex items-center justify-center font-serif-luxury font-bold text-sm">N</span>
                  <span class="text-lg font-bold text-[#154337]">Ning</span>
                  <span class="text-xs text-[#C5A880] font-medium tracking-widest">/ 姐姐</span>
                </div>
                <p class="text-gray-600 leading-relaxed tracking-wider text-xs sm:text-sm pl-2 border-l-2 border-[#C5A880]/40 group-hover:border-[#154337] transition-colors">
                  文靜細膩，擅長傾聽，<br>
                  像一位能安心訴說的朋友，用最細緻的手法呵護你/妳
                </p>
              </div>

              <div class="group w-full text-left rounded-2xl border border-[#C5A880]/30 bg-white p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-[#154337]">
                <div class="mb-2 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-[#C5A880] text-white flex items-center justify-center font-serif-luxury font-bold text-sm">容</span>
                  <span class="text-lg font-bold text-[#154337]">容容</span>
                  <span class="text-xs text-[#C5A880] font-medium tracking-widest">/ 妹妹</span>
                </div>
                <p class="text-gray-600 leading-relaxed tracking-wider text-xs sm:text-sm pl-2 border-l-2 border-[#C5A880]/40 group-hover:border-[#154337] transition-colors">
                  活潑熱情，溫暖陪伴，<br>
                  像始終在身旁支持妳的家人，為你/妳注入自信的能量
                </p>
              </div>
            </div>
          </div>

          <!-- 右側工作室實景輪播圖 (Studio Views Carousel) -->
          <div class="md:w-7/12 relative h-[320px] sm:h-[400px] md:h-auto min-h-[350px] bg-[#154337]/5 overflow-hidden">
            <transition name="reveal">
              <div :key="currentImage" class="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  v-if="photos[currentImage].mode === 'cover'"
                  :src="photos[currentImage].src"
                  class="w-full h-full object-cover stable-zoom"
                  alt="Studio View"
                />
                <img
                  v-else
                  :src="photos[currentImage].src"
                  class="w-full h-full object-contain stable-zoom bg-[#FAF4EE]"
                  alt="Studio View"
                />
              </div>
            </transition>

            <!-- 輪播指標條 -->
            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 md:bottom-6 md:right-8 md:left-auto md:translate-x-0 flex gap-3 z-20 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <button
                v-for="(_, index) in photos"
                :key="index"
                @click="selectImage(index)"
                class="group py-1 focus:outline-none"
                :aria-label="`切換到畫面 ${index + 1}`"
              >
                <div
                  class="h-[3px] transition-all duration-500 rounded-full"
                  :class="currentImage === index
                    ? 'bg-[#C5A880] w-8'
                    : 'bg-white/40 w-3 group-hover:bg-white/70'"
                ></div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 營業時間與位置卡片 (Location & Hours) -->
    <section class="max-w-4xl mx-auto">
      <div class="grid gap-6 md:grid-cols-2">
        <div class="bg-white border border-[#C5A880]/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center text-center sm:text-left justify-center sm:justify-start gap-4 sm:gap-5 shadow-sm hover:border-[#154337] transition-all">
          <div class="w-14 h-14 shrink-0 bg-[#FAF4EE] rounded-2xl border border-[#C5A880]/30 flex items-center justify-center text-[#154337] mx-auto sm:mx-0">
            <Icon name="mdi:clock-outline" size="28" />
          </div>
          <div>
            <p class="text-[11px] text-[#C5A880] font-semibold tracking-widest uppercase">OPENING HOURS</p>
            <p class="text-[#154337] font-bold text-base sm:text-lg leading-snug">10:00 AM - 22:00 PM (完全預約制)</p>
          </div>
        </div>

        <a href="https://maps.app.goo.gl/XFr72zB2CA26n8A68" target="_blank" class="bg-white border border-[#C5A880]/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center text-center sm:text-left justify-center sm:justify-start gap-4 sm:gap-5 shadow-sm hover:bg-[#FAF4EE] hover:border-[#154337] transition-all group">
          <div class="w-14 h-14 shrink-0 bg-[#FAF4EE] rounded-2xl border border-[#C5A880]/30 flex items-center justify-center text-[#154337] group-hover:bg-[#154337] group-hover:text-white transition-colors mx-auto sm:mx-0">
            <Icon name="mdi:map-marker-radius-outline" size="28" />
          </div>
          <div class="min-w-0">
            <p class="text-[11px] text-[#C5A880] font-semibold tracking-widest uppercase">OUR LOCATION</p>
            <p class="text-[#154337] font-bold text-base sm:text-lg leading-tight truncate">新北市三重區三和路三段103號1樓</p>
            <p class="text-xs text-[#C5A880] mt-1 font-medium underline flex items-center justify-center sm:justify-start gap-1">
              <span>點擊開啟 Google Maps 導航</span>
              <Icon name="mdi:arrow-top-right" size="14" />
            </p>
          </div>
        </a>
      </div>
    </section>

    <!-- 專屬預約橫幅 (Bottom Call-to-Action) -->
    <section class="bg-[#154337] text-[#FAF4EE] rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden border border-[#C5A880]/40 shadow-xl">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl"></div>
      </div>

      <div class="relative z-10 space-y-4 max-w-2xl mx-auto">
        <span class="inline-block px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] bg-white/10 text-[#C5A880] border border-[#C5A880]/30">PRIVATE SKIN SPA</span>
        <h3 class="text-2xl sm:text-3xl font-bold font-serif-luxury tracking-widest text-[#FAF4EE]">HERVIVE STUDIO 專屬療癒空間</h3>
        <p class="text-sm sm:text-base text-[#FAF4EE]/80 font-light leading-relaxed">「讓肌膚與心靈都被溫柔對待，找回發光的自己」</p>
        
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://lin.ee/HmMJftl" target="_blank" class="bg-[#C5A880] text-[#154337] px-8 py-3.5 rounded-full font-bold transition hover:bg-white w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
            <Icon name="mdi:calendar-check" size="20" /> 立即預約 LINE
          </a>
          <a href="https://www.instagram.com/hervive_studio/" target="_blank" class="bg-white/10 border border-[#FAF4EE]/40 text-[#FAF4EE] px-8 py-3.5 rounded-full font-bold transition hover:bg-white/20 w-full sm:w-auto flex items-center justify-center gap-2">
            <Icon name="mdi:instagram" size="20" /> 追蹤 Instagram
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stable-zoom {
  transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backface-visibility: hidden;
  transform: translateZ(0) scale(1);
}

.stable-zoom:hover {
  transform: translateZ(0) scale(1.03);
}

.slide-in-from-left {
  opacity: 0;
  animation: slideInFromLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.2s;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.reveal-enter-active,
.reveal-leave-active {
  transition: opacity 0.6s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.reveal-leave-to {
  opacity: 0;
}
</style>
