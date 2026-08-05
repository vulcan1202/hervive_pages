<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

useSeoMeta({
  title: '關於赫琟美學',
  description: 'Hervive STUDIO 位於新北三重，由寧寧與容容姐妹共同經營。專注於客製化皮膚管理、水光透亮護理、緊顏管理與藻針修復。提供溫暖且專業的療癒空間，針對敏感肌、粉刺痘痘及臉部拉提，為您打造專屬的美學方案。',
  ogTitle: '關於赫琟美學 HERVIVE STUDIO - 找回肌膚原本的光采',
  ogDescription: '專業三重皮膚管理，有溫度美學空間，立即預約您的客製化護理課程。',
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
  <div class="space-y-24 sm:space-y-32 py-8 max-w-5xl mx-auto">
    <!-- Hero 品牌故事 (Variance 5 / Motion 7 / Density 3) -->
    <section class="relative overflow-hidden">
      <!-- 柔光背景光影 -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#154337]/10 blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl"></div>
      </div>

      <div class="relative flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
        <!-- 左側：品牌標題 (左上角, 簡潔比例) -->
        <div class="w-full md:w-4/12 space-y-3 text-left shrink-0 self-start">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#C5A880]/40 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] shadow-sm backdrop-blur-md">
            ABOUT US
          </div>
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-luxury text-[#154337] tracking-wider leading-snug">
            HERVIVE STUDIO
          </h1>
          <p class="text-xs text-[#C5A880] tracking-[0.25em] uppercase font-medium">找回肌膚原本的光采</p>
        </div>

        <!-- 右側：品牌內容 (雙層框體引言卡片, 輕微下移) -->
        <div class="w-full md:w-8/12 space-y-6 text-left text-gray-700 leading-relaxed slide-in-from-left md:pt-8">
          <p class="text-base sm:text-lg font-medium text-gray-800 tracking-wide">
            赫琟美學，專注於提供 <span class="text-[#154337] font-bold border-b border-[#C5A880]/60 pb-0.5">客製化的美容護膚服務</span>。
          </p>
          
          <!-- Doppelrand (雙層框體) 精緻引言卡片 -->
          <div class="double-bezel-outer shadow-sm">
            <div class="double-bezel-inner relative p-6 sm:p-8 bg-white/90 backdrop-blur-md space-y-2">
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

    <!-- 特色區 (Sisters Concept - Doppelrand Nested Architecture) -->
    <section class="max-w-5xl mx-auto">
      <div class="double-bezel-outer shadow-lg">
        <div class="double-bezel-inner flex flex-col md:flex-row items-stretch overflow-hidden bg-[#FAF7F2]">
          
          <!-- 左側文字說明 -->
          <div class="md:w-5/12 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 border-b md:border-b-0 md:border-r border-[#C5A880]/20">
            <div class="space-y-3">
              <span class="inline-block px-3.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] bg-[#154337]/10 text-[#154337] font-semibold">SISTER BEAUTY CARE</span>
              <h3 class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tracking-widest">Skincare Specilalist</h3>
              <p class="text-[#C5A880] text-xs font-medium tracking-[0.25em] uppercase">具有專業與溫度的美學空間</p>
            </div>

            <!-- 姐妹個人介紹卡片 (Haptic Hover Physics) -->
            <div class="space-y-4">
              <!-- Ning -->
              <div class="group w-full text-left rounded-[1.25rem] border border-[#C5A880]/30 bg-white/90 p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-md hover:border-[#154337] active:scale-[0.99]">
                <div class="mb-2 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-[#154337] text-white flex items-center justify-center font-serif-luxury font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">N</span>
                  <span class="text-lg font-bold text-[#154337]">Ning</span>
                  <span class="text-xs text-[#C5A880] font-medium tracking-widest">/ 姐姐</span>
                </div>
                <p class="text-gray-600 leading-relaxed tracking-wider text-xs sm:text-sm pl-3 border-l-2 border-[#C5A880]/40 group-hover:border-[#154337] transition-colors">
                  文靜細膩，擅長傾聽，<br>
                  像一位能安心訴說的朋友，用最細緻的手法呵護你/妳
                </p>
              </div>

              <!-- Yuna -->
              <div class="group w-full text-left rounded-[1.25rem] border border-[#C5A880]/30 bg-white/90 p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-md hover:border-[#154337] active:scale-[0.99]">
                <div class="mb-2 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-[#C5A880] text-white flex items-center justify-center font-serif-luxury font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">容</span>
                  <span class="text-lg font-bold text-[#154337]">Yuna</span>
                  <span class="text-xs text-[#C5A880] font-medium tracking-widest">/ 妹妹</span>
                </div>
                <p class="text-gray-600 leading-relaxed tracking-wider text-xs sm:text-sm pl-3 border-l-2 border-[#C5A880]/40 group-hover:border-[#154337] transition-colors">
                  活潑熱情，溫暖陪伴，<br>
                  像始終在身旁支持妳的家人，為你/妳注入自信的能量
                </p>
              </div>
            </div>
          </div>

          <!-- 右側工作室實景輪播圖 (Studio Views Carousel) -->
          <div class="md:w-7/12 relative h-[340px] sm:h-[420px] md:h-auto min-h-[380px] bg-[#154337]/5 overflow-hidden">
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

            <!-- 輪播指標條 (Fluid Glass Pill) -->
            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 md:bottom-6 md:right-8 md:left-auto md:translate-x-0 flex gap-3 z-20 bg-black/40 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 shadow-md">
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

    <!-- 營業時間與位置卡片 (Doppelrand Architecture + Island CTA Physics) -->
    <section class="max-w-4xl mx-auto">
      <div class="grid gap-6 md:grid-cols-2">
        <!-- 營業時間 -->
        <div class="p-1 rounded-[2rem] bg-black/5 border border-[#C5A880]/20 shadow-sm">
          <div class="bg-white rounded-[calc(2rem-0.25rem)] p-6 sm:p-7 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-5 hover:border-[#154337]/40 transition-colors">
            <div class="w-14 h-14 shrink-0 bg-[#FAF4EE] rounded-2xl border border-[#C5A880]/30 flex items-center justify-center text-[#154337] mx-auto sm:mx-0 shadow-inner">
              <Icon name="mdi:clock-outline" size="28" />
            </div>
            <div>
              <p class="text-[11px] text-[#C5A880] font-semibold tracking-widest uppercase">OPENING HOURS</p>
              <p class="text-[#154337] font-bold text-base sm:text-lg leading-snug">10:00 AM - 22:00 PM (完全預約制)</p>
            </div>
          </div>
        </div>

        <!-- 導航位置 (Button-in-Button Physics) -->
        <a href="https://maps.app.goo.gl/XFr72zB2CA26n8A68" target="_blank" class="group p-1 rounded-[2rem] bg-black/5 border border-[#C5A880]/20 shadow-sm hover:shadow-md transition-all active:scale-[0.99]">
          <div class="bg-[#FDFBF7] rounded-[calc(2rem-0.25rem)] p-6 sm:p-7 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-5 group-hover:bg-white transition-colors">
            <div class="w-14 h-14 shrink-0 bg-[#FAF4EE] rounded-2xl border border-[#C5A880]/30 flex items-center justify-center text-[#154337] group-hover:bg-[#154337] group-hover:text-white transition-colors mx-auto sm:mx-0 shadow-inner">
              <Icon name="mdi:map-marker-radius-outline" size="28" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] text-[#C5A880] font-semibold tracking-widest uppercase">OUR LOCATION</p>
              <p class="text-[#154337] font-bold text-base sm:text-lg leading-tight truncate">新北市三重區三和路三段103號1樓</p>
              <p class="text-xs text-[#C5A880] mt-1.5 font-medium flex items-center justify-center sm:justify-start gap-1.5 group-hover:text-[#154337] transition-colors">
                <span>點擊開啟 Google Maps 導航</span>
                <span class="w-5 h-5 rounded-full bg-[#C5A880]/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform">
                  <Icon name="mdi:arrow-top-right" size="14" />
                </span>
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>

    <!-- 專屬預約橫幅 (Nested CTA & Button-in-Button Architecture) -->
    <section class="p-2 rounded-[3rem] bg-[#154337]/15 border border-[#C5A880]/30 shadow-2xl">
      <div class="bg-[#154337] text-[#FAF4EE] rounded-[calc(3rem-0.5rem)] p-8 sm:p-14 text-center relative overflow-hidden">
        <!-- 柔光與金光層 -->
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute -top-36 right-0 w-96 h-96 rounded-full bg-[#C5A880]/20 blur-3xl"></div>
          <div class="absolute -bottom-36 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div class="relative z-10 space-y-5 max-w-2xl mx-auto">
          <span class="inline-block px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] bg-white/10 text-[#C5A880] border border-[#C5A880]/30 backdrop-blur-md">PRIVATE SKIN SPA</span>
          <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-luxury tracking-widest text-[#FAF4EE]">HERVIVE STUDIO 專屬療癒空間</h3>
          <p class="text-sm sm:text-base text-[#FAF4EE]/85 font-light leading-relaxed">「讓肌膚與心靈都被溫柔對待，找回發光的自己」</p>
          
          <!-- Nested Pill CTAs with Trailing Icon physics -->
          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <!-- LINE 預約 -->
            <a href="https://lin.ee/HmMJftl" target="_blank" class="group bg-[#C5A880] text-[#154337] px-7 py-3.5 rounded-full font-bold transition-all duration-300 hover:bg-white w-full sm:w-auto flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98]">
              <span>LINE 立即預約</span>
              <span class="w-7 h-7 rounded-full bg-[#154337]/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <Icon name="mdi:calendar-check" size="18" />
              </span>
            </a>
            
            <!-- Instagram -->
            <a href="https://www.instagram.com/hervive_studio/" target="_blank" class="group bg-white/10 border border-[#FAF4EE]/30 text-[#FAF4EE] px-7 py-3.5 rounded-full font-bold transition-all duration-300 hover:bg-white/20 w-full sm:w-auto flex items-center justify-center gap-3 backdrop-blur-md active:scale-[0.98]">
              <span>追蹤 Instagram</span>
              <span class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="mdi:instagram" size="18" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 雙層框體 (Doppelrand) 樣式 */
.double-bezel-outer {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(197, 168, 128, 0.25);
  padding: 0.375rem;
  border-radius: 2rem;
}

.double-bezel-inner {
  border-radius: calc(2rem - 0.375rem);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4);
}

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
  animation-delay: 0.15s;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-enter-active,
.reveal-leave-active {
  transition: opacity 0.6s cubic-bezier(0.32, 0.72, 0, 1);
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
