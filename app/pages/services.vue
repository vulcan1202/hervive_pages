<script setup>
import { ref } from 'vue' // 引入 ref 以處理點選狀態

useSeoMeta({
  title: '服務項目',
  description: '赫琟美學提供專業皮膚管理課程：主打 Basic/Pro 水光透亮護理、藻針管理、緊顏管理及纖敏管理、訂製管理。針對毛孔粉刺清潔、肌膚暗沈、輪廓線雕塑提供客製化方案。新北三重推薦皮膚管理，讓您重拾自信美麗。',
  ogTitle: '赫琟美學 Hervive STUDIO - 專業客製化皮膚管理課程',
  ogDescription: '從基礎補水到進階緊顏，針對您的膚況量身訂製管理方案。立即查看服務內容。',
})
const activeIndex = ref(2)

const targetedManagements = [
  {
    name: '緊顏管理',
    desc: '彈力提拉，雕塑緊緻輪廓線',
    content: '透過深層緊緻按摩手技，結合手技儀器，打造氣色自然紅潤的小V臉。',
    price: '2900',
    image: '/service_face.jpg', // 插入指定的圖片路徑
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
  <div class="space-y-16 py-4">
    <section class="max-w-5xl mx-auto px-4">
      <div class="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#C7CDCE]">
        <div class="grid md:grid-cols-2 items-center">
          <div class="w-full h-full bg-[#FAF4EE] flex items-center justify-center p-4 min-h-[300px]">
            <img
              src="/service_glow.jpg"
              alt="水光透亮管理"
              class="max-w-full h-auto rounded-xl shadow-md object-cover"
            />
          </div>

          <div class="p-8 md:p-12 space-y-8">
            <div class="space-y-2">
              <h2 class="text-3xl md:text-4xl font-bold text-[#154337]">水光透亮</h2>
              <div class="flex flex-col gap-1">
                <p class="text-[#154337] font-bold text-xl">Basic $2200 / Pro $2600</p>
                <p class="text-xs text-gray-400 font-medium">※ 另有會員價，加Line、IG立刻詢問</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
                <div class="text-[#154337] font-bold text-xl mt-1">➡️</div>
                <div class="space-y-1">
                  <h4 class="font-bold text-gray-800 text-lg">毛孔粉刺清潔、膚況穩定</h4>
                  <p class="text-sm font-medium text-[#154337]">水飛梭清潔＋手工清粉刺</p>
                  <p class="text-sm text-gray-500 leading-relaxed">
                    溫和代謝老廢角質，毛孔乾淨不刺激。
                  </p>
                </div>
              </div>

              <div class="space-y-6 text-gray-600">
              <div class="flex gap-4 items-start">
                <div class="text-[#154337] font-bold text-xl mt-1">➡️</div>
                <div class="space-y-1">
                  <h4 class="font-bold text-gray-800 text-lg">水潤透亮、上妝服貼</h4>
                  <p class="text-sm text-gray-500 leading-relaxed">
                    深層補水，讓肌膚細緻有光澤，妝感更自然。
                  </p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div class="text-[#154337] font-bold text-xl mt-1">➡️</div>
                <div class="space-y-1">
                  <h4 class="font-bold text-gray-800 text-lg">提亮氣色、放鬆身心</h4>
                  <p class="text-sm font-medium text-[#154337]">精華安瓶導入＋修護軟膜（含肩頸放鬆）</p>
                  <p class="text-sm text-gray-500 leading-relaxed">
                    肌膚發光，同時好好休息一下。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-5xl mx-auto px-4 space-y-8">
      <h3 class="text-2xl font-bold text-[#154337] tracking-widest text-center">針對性管理</h3>

      <div class="flex flex-col md:flex-row gap-8 min-h-[450px]">
        <div class="md:w-1/4 flex flex-col gap-4">
          <button
            v-for="(item, index) in targetedManagements"
            :key="item.name"
            @click="activeIndex = index"
            :class="[
              'flex items-center gap-4 p-5 rounded-2xl border transition-all text-left',
              activeIndex === index
                ? 'bg-[#154337] text-white border-[#154337] shadow-md'
                : 'bg-white text-gray-700 border-[#C7CDCE] hover:bg-[#FAF4EE]'
            ]"
          >
            <Icon :name="item.icon" size="24" :class="activeIndex === index ? 'text-white' : 'text-[#154337]'" />
            <span class="font-bold">{{ item.name }}</span>
          </button>
        </div>

        <div class="md:w-3/4 bg-white p-8 rounded-[2rem] border border-[#C7CDCE] flex overflow-hidden">
          <div v-if="targetedManagements[activeIndex]" class="flex flex-col md:flex-row w-full gap-8">

            <div v-if="targetedManagements[activeIndex].image" class="md:w-1/2 flex items-center justify-center">
              <img
                :src="targetedManagements[activeIndex].image"
                class="max-h-full w-auto object-contain rounded-xl"
                alt="服務展示圖"
              />
            </div>

            <div :class="['flex flex-col flex-1', targetedManagements[activeIndex].image ? 'md:w-1/2' : 'w-full']">
              <div>
                <h4 class="text-2xl font-bold text-[#154337]">{{ targetedManagements[activeIndex].name }}</h4>
                <div class="w-12 h-1 bg-[#C7CDCE] mt-2 mb-6"></div>
              </div>

              <div class="flex-grow flex items-center">
                <p class="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {{ targetedManagements[activeIndex].content }}
                </p>
              </div>

              <div class="text-right mt-auto pt-6">
                <p class="text-2xl font-bold text-[#154337]">${{ targetedManagements[activeIndex].price }}</p>
                <p class="text-xs text-gray-400">※ 另有會員價，加Line、IG立刻詢問</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4">
      <div class="bg-[#FAF4EE] rounded-3xl p-8 border border-[#C7CDCE]">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/3 text-center md:text-left">
            <h3 class="text-xl font-bold text-[#154337]">加購服務</h3>
          </div>
          <div class="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="service in extraServices" :key="service.name"
              class="flex items-center justify-between text-gray-700 bg-white p-4 rounded-xl border border-[#C7CDCE] shadow-sm">
              <div class="flex items-center gap-2">
                <Icon name="mdi:plus-circle-outline" class="text-[#C7CDCE]" />
                <span class="text-sm font-bold">{{ service.name }}</span>
              </div>
              <span class="text-sm font-bold text-[#154337]">${{ service.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="text-center pb-12">
      <a href="http://lin.ee/HmMJftl" target="_blank"
        class="inline-flex items-center gap-2 bg-[#154337] text-[#FAF4EE] px-12 py-4 rounded-full font-bold hover:opacity-90 transition shadow-lg">
        <Icon name="mdi:calendar-check" />
        預約您的水光之旅
      </a>
    </section>
  </div>
</template>