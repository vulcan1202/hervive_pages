<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">

    <header class="border-b border-rose-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">

        <NuxtLink to="/" class="group flex items-center gap-2">
          <div class="text-xl font-bold tracking-[0.15em] text-gray-800 group-hover:text-rose-500 transition duration-300">
            HEAVIVE
          </div>
        </NuxtLink>

        <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          <NuxtLink
            to="/"
            active-class="text-rose-500 font-bold"
            class="hover:text-rose-400 transition flex items-center gap-1 py-2"
          >
            首頁
          </NuxtLink>
          <NuxtLink
            to="/about"
            active-class="text-rose-500 font-bold"
            class="hover:text-rose-400 transition flex items-center gap-1 py-2"
          >
            關於我們
          </NuxtLink>
        </nav>

        <button class="md:hidden text-gray-600">
          <Icon name="mdi:menu" size="24" />
        </button>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-gray-900 text-white py-12 text-center text-sm relative overflow-hidden">
      <div class="absolute top-0 left-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl"></div>

      <div class="relative z-10 container mx-auto px-4 space-y-4">
        <h4 class="text-lg font-bold tracking-widest text-rose-500">HEAVIVE STUDIO</h4>
        <p class="text-gray-400">赫琟美學・專屬肌膚療癒所</p>

        <div class="flex justify-center gap-4 py-4 text-gray-500">
          <a href="#" class="hover:text-white transition"><Icon name="mdi:instagram" size="24"/></a>
          <a href="#" class="hover:text-white transition"><Icon name="mdi:facebook" size="24"/></a>
          <a href="#" class="hover:text-white transition"><Icon name="mdi:chat-processing" size="24"/></a>
        </div>

        <div class="border-t border-gray-800 pt-6 mt-6 text-xs text-gray-600">
          &copy; 2025 Heavive Studio. All rights reserved.
        </div>
      </div>
    </footer>

  </div>
</template>