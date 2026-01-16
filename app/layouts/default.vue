<template>
  <div class="min-h-screen flex flex-col font-sans">

    <header class="border-b bg-white">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="font-bold text-xl">MyCompany</div>
        <nav class="flex gap-6 text-sm font-medium text-gray-600">
          <NuxtLink to="/" class="hover:text-blue-600 transition">首頁</NuxtLink>
          <NuxtLink to="/about" class="hover:text-blue-600 transition">關於我們</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-gray-900 text-white py-6 text-center text-sm">
      &copy; 2025 MyCompany. All rights reserved.
    </footer>

  </div>
</template>