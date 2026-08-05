<script setup>
import { ref } from 'vue'

useSeoMeta({
  title: '服務項目',
  description: '赫琟美學提供專業皮膚管理課程：主打 Basic/Pro 水光透亮護理、藻針管理、緊顏管理及纖敏管理、訂製管理。針對毛孔粉刺清潔、肌膚暗沈、輪廓線雕塑提供客製化方案。新北三重推薦皮膚管理，讓您重拾自信美麗。',
  ogTitle: '赫琟美學 Hervive STUDIO - 專業客製化皮膚管理課程',
  ogDescription: '從基礎補水到進階緊顏，針對您的膚況量身訂製管理方案。立即查看服務內容。',
})

const activeIndex = ref(0)

const targetedManagements = [
  {
    name: '緊顏管理',
    desc: '彈力提拉，雕塑緊緻輪廓線',
    content: '透過深層緊緻按摩手技，結合手技儀器，打造氣色自然紅潤的小V臉',
    price: '2900',
    image: '/services/service_face.jpg',
    icon: 'mdi:face-woman-outline'
  },
  {
    name: '纖敏管理',
    desc: '穩定修復，還原健康肌膚屏障',
    content: '內容規劃中...',
    price: '2200',
    icon: 'mdi:shield-check-outline'
  },
  {
    name: '藻針管理',
    desc: '深度代謝，改善瑕疵與粗糙',
    content: '內容規劃中...',
    price: '2900',
    icon: 'mdi:leaf'
  },
  {
    name: '訂製管理',
    desc: '專屬配置，解決特定肌膚困擾',
    content: '內容規劃中...',
    price: '3200',
    icon: 'mdi:auto-fix'
  }
]

const extraServices = [
  { name: '眼周管理', price: 500 },
  { name: '臉部經絡調理', price: 800 },
  { name: '中胚導入', price: 1000 },
  { name: 'SEYO 無針水光', price: 1500 }
]
</script>

<template>
  <div class="space-y-16 sm:space-y-24 py-4 max-w-5xl mx-auto">
    <!-- 頁面標題區 -->
    <div class="text-center space-y-3">
      <span class="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] bg-white/70 text-[#C5A880] border border-[#C5A880]/30 font-medium">HERVIVE SKIN CARE MENU</span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#154337] tracking-wider">
        專屬客製 <span class="text-[#C5A880] italic">服務項目</span>
      </h1>
      <div class="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4"></div>
    </div>

    <!-- 主打課程：水光透亮 (Double-Bezel 藝廊大牌卡) -->
    <section class="double-bezel-outer">
      <div class="double-bezel-inner overflow-hidden grid md:grid-cols-2 items-stretch">
        <!-- 圖片側 -->
        <div class="bg-[#FAF4EE] p-6 sm:p-8 flex items-center justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-[#C5A880]/20 relative overflow-hidden group">
          <img
            src="/services/service_glow.jpg"
            alt="水光透亮管理"
            class="max-w-full h-auto rounded-2xl shadow-xl object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A880]/30 text-[10px] font-bold text-[#154337] tracking-widest">
            FEATURED CARE
          </div>
        </div>

        <!-- 內容細節側 -->
        <div class="p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between bg-white">
          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337] tracking-wider">水光透亮</h2>
            <div class="space-y-1">
              <p class="text-[#C5A880] font-bold text-xl sm:text-2xl font-serif-luxury">Basic $2200 <span class="text-gray-400 font-sans text-lg">/</span> Pro $2600</p>
              <p class="text-xs text-gray-400 font-light">※ 另有會員價，加Line、IG立刻詢問</p>
            </div>
          </div>

          <div class="space-y-5 text-gray-600 border-t border-b border-gray-100 py-6">
            <div class="flex gap-4 items-start">
              <div class="w-7 h-7 rounded-full bg-[#FAF4EE] border border-[#C5A880]/40 flex items-center justify-center text-[#154337] shrink-0 mt-0.5 font-bold text-xs">01</div>
              <div class="space-y-0.5">
                <h4 class="font-bold text-gray-800 text-sm sm:text-base">毛孔粉刺清潔、膚況穩定</h4>
                <p class="text-xs sm:text-sm font-medium text-[#154337]">水飛梭清潔＋手工清粉刺</p>
                <p class="text-xs text-gray-500 leading-relaxed font-light">溫和代謝老廢角質，毛孔乾淨不刺激</p>
              </div>
            </div>

            <div class="flex gap-4 items-start">
              <div class="w-7 h-7 rounded-full bg-[#FAF4EE] border border-[#C5A880]/40 flex items-center justify-center text-[#154337] shrink-0 mt-0.5 font-bold text-xs">02</div>
              <div class="space-y-0.5">
                <h4 class="font-bold text-gray-800 text-sm sm:text-base">水潤透亮、上妝服貼</h4>
                <p class="text-xs text-gray-500 leading-relaxed font-light">深層補水，讓肌膚細緻有光澤，妝感更自然</p>
              </div>
            </div>

            <div class="flex gap-4 items-start">
              <div class="w-7 h-7 rounded-full bg-[#FAF4EE] border border-[#C5A880]/40 flex items-center justify-center text-[#154337] shrink-0 mt-0.5 font-bold text-xs">03</div>
              <div class="space-y-0.5">
                <h4 class="font-bold text-gray-800 text-sm sm:text-base">提亮氣色、放鬆身心</h4>
                <p class="text-xs sm:text-sm font-medium text-[#154337]">精華安瓶導入＋修護軟膜（含肩頸放鬆）</p>
                <p class="text-xs text-gray-500 leading-relaxed font-light">肌膚發光，同時好好休息一下</p>
              </div>
            </div>
          </div>

          <a href="http://lin.ee/HmMJftl" target="_blank" class="w-full bg-[#154337] text-[#FAF4EE] py-3 rounded-full font-medium hover:bg-[#0D2C24] transition-all shadow-sm flex items-center justify-center gap-2 text-sm tracking-wider group border border-[#C5A880]/30">
            <span>預約水光透亮課程</span>
            <Icon name="mdi:arrow-right" size="16" class="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
          </a>
        </div>
      </div>
    </section>

    <!-- 針對性管理 (頁籤動態選擇器) -->
    <section class="space-y-8">
      <div class="text-center space-y-2">
        <h3 class="text-2xl font-bold font-serif-luxury text-[#154337] tracking-widest">針對性管理</h3>
        <p class="text-xs text-[#C5A880] tracking-wider uppercase font-medium">TARGETED SKIN SOLUTIONS</p>
      </div>

      <div class="flex flex-col md:flex-row gap-6 min-h-[420px]">
        <!-- 頁籤列表 -->
        <div class="md:w-1/3 flex flex-col gap-3">
          <button
            v-for="(item, index) in targetedManagements"
            :key="item.name"
            @click="activeIndex = index"
            :class="[
              'flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 text-left group',
              activeIndex === index
                ? 'bg-[#154337] text-white border-[#C5A880]/50 shadow-md'
                : 'bg-white text-gray-700 border-[#C5A880]/30 hover:border-[#154337] hover:bg-[#FAF4EE]/60'
            ]"
          >
            <div class="flex items-center gap-4">
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                activeIndex === index ? 'bg-white/10 text-[#C5A880]' : 'bg-[#FAF4EE] text-[#154337] group-hover:bg-[#154337] group-hover:text-white'
              ]">
                <Icon :name="item.icon" size="22" />
              </div>
              <div>
                <span class="font-bold text-sm sm:text-base block">{{ item.name }}</span>
                <span :class="['text-xs font-light tracking-wide block truncate max-w-[160px]', activeIndex === index ? 'text-white/80' : 'text-gray-400']">{{ item.desc }}</span>
              </div>
            </div>
            
            <Icon name="mdi:chevron-right" size="20" :class="[activeIndex === index ? 'text-[#C5A880]' : 'text-gray-300 group-hover:text-[#154337]']" />
          </button>
        </div>

        <!-- 頁籤詳細展示 -->
        <div class="md:w-2/3 double-bezel-outer flex-grow">
          <div class="double-bezel-inner p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between relative overflow-hidden bg-white">
            <div v-if="targetedManagements[activeIndex]" class="space-y-6">
              
              <div class="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                  <h4 class="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#154337]">{{ targetedManagements[activeIndex].name }}</h4>
                  <p class="text-xs text-[#C5A880] mt-1 font-medium tracking-wider">{{ targetedManagements[activeIndex].desc }}</p>
                </div>
                
                <div class="text-right">
                  <p class="text-2xl font-bold font-serif-luxury text-[#154337]">${{ targetedManagements[activeIndex].price }}</p>
                  <p class="text-[10px] text-gray-400 font-light">※ 另有會員價，加Line、IG詢問</p>
                </div>
              </div>

              <!-- 展示圖片與內容 -->
              <div class="grid md:grid-cols-2 gap-6 items-center pt-2">
                <div v-if="targetedManagements[activeIndex].image" class="rounded-2xl overflow-hidden border border-[#C5A880]/30 shadow-md">
                  <img
                    :src="targetedManagements[activeIndex].image"
                    class="w-full h-48 sm:h-56 object-cover"
                    alt="服務展示圖"
                  />
                </div>

                <div :class="[targetedManagements[activeIndex].image ? 'md:col-span-1' : 'md:col-span-2']" class="space-y-4">
                  <p class="text-gray-600 leading-relaxed text-sm sm:text-base font-light whitespace-pre-line bg-[#FAF4EE]/60 p-5 rounded-2xl border border-[#C5A880]/20">
                    {{ targetedManagements[activeIndex].content }}
                  </p>
                </div>
              </div>

            </div>

            <div class="pt-6 mt-6 border-t border-gray-100 flex justify-end">
              <a href="http://lin.ee/HmMJftl" target="_blank" class="inline-flex items-center gap-2 bg-[#154337] text-[#FAF4EE] px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-[#0D2C24] transition-all shadow-sm">
                <Icon name="mdi:calendar-check" size="18" class="text-[#C5A880]" />
                <span>諮詢此課程</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 加購服務 (Extra Services 2x2 晶透卡片) -->
    <section class="max-w-4xl mx-auto">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#C5A880]/30 shadow-sm space-y-6">
        <div class="text-center md:text-left flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-4 gap-2">
          <h3 class="text-xl font-bold font-serif-luxury text-[#154337]">加購服務</h3>
          <p class="text-xs text-gray-400 font-light">可配合主課程加購，提升保養綜合效果</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="service in extraServices"
            :key="service.name"
            class="flex items-center justify-between text-gray-700 bg-[#FAF4EE]/60 p-4 rounded-2xl border border-[#C5A880]/20 hover:border-[#154337] transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-full bg-[#154337]/10 flex items-center justify-center text-[#154337]">
                <Icon name="mdi:plus-circle-outline" size="18" />
              </div>
              <span class="text-sm font-bold text-gray-800">{{ service.name }}</span>
            </div>
            <span class="text-base font-bold font-serif-luxury text-[#154337]">${{ service.price }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部預約提示 (Bottom CTA) -->
    <section class="text-center pb-8">
      <a
        href="http://lin.ee/HmMJftl"
        target="_blank"
        class="inline-flex items-center gap-3 bg-[#154337] text-[#FAF4EE] px-10 py-4 rounded-full font-medium hover:bg-[#0D2C24] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 border border-[#C5A880]/40 group"
      >
        <Icon name="mdi:calendar-check" size="22" class="text-[#C5A880] group-hover:scale-110 transition-transform" />
        <span class="text-base tracking-wider">預約您的水光之旅</span>
      </a>
    </section>
  </div>
</template>