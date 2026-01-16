// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // --- 原本的設定 (保持不動) ---
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // --- 新增內容開始 ---

  // 1. 註冊模組
  modules: [
    '@nuxtjs/tailwindcss', // 處理樣式
    '@nuxt/icon',          // 處理圖標 (Nuxt 4 推薦用 @nuxt/icon)
    '@nuxtjs/seo'          // 處理 SEO
  ],

  // 2. SEO 全域設定 (Nuxt SEO 模組需要這些資訊)
  site: {
    url: 'https://www.your-company.com', // 【必填】未來上線後的網址，這對 SEO 很重要
    name: '您的公司名稱',                  // 網站名稱
    description: '這裡是網站的預設描述，有助於 Google 搜尋結果顯示。',
    defaultLocale: 'zh-TW',              // 預設語系
  },

  // 3. (選填) 如果 Tailwind 需要額外設定，可加在這裡，通常預設即可
  tailwindcss: {
    // exposeConfig: true,
  }
})