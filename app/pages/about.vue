<script setup>
useSeoMeta({
  title: '關於我們',
  description: '赫琟美學專注於提供客製化的美容護膚服務，由姐妹經營的有溫度美學空間。',
})
</script>

<template>
  <div class="space-y-12">
    <section class="text-center space-y-6">
      <h1 class="text-4xl font-bold text-gray-900 tracking-wide">
        關於 <span class="text-[#154337]">赫琟美學</span>
      </h1>
      <h2 class="text-xl text-[#C7CDCE] font-medium tracking-widest uppercase">Hervive Studio</h2>

      <div class="max-w-3xl mx-auto space-y-4 text-lg text-gray-600 leading-relaxed">
        <p>赫琟美學，專注於提供 <span class="text-[#154337] font-bold">客製化的美容護膚服務</span>。</p>
        <div class="bg-white border border-[#C7CDCE] p-6 rounded-2xl mt-6">
          <p class="text-sm text-gray-500">在赫琟美學，我們用溫柔的節奏與安心的環境，讓每一位走進來的妳，都能感受到自信與時尚感的提升。</p>
        </div>
      </div>
    </section>

    <section class="bg-[#C7CDCE]/10 rounded-2xl p-8 md:p-12 border border-[#C7CDCE]/30">
      <div class="text-center mb-10 text-[#154337] font-bold text-2xl">姐妹經營・有溫度的美學空間</div>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="bg-white p-8 rounded-xl shadow-sm text-center border border-[#C7CDCE] transition-all">
          <div class="text-xl font-bold text-[#154337] mb-2">姐姐・寧寧</div>
          <p class="text-gray-600 text-sm leading-relaxed">文靜細膩，擅長傾聽，<br>像一位能安心訴說的朋友。</p>
        </div>
        <div class="bg-white p-8 rounded-xl shadow-sm text-center border border-[#C7CDCE] transition-all">
          <div class="text-xl font-bold text-[#154337] mb-2">妹妹・容容</div>
          <p class="text-gray-600 text-sm leading-relaxed">活潑熱情，溫暖陪伴，<br>像始終在身旁支持妳的家人。</p>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white border border-[#C7CDCE] p-6 rounded-2xl flex items-center gap-4">
          <div class="w-12 h-12 bg-[#FAF4EE] rounded-full flex items-center justify-center text-[#154337]">
            <Icon name="mdi:clock-outline" size="24" />
          </div>
          <div>
            <p class="text-sm text-gray-400 font-medium">營業時間</p>
            <p class="text-[#154337] font-bold text-lg">11:00 AM - 21:00 PM(採預約制)</p>
          </div>
        </div>

        <a href="https://maps.app.goo.gl/XFr72zB2CA26n8A68" target="_blank"
           class="bg-white border border-[#C7CDCE] p-6 rounded-2xl flex items-center gap-4 hover:bg-[#FAF4EE] transition-colors group">
          <div class="w-12 h-12 bg-[#FAF4EE] rounded-full flex items-center justify-center text-[#154337] group-hover:bg-[#154337] group-hover:text-white transition-colors">
            <Icon name="mdi:map-marker-radius-outline" size="24" />
          </div>
          <div>
            <p class="text-sm text-gray-400 font-medium">地址資訊</p>
            <p class="text-[#154337] font-bold text-lg leading-tight">新北市三重區三和路三段103號1樓</p>
            <p class="text-xs text-[#C7CDCE] mt-1 italic underline">點擊開啟 Google Maps 導航</p>
          </div>
        </a>
      </div>
    </section>

    <section class="bg-[#154337] text-[#FAF4EE] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
      <h3 class="text-2xl font-bold mb-2">HERVIVE STUDIO 專屬療癒空間</h3>
      <p class="text-[#C7CDCE] mb-8">「讓肌膚與心靈都被溫柔對待，找回發光的自己」</p>

      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <a href="http://lin.ee/HmMJftl" target="_blank"
           class="bg-[#C7CDCE] text-[#154337] px-8 py-3 rounded-full font-bold transition hover:bg-white w-full md:w-auto flex items-center justify-center gap-2">
          <Icon name="mdi:calendar-check" /> 立即預約 LINE
        </a>
        <a href="https://www.instagram.com/hervive_studio/" target="_blank"
           class="bg-transparent border border-[#FAF4EE] text-[#FAF4EE] px-8 py-3 rounded-full font-bold transition hover:bg-[#FAF4EE]/10 w-full md:w-auto flex items-center justify-center gap-2">
          <Icon name="mdi:instagram" /> 追蹤 Instagram
        </a>
      </div>
    </section>
  </div>
</template>