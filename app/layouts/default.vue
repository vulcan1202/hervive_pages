<script setup lang="ts">
</script>
<template>
  <div class="min-h-screen flex flex-col font-sans bg-[#FAF4EE]">

    <header class="border-b border-[#C7CDCE] bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">

        <NuxtLink to="/" class="group flex items-center gap-2">
          <img src="/logo.jpg" alt="HEAVIVE STUDIO Logo" class="h-10 w-auto object-contain" />
        </NuxtLink>

        <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          <NuxtLink to="/" active-class="text-[#154337] font-bold" class="hover:text-[#C7CDCE] transition py-2">首頁</NuxtLink>
          <NuxtLink to="/services" active-class="text-[#154337] font-bold" class="hover:text-[#C7CDCE] transition py-2">服務項目</NuxtLink>
          <NuxtLink to="/about" active-class="text-[#154337] font-bold" class="hover:text-[#C7CDCE] transition py-2">關於我們</NuxtLink>
        </nav>

        <button class="md:hidden text-[#154337]"><Icon name="mdi:menu" size="24" /></button>
      </div>
    </header>
    <div class="w-full h-5 bg-[#154337]"></div>

    <main class="flex-grow container mx-auto px-4 py-8"><slot /></main>

    <footer class="bg-[#154337] text-[#FAF4EE] py-12 text-center text-sm relative overflow-hidden">
        <div class="relative z-10 container mx-auto px-4 space-y-4">
            <h4 class="title-serif text-lg font-bold tracking-widest text-[#C7CDCE]">HERVIVE STUDIO</h4>
            <p class="opacity-80 text-xs">專屬客製化美容護膚服務</p>
        </div>
    </footer>
  </div>
</template>