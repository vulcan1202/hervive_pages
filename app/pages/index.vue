<script setup>
useSeoMeta({
  title: '首頁',
  description: '這是我們的企業官網首頁',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
    <h1 class="text-4xl font-bold text-blue-600">
      Hello, Nuxt 4!
    </h1>

    <p class="text-gray-500 text-lg">
      企業官網建置中...
    </p>

    <div class="flex items-center gap-2 p-4 bg-gray-100 rounded-lg">
      <Icon name="mdi:rocket-launch" size="32" class="text-orange-500" />
      <span>圖示系統運作正常</span>
    </div>
  </div>
</template>