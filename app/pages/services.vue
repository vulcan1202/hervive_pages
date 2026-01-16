<script setup>
useSeoMeta({
  title: '服務項目 - 赫琟美學 HEAVIVE STUDIO',
  description: '主打水光透亮護理，提供纖敏、藻針、緊顏及客製化訂製管理，專業針對性皮膚護理。',
})

const targetedManagements = [
  { name: '纖敏管理', desc: '穩定修復，還原健康肌膚屏障', icon: 'mdi:shield-check-outline' },
  { name: '藻針管理', desc: '深度代謝，改善瑕疵與粗糙', icon: 'mdi:leaf' },
  { name: '緊顏管理', desc: '彈力提拉，雕塑緊緻輪廓線', icon: 'mdi:face-woman-outline' },
  { name: '訂製管理', desc: '專屬配置，解決特定肌膚困擾', icon: 'mdi:auto-fix' }
]

const extraServices = ['眼周管理', '臉部經絡調理', '中胚導入', 'SEYO 無針水光']
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
              <p class="text-[#C7CDCE] font-bold text-xl">價格 $1800 起</p>
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
                  <h4 class="font-bold text-gray-800 text-lg">毛孔粉刺清潔、膚況穩定</h4>
                  <p class="text-sm font-medium text-[#154337]">水飛梭清潔＋手工清粉刺</p>
                  <p class="text-sm text-gray-500 leading-relaxed">
                    溫和代謝老廢角質，毛孔乾淨不刺激。
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

    <section class="max-w-5xl mx-auto px-4 space-y-8 text-center">
      <h3 class="text-2xl font-bold text-[#154337] tracking-widest">針對性管理</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="item in targetedManagements" :key="item.name"
             class="bg-white p-6 rounded-2xl border border-[#C7CDCE] hover:bg-[#FAF4EE] transition">
          <Icon :name="item.icon" size="32" class="text-[#154337] mb-3" />
          <h4 class="font-bold text-gray-800">{{ item.name }}</h4>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4">
      <div class="bg-[#FAF4EE] rounded-3xl p-8 border border-[#C7CDCE]">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/3 text-center md:text-left">
            <h3 class="text-xl font-bold text-[#154337]">加購服務</h3>
          </div>
          <div class="md:w-2/3 grid grid-cols-2 gap-4">
            <div v-for="service in extraServices" :key="service"
              class="flex items-center gap-2 text-gray-700 bg-white p-3 rounded-xl border border-[#C7CDCE] shadow-sm">
              <Icon name="mdi:plus-circle-outline" class="text-[#C7CDCE]" />
              <span class="text-sm font-medium">{{ service }}</span>
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