<script setup>
useSeoMeta({
  title: '服務項目與課程',
  description: '芯荷肌膚養護提供專業皮膚管理課程：基礎韓式管理、客製安瓶管理、進階肌膚管理（含 6hrs淨透光、3D立體光感、海綿股珍、尊翼賦活、德卡美式調理）、頂級奢華管理，以及專屬加購護理。',
  ogTitle: '芯荷肌膚養護 HERVIVE STUDIO - 專業客製化皮膚護理課程',
  ogDescription: '從基礎韓式保濕到頂級奢華抗老管理，專屬打造細緻透亮的完美膚況。',
})

useSchemaOrg([
  defineLocalBusiness({
    name: '芯荷肌膚養護 HERVIVE STUDIO',
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
    openingHours: [{ opens: '10:00', closes: '21:00', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
    description: '芯荷肌膚養護專注於提供客製化的美容護膚服務，包含基礎韓式管理、客製安瓶管理、進階肌膚管理、頂級奢華管理及專屬加購護理。',
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
  { name: '眼周深層賦活', price: '300', tag: '舒緩疲勞' },
  { name: '全臉古法撥經', price: '600', tag: '提亮氣色' },
  { name: '淨化負離子導入', price: '800', tag: '深入毛孔' },
  { name: '獨家小顏緊顏手技', price: '1,000', tag: '人氣首選' },
  { name: '頂級客製輪廓管理', price: '1,200', tag: '全臉塑顏' },
]
</script>

<template>
  <div class="space-y-10 sm:space-y-14 py-4 sm:py-8 max-w-6xl mx-auto px-4 sm:px-6 relative">
    <!-- 柔光氣氛燈背景 -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#154337]/5 blur-3xl"></div>
      <div class="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl"></div>
    </div>

    <!-- Editorial Hero Header -->
    <section class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#C5A880]/30">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C5A880]/30 text-xs uppercase tracking-[0.25em] font-semibold text-[#8A6A3B] shadow-xs">
          <span>HERVIVE SPA MENU</span>
        </div>
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#154337] tracking-wider">
          服務課程 <span class="text-[#8A6A3B] font-normal italic">Collection</span>
        </h1>
      </div>
      <p class="text-xs sm:text-sm text-gray-500 max-w-md font-light leading-relaxed tracking-wider">
        不隨波逐流於標準化公式。依據即時膚況需求，以溫柔手技與科學調理，喚醒肌膚深層的透亮平衡。
      </p>
    </section>

    <!-- Week 08 Two-Column 雙欄雜誌排版架構 (<article> + <aside>) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      
      <!-- 主內容區 (<article> 佔據 8 欄)：精選四大護理課程 -->
      <article class="lg:col-span-8 space-y-6 sm:space-y-8">
        
        <!-- 01 基礎韓式管理 -->
        <div class="double-bezel-outer group hover:-translate-y-1 transition-all duration-400">
          <div class="double-bezel-inner p-6 sm:p-8 bg-[#FAF7F2] space-y-5 rounded-2xl relative">
            <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-[#C5A880]/25">
              <div>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#8A6A3B] block mb-0.5">01</span>
                <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#154337] tracking-wider">基礎韓式管理</h2>
                <p class="text-xs text-[#8A6A3B] font-semibold tracking-wider mt-1">深層清潔 × 水潤保濕</p>
              </div>
              <div class="text-right shrink-0">
                <span class="text-xs text-gray-400 font-light mr-1">單堂護理</span>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tabular-nums">$1,800</span>
              </div>
            </div>

            <p class="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
              維持肌膚健康穩定，深層清潔毛孔髒污與老舊堆積角質，同時補足水分，還原肌膚原本的純淨透亮質感。
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span class="text-xs px-3 py-1 rounded-lg bg-white text-[#154337] border border-[#C5A880]/25 font-medium shadow-xs">深層毛孔淨透</span>
              <span class="text-xs px-3 py-1 rounded-lg bg-white text-[#154337] border border-[#C5A880]/25 font-medium shadow-xs">溫和水潤保濕</span>
              <span class="text-xs px-3 py-1 rounded-lg bg-white text-[#154337] border border-[#C5A880]/25 font-medium shadow-xs">穩定膚質屏障</span>
            </div>

            <div class="pt-4 border-t border-[#C5A880]/20 flex justify-end">
              <NuxtLink :to="{ path: '/booking', query: { service: '基礎韓式管理' } }" class="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#154337] hover:text-[#8A6A3B] transition-colors">
                <span>預約此課程</span>
                <span class="w-6 h-6 rounded-full bg-[#154337]/10 flex items-center justify-center text-[#154337] group-hover/btn:translate-x-1 transition-transform">
                  <Icon name="mdi:arrow-right" size="14" />
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 02 客製安瓶管理 -->
        <div class="double-bezel-outer group hover:-translate-y-1 transition-all duration-400">
          <div class="double-bezel-inner p-6 sm:p-8 bg-white space-y-5 rounded-2xl relative">
            <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-gray-100">
              <div>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337]/40 block mb-0.5">02</span>
                <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#154337] tracking-wider">客製安瓶管理</h2>
                <p class="text-xs text-[#8A6A3B] font-semibold tracking-wider mt-1">依即時膚況搭配專屬安瓶導入與輪廓手技</p>
              </div>
              <div class="text-right shrink-0">
                <span class="text-xs text-gray-400 font-light mr-1">單堂護理</span>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tabular-nums">$2,200</span>
              </div>
            </div>

            <p class="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
              結合深層清潔與量身客製的安瓶活性精華導入，搭配細緻手技按摩加強臉部輪廓放鬆，打造健康透亮、彈潤飽滿的膚況。
            </p>

            <div class="pt-1 text-xs sm:text-sm text-[#154337] font-medium tracking-wider flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#C5A880] shrink-0"></span>
              <span class="leading-relaxed">精準補水 • 亮白潤澤 • 毛孔緊緻彈潤</span>
            </div>

            <div class="pt-4 border-t border-gray-100 flex justify-end">
              <NuxtLink :to="{ path: '/booking', query: { service: '客製安瓶管理' } }" class="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#154337] hover:text-[#8A6A3B] transition-colors">
                <span>預約此課程</span>
                <span class="w-6 h-6 rounded-full bg-[#154337]/10 flex items-center justify-center text-[#154337] group-hover/btn:translate-x-1 transition-transform">
                  <Icon name="mdi:arrow-right" size="14" />
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 03 進階肌膚管理 (5 大子項目精緻折疊展演) -->
        <div class="double-bezel-outer group hover:-translate-y-1 transition-all duration-400">
          <div class="double-bezel-inner p-6 sm:p-8 bg-[#FAF7F2] space-y-6 rounded-2xl relative">
            <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-[#C5A880]/25">
              <div>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#8A6A3B] block mb-0.5">03</span>
                <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#154337] tracking-wider">進階肌膚管理</h2>
                <p class="text-xs text-[#8A6A3B] font-medium tracking-wider mt-1">針對深層需求，包含以下 5 大專案精準調理：</p>
              </div>
              <div class="text-right shrink-0">
                <span class="text-xs text-gray-400 font-light mr-1">單堂護理</span>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tabular-nums">$2,800</span>
              </div>
            </div>

            <!-- 5 大課程列表 -->
            <div class="divide-y divide-[#C5A880]/20 bg-white/70 rounded-xl p-3 border border-[#C5A880]/20">
              <div
                v-for="(sub, idx) in advancedSubCourses"
                :key="sub.name"
                class="py-3 px-2 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 group/sub"
              >
                <div class="flex items-center gap-2.5">
                  <span class="text-xs font-mono text-[#8A6A3B] font-bold shrink-0">0{{ idx + 1 }}</span>
                  <h3 class="font-bold text-[#154337] text-xs sm:text-sm group-hover/sub:text-[#8A6A3B] transition-colors tracking-wide">{{ sub.name }}</h3>
                </div>
                <p class="text-xs text-gray-600 font-light tracking-wider sm:text-right pl-6 sm:pl-0 leading-relaxed">{{ sub.desc }}</p>
              </div>
            </div>

            <div class="pt-4 border-t border-[#C5A880]/20 flex justify-end">
              <NuxtLink :to="{ path: '/booking', query: { service: '進階肌膚管理' } }" class="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#154337] hover:text-[#8A6A3B] transition-colors">
                <span>預約此課程</span>
                <span class="w-6 h-6 rounded-full bg-[#154337]/10 flex items-center justify-center text-[#154337] group-hover/btn:translate-x-1 transition-transform">
                  <Icon name="mdi:arrow-right" size="14" />
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 04 頂級奢華管理 (Dark Forest Green 旗艦卡片) -->
        <div class="p-1 rounded-[2rem] bg-[#154337]/15 border border-[#C5A880]/30 shadow-xl">
          <div class="bg-[#154337] text-[#FAF4EE] p-6 sm:p-9 rounded-[calc(2rem-0.25rem)] relative overflow-hidden space-y-6">
            <!-- 柔金光暈裝飾 -->
            <div class="pointer-events-none absolute inset-0">
              <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#C5A880]/20 blur-3xl"></div>
            </div>

            <div class="flex flex-row items-baseline justify-between gap-2 pb-4 border-b border-[#C5A880]/30 relative z-10">
              <div>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#C5A880]/80 block mb-0.5">04</span>
                <h2 class="text-xl sm:text-2xl font-bold font-serif-luxury text-[#FAF4EE] tracking-widest">頂級奢華管理</h2>
                <p class="text-xs text-[#C5A880] tracking-widest mt-1">全方位奢華抗老修護與肌膚微生態強健</p>
              </div>
              <div class="text-right shrink-0">
                <span class="text-xs text-[#FAF4EE]/60 font-light mr-1">旗艦奢華</span>
                <span class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#C5A880] tabular-nums">$3,200</span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              <div v-for="(item, i) in luxuryFeatures" :key="i" class="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0"></span>
                  <h3 class="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF4EE] tracking-wide">{{ item.subtitle }}</h3>
                </div>
                <p class="text-xs text-[#FAF4EE]/80 font-light leading-relaxed tracking-wider pl-3.5">
                  {{ item.content }}
                </p>
              </div>
            </div>

            <div class="pt-4 border-t border-[#C5A880]/30 flex justify-end relative z-10">
              <NuxtLink :to="{ path: '/booking', query: { service: '頂級奢華管理' } }" class="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FAF4EE] hover:text-[#C5A880] transition-colors">
                <span>預約頂級奢華管理</span>
                <span class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-[#FAF4EE] group-hover/btn:translate-x-1 transition-transform">
                  <Icon name="mdi:arrow-right" size="14" />
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>

      </article>

      <!-- 側邊欄 (<aside> 佔據 4 欄，Week 08 Sticky 佈局)：加購項目與沙龍服務承諾 -->
      <aside class="lg:col-span-4 lg:sticky lg:top-24 space-y-6 self-start">
        
        <!-- 卡片 1: 專屬升級加購清單 (Add-ons Menu) -->
        <div class="double-bezel-outer shadow-sm">
          <div class="double-bezel-inner p-6 bg-white space-y-4 rounded-2xl">
            <div class="border-b border-[#C5A880]/25 pb-3">
              <div class="flex items-center justify-between">
                <span class="text-xs text-[#8A6A3B] tracking-[0.2em] uppercase font-semibold">TREATMENT ADD-ONS</span>
                <Icon name="mdi:plus-circle-outline" class="text-[#C5A880]" size="18" />
              </div>
              <h2 class="text-lg font-bold font-serif-luxury text-[#154337] tracking-wider mt-1">課程專屬加購</h2>
              <p class="text-[11px] text-gray-500 font-light mt-0.5">可於預約主課程時彈性加購，加乘修護效果</p>
            </div>

            <div class="space-y-3">
              <div
                v-for="service in extraServices"
                :key="service.name"
                class="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF4EE] transition-colors border border-gray-100 group"
              >
                <div>
                  <span class="text-xs sm:text-sm font-bold text-gray-800 tracking-wide block group-hover:text-[#154337] transition-colors">
                    {{ service.name }}
                  </span>
                  <span class="text-[10px] text-[#8A6A3B] bg-[#C5A880]/15 px-1.5 py-0.5 rounded font-medium">
                    {{ service.tag }}
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-xs text-[#8A6A3B] font-medium mr-0.5">+</span>
                  <span class="text-sm font-bold font-serif-luxury text-[#154337] tabular-nums">${{ service.price }}</span>
                </div>
              </div>
            </div>

            <div class="pt-2">
              <NuxtLink
                to="/booking"
                class="w-full bg-[#154337] text-[#FAF4EE] py-3 rounded-full text-xs font-semibold tracking-wider hover:bg-[#0D2C24] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <Icon name="mdi:calendar-check" size="16" class="text-[#C5A880]" />
                <span>立即安排線上預約</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 卡片 2: 沙龍私密呵護承諾 (Salon Etiquette) -->
        <div class="p-5 rounded-2xl bg-[#FDFBF7] border border-[#C5A880]/30 space-y-3 text-xs text-gray-600">
          <div class="flex items-center gap-2 text-[#154337] font-bold">
            <Icon name="mdi:shield-heart-outline" size="18" class="text-[#8A6A3B]" />
            <span class="tracking-wide">芯荷肌膚護理承諾</span>
          </div>
          <ul class="space-y-2 font-light tracking-wide text-[11px] sm:text-xs">
            <li class="flex items-start gap-1.5">
              <span class="text-[#C5A880] font-bold">•</span>
              <span><strong>完全預約制</strong>：全時段保有專屬私密空間，保障每位訪客的放鬆品質。</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-[#C5A880] font-bold">•</span>
              <span><strong>時段保護機制</strong>：每位貴賓享有完整預留時間，不趕場、不中斷。</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-[#C5A880] font-bold">•</span>
              <span><strong>絕無推銷壓力</strong>：真誠傾聽當日膚況，只提供妳真正需要的護理建議。</span>
            </li>
          </ul>
        </div>

      </aside>

    </div>
  </div>
</template>
