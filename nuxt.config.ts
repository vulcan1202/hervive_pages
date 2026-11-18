// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/seo'
  ],

  // 🌟 新增：啟用 SPA 預設載入畫面，解決一開始的「未渲染破圖/閃爍」問題
  spaLoadingTemplate: 'spa-loading-template.html',

  // SEO 全域設定 (Nuxt SEO 模組需要這些資訊)
  site: {
    url: 'https://hervive-pages.pages.dev',
    name: '芯荷肌膚養護 HERVIVE STUDIO',
    description: '提供客製化皮膚管理與水光透亮護理，找回肌膚原本的光采',
    defaultLocale: 'zh-TW',              
  },
  
  app: {
    head: {
      titleTemplate: '%s | 芯荷肌膚養護 HERVIVE STUDIO',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Noto+Serif+TC:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' }
      ],
      style: [
        {
          children: `
            html, body {
              background-color: #FAF4EE !important;
              margin: 0;
              padding: 0;
            }
            .fouc-hidden {
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }
          `
        }
      ]
    }
  },
  
  // 自動產生 Sitemap
  sitemap: {
    autoLastmod: true,
  },
  
  tailwindcss: {
    cssPath: '~/css/main.css',
  },
  
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  runtimeConfig: {
    public: {
      // 🌟 修正：為了避免某些環境下自動替換失敗，改為明確要求讀取 process.env，並加上 || '' 作為安全防呆
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || '', 
      lineChannelId: process.env.NUXT_PUBLIC_LINE_CHANNEL_ID || '' ,
      liffId: process.env.NUXT_PUBLIC_LIFF_ID || ''
    }
  }
})