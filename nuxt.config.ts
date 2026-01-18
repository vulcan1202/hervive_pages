// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // --- 原本的設定 (保持不動) ---
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/seo'
  ],

  // 2. SEO 全域設定 (Nuxt SEO 模組需要這些資訊)
  site: {
    url: 'https://hervive-pages.pages.dev',
    name: '赫琟美學 Hervive STUDIO',
    description: '提供客製化皮膚管理與水光透亮護理，找回肌膚原本的光采',
    defaultLocale: 'zh-TW',              // 預設語系
  },
  app: {
      head: {
        titleTemplate: '%s | 赫琟美學 Hervive STUDIO',
      }
    },
    // 自動產生 Sitemap
    sitemap: {
      autoLastmod: true,
    },
  tailwindcss: {
    // exposeConfig: true,
  }
})