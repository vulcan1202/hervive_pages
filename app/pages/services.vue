<script setup>
useSeoMeta({
  title: '服務項目與課程',
  description: '赫琟美學提供專業皮膚管理課程：基礎韓式管理、客製安瓶管理、進階肌膚管理（含 6hrs淨透光、3D立體光感、海綿股珍、尊翼賦活、德卡美式調理）、頂級奢華管理，以及專屬加購護理。',
  ogTitle: '赫琟美學 HERVIVE STUDIO - 專業客製化皮膚護理課程',
  ogDescription: '從基礎韓式保濕到頂級奢華抗老管理，專屬打造細緻透亮的完美膚況。',
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
    description: '赫琟美學專注於提供客製化的美容護膚服務，包含基礎韓式管理、客製安瓶管理、進階肌膚管理、頂級奢華管理及專屬加購護理。',
  })
])

// 03 進階肌膚管理 5 大課程
const advancedSubCourses = [
  { name: '6hrs淨透光管理', desc: '持久提亮細緻 打造亮采光透肌' },
  { name: '3D立體光感管理', desc: '立體光感 彈潤緊緻 促進角質更新 平滑細緻' },
  { name: '海綿股珍管理', desc: '調理肌膚油水平衡 促進角質更新' },
  { name: '尊翼賦活管理', desc: '乳酸菌、PDRN配方 賦活緊緻 彈潤光采' },
  { name: '德卡美式調理', desc: '美式調理手法 角質更新管理 釋放壓力' }
]

// 04 頂級奢華管理 特色
const luxuryFeatures = [
  { subtitle: '全方位輪廓管理', content: '奢華修護抗老 全方位調理 輪廓清新重現年輕光采' },
  { subtitle: '益膚乳酸菌', content: '乳酸菌外囊泡技術 平衡肌膚微生態強健屏障 穩定膚況' }
]

// 可加購項目
const extraServices = [
  { name: '眼周護理', price: '300' },
  { name: '全臉撥經', price: '600' },
  { name: '淨化離子', price: '800' },
  { name: '小顏手技', price: '1,000' },
  { name: '輪廓管理', price: '1,200' },
]
</script>

<template>
  <div class="space-y-8 sm:space-y-14 py-4 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6 relative">
    <!-- 柔光氣氛燈背景 -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#154337]/5 blur-3xl"></div>
      <div class="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl"></div>
    </div>

    <!-- Editorial Hero Header -->
    <section class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 sm:pb-7 border-b border-[#C5A880]/30">
      <div class="space-y-1 sm:space-y-2">
        <p class="text-[10px] sm:text-xs text-[#C5A880] tracking-[0.25em] uppercase font-medium">HERVIVE SERVICES</p>
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#154337] tracking-wider">
          服務課程 <span class="text-[#C5A880] font-normal italic">Menu</span>
        </h1>
      </div>
      <p class="text-xs sm:text-sm text-gray-500 max-w-xs sm:max-w-sm font-light leading-relaxed tracking-wider">
        針對即時膚況需求，以溫柔手技與專業調理，喚醒肌膚深層的透亮與平衡。
      </p>
    </section>

    <!-- 所有課程獨立框框區域 (獨立排列向下延伸) -->
    <section class="space-y-6 sm:space-y-8">
      <!-- 01 基礎韓式管理 -->
      <div class="bg-[#FAF7F2] p-5 sm:p-8 rounded-2xl border border-[#C5A880]/30 space-y-5 sm:space-y-6 shadow-sm hover:border-[#154337]/30 transition-all">
        <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-[#C5A880]/25">
          <div>
            <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#C5A880]/60 block mb-0.5">01</span>
            <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#154337] tracking-wider">基礎韓式管理</h2>
            <p class="text-xs text-[#C5A880] font-semibold tracking-wider mt-1">深層清潔 X 保濕</p>
          </div>
          <div class="text-right shrink-0">
            <span class="text-xl sm:text-3xl font-bold font-serif-luxury text-[#154337]">$1,800</span>
          </div>
        </div>

        <p class="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
          維持肌膚健康穩定，深層清潔毛孔同時補足水分，還原肌膚原本的淨透質感。
        </p>

        <div class="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
          <span class="text-[11px] sm:text-xs px-3 py-1 rounded-lg bg-white text-[#154337] border border-[#C5A880]/25 font-medium shadow-2xs">深層清潔毛孔</span>
          <span class="text-[11px] sm:text-xs px-3 py-1 rounded-lg bg-white text-[#154337] border border-[#C5A880]/25 font-medium shadow-2xs">溫和水潤保濕</span>
          <span class="text-[11px] sm:text-xs px-3 py-1 rounded-lg bg-white text-[#154337] border border-[#C5A880]/25 font-medium shadow-2xs">維持肌膚穩定</span>
        </div>

        <div class="pt-4 border-t border-[#C5A880]/20 flex justify-end">
          <NuxtLink to="/booking" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#154337] text-[#FAF4EE] px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#0D2C24] transition-all shadow-sm active:scale-[0.98]">
            <span>立即預約課程</span>
            <Icon name="mdi:arrow-right" size="16" class="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
          </NuxtLink>
        </div>
      </div>

      <!-- 02 客製安瓶管理 -->
      <div class="bg-white p-5 sm:p-8 rounded-2xl border border-[#154337]/20 space-y-5 sm:space-y-6 shadow-sm hover:border-[#154337]/50 transition-all">
        <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-gray-100">
          <div>
            <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337]/40 block mb-0.5">02</span>
            <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#154337] tracking-wider">客製安瓶管理</h2>
            <p class="text-xs text-[#C5A880] font-semibold tracking-wider mt-1">依膚況搭配客製化安瓶與輪廓手技</p>
          </div>
          <div class="text-right shrink-0">
            <span class="text-xl sm:text-3xl font-bold font-serif-luxury text-[#154337]">$2,200</span>
          </div>
        </div>

        <p class="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
          結合深層清潔與客製安瓶導入，搭配手技按摩加強臉部輪廓，打造健康透亮、細緻有光澤的膚況。
        </p>

        <div class="pt-1 text-xs sm:text-sm text-[#154337] font-medium tracking-wider flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#C5A880] shrink-0"></span>
          <span class="leading-relaxed">鎖定補水 • 亮白潤澤 • 毛孔彈潤</span>
        </div>

        <div class="pt-4 border-t border-gray-100 flex justify-end">
          <NuxtLink to="/booking" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#154337] text-[#FAF4EE] px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#0D2C24] transition-all shadow-sm active:scale-[0.98]">
            <span>立即預約課程</span>
            <Icon name="mdi:arrow-right" size="16" class="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
          </NuxtLink>
        </div>
      </div>

      <!-- 03 進階肌膚管理 -->
      <div class="bg-[#FAF7F2] p-5 sm:p-8 rounded-2xl border border-[#C5A880]/30 space-y-5 sm:space-y-6 shadow-sm hover:border-[#154337]/30 transition-all">
        <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-[#C5A880]/25">
          <div>
            <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#C5A880]/60 block mb-0.5">03</span>
            <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#154337] tracking-wider">進階肌膚管理</h2>
            <p class="text-xs text-[#C5A880] font-medium tracking-wider mt-1">包含以下 5 大精準管理課程：</p>
          </div>
          <div class="text-right shrink-0">
            <span class="text-xl sm:text-3xl font-bold font-serif-luxury text-[#154337]">$2,800</span>
          </div>
        </div>

        <div class="divide-y divide-[#C5A880]/20">
          <div
            v-for="(sub, idx) in advancedSubCourses"
            :key="sub.name"
            class="py-3 sm:py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 group"
          >
            <div class="flex items-center gap-2.5">
              <span class="text-xs font-mono text-[#C5A880] font-bold shrink-0">0{{ idx + 1 }}</span>
              <h3 class="font-bold text-[#154337] text-xs sm:text-base group-hover:text-[#C5A880] transition-colors tracking-wide">{{ sub.name }}</h3>
            </div>
            <p class="text-xs text-gray-600 font-light tracking-wider sm:text-right pl-6 sm:pl-0 leading-relaxed">{{ sub.desc }}</p>
          </div>
        </div>

        <div class="pt-4 border-t border-[#C5A880]/20 flex justify-end">
          <NuxtLink to="/booking" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#154337] text-[#FAF4EE] px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#0D2C24] transition-all shadow-sm active:scale-[0.98]">
            <span>立即預約課程</span>
            <Icon name="mdi:arrow-right" size="16" class="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
          </NuxtLink>
        </div>
      </div>

      <!-- 04 頂級奢華管理 -->
      <div class="bg-[#154337] text-[#FAF4EE] p-5 sm:p-8 rounded-2xl relative overflow-hidden space-y-5 sm:space-y-6 shadow-xl">
        <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-[#C5A880]/30">
          <div>
            <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#C5A880]/60 block mb-0.5">04</span>
            <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#FAF4EE] tracking-widest">頂級奢華管理</h2>
            <p class="text-xs text-[#C5A880] tracking-widest mt-1">全方位奢華抗老與肌膚屏障穩定</p>
          </div>
          <div class="text-right shrink-0">
            <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#C5A880]">$3,200</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <div v-for="(item, i) in luxuryFeatures" :key="i" class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0"></span>
              <h3 class="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF4EE] tracking-wide">{{ item.subtitle }}</h3>
            </div>
            <p class="text-xs sm:text-sm text-[#FAF4EE]/80 font-light leading-relaxed tracking-wider pl-3.5">
              {{ item.content }}
            </p>
          </div>
        </div>

        <div class="pt-4 border-t border-[#C5A880]/30 flex justify-end">
          <NuxtLink to="/booking" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C5A880] text-[#154337] px-7 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-white transition-all shadow-md active:scale-[0.98]">
            <span>立即預約課程</span>
            <Icon name="mdi:arrow-right" size="16" class="group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 可加購項目 -->
    <section class="space-y-4 pt-2">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 pb-3 border-b border-[#C5A880]/30">
        <div>
          <p class="text-[10px] sm:text-xs text-[#C5A880] tracking-[0.2em] uppercase font-medium">ADD-ONS</p>
          <h2 class="text-lg sm:text-2xl font-bold font-serif-luxury text-[#154337] tracking-wider">可加購項目</h2>
        </div>
        <p class="text-xs text-gray-500 font-light">配合主課程自由加購，提升護理效果與放鬆感受</p>
      </div>

      <div class="bg-white p-4 sm:p-7 rounded-2xl border border-gray-200/80 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-12">
          <div
            v-for="service in extraServices"
            :key="service.name"
            class="flex items-center justify-between border-b border-gray-100/80 pb-2.5 group"
          >
            <span class="text-xs sm:text-sm font-bold text-gray-800 tracking-wide group-hover:text-[#154337] transition-colors">{{ service.name }}</span>
            <div class="flex items-baseline gap-1">
              <span class="text-xs text-[#C5A880] font-medium">+</span>
              <span class="text-sm sm:text-base font-bold font-serif-luxury text-[#154337]">${{ service.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 線上預約 -->
    <section class="text-center pt-2 pb-4">
      <NuxtLink
        to="/booking"
        class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#154337] text-[#FAF4EE] px-8 py-3.5 sm:px-9 sm:py-4 rounded-xl font-semibold hover:bg-[#0D2C24] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
      >
        <Icon name="mdi:calendar-check" size="20" class="text-[#C5A880] group-hover:scale-110 transition-transform" />
        <span class="text-sm sm:text-base tracking-wider">立即預約課程</span>
      </NuxtLink>
    </section>
  </div>
</template>