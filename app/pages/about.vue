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
  { src: '/view_photo/views3.jpg', mode: 'cover' }
]
let timer = null

const resetTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % photos.length
  }, 4000)
}

onMounted(() => { resetTimer() })
onUnmounted(() => { if (timer) clearInterval(timer) })

const selectImage = (index) => {
  currentImage.value = index
  resetTimer()
}
</script>

<template>
  <div class="space-y-12">
    <section class="max-w-5xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div class="w-full md:w-2/5 relative">
          <img
            :src="'/about/about_logo.jpg'"
            alt="Hervive Studio Logo"
            class="w-full h-auto object-cover shadow-2xl border border-white/50 relative z-10"
          />
          <div class="absolute top-4 left-4 w-full h-full bg-[#C7CDCE]/20 -z-10"></div>
        </div>
        <div class="w-full md:w-3/5 space-y-8 flex flex-col justify-center slide-in-from-left">
          <div class="space-y-2 text-left">
            <h1 class="text-4xl font-bold text-gray-900 tracking-wide">關於 <span class="text-[#154337]">赫琟美學</span></h1>
            <h2 class="text-xl text-[#C7CDCE] font-medium tracking-widest uppercase">Hervive Studio</h2>
          </div>
          <div class="space-y-6 text-lg text-gray-600 leading-relaxed text-center md:text-left">
            <p class="font-medium">赫琟美學，專注於提供 <span class="text-[#154337] font-bold">客製化的美容護膚服務</span>。</p>
            <div class="relative py-4 px-2">
              <Icon name="mdi:format-quote-open" class="absolute -top-2 -left-2 text-[#C7CDCE]/30" size="40" />
              <p class="italic text-[#154337]/80 tracking-widest leading-loose font-light">
                在赫琟美學，我們用溫柔的節奏與安心的環境，<br class="hidden md:block">
                讓每一位走進來的妳，都能感受到自信與時尚感的提升。
              </p>
              <Icon name="mdi:format-quote-close" class="absolute -bottom-2 -right-2 text-[#C7CDCE]/30" size="40" />
              <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#C7CDCE] to-transparent mx-auto md:mx-0 mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex flex-col md:flex-row items-stretch gap-0 relative">

        <div class="md:w-5/12 p-8 md:p-12 flex flex-col justify-center space-y-10 bg-white border-y border-l border-[#C7CDCE]/40 relative z-10">
          <div class="space-y-4">
            <div class="inline-block border-b-2 border-[#154337] pb-1">
              <h3 class="text-3xl font-serif text-[#154337] tracking-widest">姐妹經營</h3>
            </div>
            <p class="text-[#C7CDCE] text-sm font-medium tracking-[0.3em] uppercase">具有專業與溫度的美學空間</p>
          </div>

          <div class="space-y-10">
            <div class="group">
              <div class="mb-3">
                <span class="text-2xl font-bold text-[#154337]">寧寧</span>
                <span class="ml-2 text-[12px] text-gray-400 font-medium tracking-widest">/ 姐姐</span>
              </div>
              <p class="text-gray-600 leading-relaxed tracking-wider text-sm border-l border-gray-200 pl-4 group-hover:border-[#C7CDCE] transition-colors">
                文靜細膩，擅長傾聽，<br>
                像一位能安心訴說的朋友，用最細緻的手法呵護你/妳
              </p>
            </div>

            <div class="group">
              <div class="mb-3">
                <span class="text-2xl font-bold text-[#154337]">容容</span>
                <span class="ml-2 text-[12px] text-gray-400 font-medium tracking-widest">/ 妹妹</span>
              </div>
              <p class="text-gray-600 leading-relaxed tracking-wider text-sm border-l border-gray-200 pl-4 group-hover:border-[#C7CDCE] transition-colors">
                活潑熱情，溫暖陪伴，<br>
                像始終在身旁支持妳的家人，為你/妳注入自信的能量
              </p>
            </div>
          </div>
        </div>

        <div class="md:w-7/12 relative h-[450px] md:h-[550px] bg-[#FAFAFA] border-l border-[#C7CDCE]/20">
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
                class="w-full h-full object-contain stable-zoom"
                alt="Studio View"
              />

            </div>
          </transition>

          <div class="absolute bottom-6 right-8 flex gap-3 z-20">
            <button
              v-for="(_, index) in photos"
              :key="index"
              @click="selectImage(index)"
              class="group py-2 focus:outline-none"
            >
              <div
                class="h-[2px] transition-all duration-500 shadow-sm drop-shadow-md"
                :class="currentImage === index
                  ? 'bg-[#154337] w-12'
                  : 'bg-[#154337]/40 w-6 group-hover:bg-[#154337]/70'"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white border border-[#C7CDCE] p-6 rounded-2xl flex items-center gap-4">
          <div class="w-12 h-12 bg-[#FAF4EE] rounded-full flex items-center justify-center text-[#154337]"><Icon name="mdi:clock-outline" size="24" /></div>
          <div>
            <p class="text-sm text-gray-400 font-medium tracking-tighter">OPENING HOURS</p>
            <p class="text-[#154337] font-bold text-lg">11:00 AM - 21:00 PM (採預約制)</p>
          </div>
        </div>
        <a href="https://maps.app.goo.gl/XFr72zB2CA26n8A68" target="_blank" class="bg-white border border-[#C7CDCE] p-6 rounded-2xl flex items-center gap-4 hover:bg-[#FAF4EE] transition-colors group">
          <div class="w-12 h-12 bg-[#FAF4EE] rounded-full flex items-center justify-center text-[#154337] group-hover:bg-[#154337] group-hover:text-white transition-colors"><Icon name="mdi:map-marker-radius-outline" size="24" /></div>
          <div>
            <p class="text-sm text-gray-400 font-medium tracking-tighter">OUR LOCATION</p>
            <p class="text-[#154337] font-bold text-lg leading-tight">新北市三重區三和路三段103號1樓</p>
            <p class="text-xs text-[#C7CDCE] mt-1 italic underline">點擊開啟 Google Maps 導航</p>
          </div>
        </a>
      </div>
    </section>

    <section class="bg-[#154337] text-[#FAF4EE] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
      <h3 class="text-2xl font-bold mb-2 tracking-widest">HERVIVE STUDIO 專屬療癒空間</h3>
      <p class="text-[#C7CDCE] mb-8 font-light">「讓肌膚與心靈都被溫柔對待，找回發光的自己」</p>
      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <a href="http://lin.ee/HmMJftl" target="_blank" class="bg-[#C7CDCE] text-[#154337] px-8 py-3 rounded-full font-bold transition hover:bg-white w-full md:w-auto flex items-center justify-center gap-2 shadow-md"><Icon name="mdi:calendar-check" /> 立即預約 LINE</a>
        <a href="https://www.instagram.com/hervive_studio/" target="_blank" class="bg-transparent border border-[#FAF4EE] text-[#FAF4EE] px-8 py-3 rounded-full font-bold transition hover:bg-[#FAF4EE]/10 w-full md:w-auto flex items-center justify-center gap-2"><Icon name="mdi:instagram" /> 追蹤 Instagram</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 原有的穩定縮放設定 */
.stable-zoom {
  transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backface-visibility: hidden;
  transform: translateZ(0) scale(1);
  perspective: 1000px;
  will-change: transform;
}

/* 文字滑入動畫定義 */
.slide-in-from-left {
  opacity: 0;
  animation: slideInFromLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.2s;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.reveal-enter-active,
.reveal-leave-active {
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.reveal-leave-to {
  opacity: 0;
}
</style>