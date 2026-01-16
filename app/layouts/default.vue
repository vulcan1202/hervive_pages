<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">

    <header class="border-b border-rose-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">

        <NuxtLink to="/" class="group flex items-center gap-2">

          <img src="/logo.jpg" alt="HEAVIVE STUDIO Logo" class="h-10 w-auto object-contain" />

          </NuxtLink>

        <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          <NuxtLink to="/" active-class="text-rose-500 font-bold" class="hover:text-rose-400 transition flex items-center gap-1 py-2">首頁</NuxtLink>
          <NuxtLink to="/about" active-class="text-rose-500 font-bold" class="hover:text-rose-400 transition flex items-center gap-1 py-2">關於我們</NuxtLink>
        </nav>

        <button class="md:hidden text-gray-600"><Icon name="mdi:menu" size="24" /></button>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8"><slot /></main>
    <footer class="bg-gray-900 text-white py-12 text-center text-sm relative overflow-hidden">
        <div class="relative z-10 container mx-auto px-4 space-y-4">
            <h4 class="text-lg font-bold tracking-widest text-rose-500">HEAVIVE STUDIO</h4>
             </div>
    </footer>

  </div>
</template>