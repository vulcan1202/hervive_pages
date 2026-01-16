<script setup>
// 設定本頁面的 SEO
useSeoMeta({
  title: '關於赫琟美學 - HEAVIVE STUDIO',
  description: '赫琟美學專注於提供客製化的美容護膚服務，由姐妹經營的有溫度美學空間。依照您的需求量身打造專屬保養方案。',
})
</script>

<template>
  <div class="space-y-12">

    <section class="text-center space-y-6">
      <h1 class="text-4xl font-bold text-gray-900 tracking-wide">
        關於 <span class="text-rose-500">赫琟美學</span>
      </h1>
      <h2 class="text-xl text-gray-500 font-medium tracking-widest uppercase">Heavive Studio</h2>

      <div class="max-w-3xl mx-auto space-y-4 text-lg text-gray-600 leading-relaxed">
        <p>
          赫琟美學，專注於提供 <span class="text-rose-500 font-bold">客製化的美容護膚服務</span>。<br>
          我們相信，每一寸肌膚、每一段狀態，都值得被細心對待。
        </p>
        <p>
          依照顧客當下的肌膚需求與生活節奏，量身打造專屬的保養方案，<br>
          讓護理不只是保養，而是一段真正放鬆、被理解的時光。
        </p>
        <div class="bg-rose-50/50 p-6 rounded-lg mt-6">
          <p class="text-sm text-gray-500">
            在赫琟美學，我們用溫柔的節奏與安心的環境，讓每一位走進來的妳，<br>
            都能暫時放下忙碌與壓力，在護理後，不只看見肌膚的改變，也感受到自信與時尚感的提升。
          </p>
        </div>
      </div>
    </section>

    <section class="bg-rose-50 rounded-2xl p-8 md:p-12">
      <div class="text-center mb-10">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">姐妹經營・有溫度的美學空間</h3>
        <p class="text-gray-600">赫琟美學由一對攜手經營的姐妹美學師共同打造</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="bg-white p-8 rounded-xl shadow-sm text-center border border-rose-100 transform hover:-translate-y-1 transition duration-300">
          <div class="text-xl font-bold text-rose-500 mb-2">姐姐・寧寧</div>
          <p class="text-gray-600 leading-relaxed">文靜細膩，擅長傾聽，<br>像一位能安心訴說的朋友。</p>
        </div>
        <div class="bg-white p-8 rounded-xl shadow-sm text-center border border-rose-100 transform hover:-translate-y-1 transition duration-300">
          <div class="text-xl font-bold text-rose-500 mb-2">妹妹・容容</div>
          <p class="text-gray-600 leading-relaxed">活潑熱情，溫暖陪伴，<br>像始終在身旁支持妳的家人。</p>
        </div>
      </div>

      <p class="text-center text-gray-600 mt-10 italic max-w-2xl mx-auto">
        「我們都很容易共感，也常常因為顧客的故事而感動落淚。<br>
        在這裡，妳不只是顧客，而是被理解、被珍惜的存在。」
      </p>
    </section>

    <section class="grid md:grid-cols-3 gap-8">
      <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-rose-200 transition text-center group">
        <Icon name="mdi:flower-tulip-outline" size="48" class="text-rose-300 mb-4 group-hover:text-rose-500 transition" />
        <h3 class="text-xl font-bold mb-3">專注皮膚保養本質</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          以專業評估為基礎，搭配溫和、安全的護理方式，陪伴妳改善肌膚困擾，穩定膚況，找回健康光澤。
        </p>
      </div>

      <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-rose-200 transition text-center group">
        <Icon name="mdi:heart-pulse" size="48" class="text-rose-300 mb-4 group-hover:text-rose-500 transition" />
        <h3 class="text-xl font-bold mb-3">從心到肌膚的療癒</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          我們相信，真正的美，來自被好好照顧後，自然流露的安心與自信。
        </p>
      </div>

      <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-rose-200 transition text-center group">
        <Icon name="mdi:sparkles-outline" size="48" class="text-rose-300 mb-4 group-hover:text-rose-500 transition" />
        <h3 class="text-xl font-bold mb-3">內在自信</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          美，不只是臉上的光澤，而是從內心散發的自在與力量。妳的「肌膚專屬療癒所」。
        </p>
      </div>
    </section>

    <section class="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center overflow-hidden relative">
      <div class="absolute top-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>

      <h3 class="text-2xl font-bold mb-2 relative z-10">HERVIVE STUDIO 專屬療癒空間</h3>
      <p class="text-gray-400 mb-8 relative z-10">「讓肌膚與心靈都被溫柔對待，在專屬時光裡找回素顏也能發光的自己」</p>

      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 relative z-10">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-rose-300 font-bold">
            <Icon name="mdi:gift-outline" size="24" />
            <span>初次體驗專屬禮遇</span>
          </div>
          <p class="text-gray-300 pl-8">新客預約享 <span class="text-white font-bold text-lg">85 折</span></p>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-2 text-rose-300 font-bold">
            <Icon name="mdi:map-marker-outline" size="24" />
            <span>交通與空間</span>
          </div>
          <p class="text-gray-300 pl-8">採預約制・專屬接待空間<br>📍 近捷運三重國小站（步行5分鐘）</p>
        </div>
      </div>

      <div class="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
      <a
        href="https://line.me/R/ti/p/您的LineID"
        target="_blank"
        class="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-bold transition shadow-lg hover:shadow-rose-500/30 flex items-center gap-2 w-full md:w-auto justify-center"
      >
        <Icon name="mdi:calendar-check" />
        立即預約 LINE
      </a>

      <a
        href="https://www.instagram.com/hervive_studio/"
        target="_blank"
        class="bg-white text-gray-700 border border-gray-200 hover:border-rose-400 hover:text-rose-500 px-8 py-3 rounded-full font-bold transition shadow-sm hover:shadow-md flex items-center gap-2 w-full md:w-auto justify-center"
      >
        <Icon name="mdi:instagram" />
        追蹤 Instagram
      </a>

    </div>

    <div class="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1 relative z-10">
      <Icon name="mdi:qrcode-scan" /> 點擊按鈕或掃描 QR Code
    </div>
    </section>

  </div>
</template>