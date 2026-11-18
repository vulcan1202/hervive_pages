# 芯荷肌膚養護 HERVIVE STUDIO 官方網站

<div align="center">

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.2-00DC82?style=for-the-badge&logo=nuxt&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3.5.26-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![LINE LIFF](https://img.shields.io/badge/LINE_LIFF-2.29.1-00C300?style=for-the-badge&logo=line&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deploy-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

<br/>

**專屬於妳的美好時光 • 客製化美容護膚與皮膚管理預約系統**

[🌐 線上正式站點](https://hervive-pages.pages.dev) • [📅 服務課程選單](https://hervive-pages.pages.dev/services) • [📍 預約與交通資訊](https://hervive-pages.pages.dev/about)

</div>

---

## 📖 專案概覽 (Project Overview)

**HERVIVE STUDIO（芯荷肌膚養護）** 位於新北市三重區，品牌名稱融合了「Her」（她）與西班牙語「Vive」（生活），致力於陪伴現代女性在生活中找回舒適從容的節奏與肌膚原生的水光透亮。

本專案為品牌官方形象官網暨線上即時預約管理系統，全站基於 **Nuxt 4** 與 **Vue 3** 構建，深度融合 **高質感美學設計規範（Editorial Luxury × Soft Structuralism）** 與現代前端工程化架構，並無縫整合 **LINE LIFF** 行動端生態圈。

---

## 🏛️ 技術堆疊 (Tech Stack)

| 領域 | 技術 / 套件 | 說明 |
| :--- | :--- | :--- |
| **核心框架** | `Nuxt 4.2.2` + `Vue 3.5.26` | 採用現代 Composition API、`<script setup>`、SSR/SSG 混合渲染策略 |
| **樣式系統** | `Tailwind CSS` + 自訂 Design Tokens | 嚴謹收攏品牌深森林綠、香檳霧金與象牙米白 Tokens，支援 Double-Bezel 框體架構 |
| **字體排印** | `Cormorant Garamond` + `Noto Serif TC` + `Plus Jakarta Sans` | 奢華襯線展示標題搭配極致易讀的現代無襯線內文，平行預先載入 |
| **圖示與多媒體** | `@nuxt/icon` (`@iconify-json/mdi`) | 高效向量圖示整合，支援自訂尺寸、色彩與微動態物理回饋 |
| **搜尋引擎優化** | `@nuxtjs/seo` + Schema.org | 完備 Open Graph 元標籤、自動 Sitemap 生成與在地商家 `LocalBusiness` 結構化資料 |
| **行事曆與排程** | `@vuepic/vue-datepicker` + `date-fns` | 客製化週檢視日期選取器、例休假遮罩、時段保護機制與防呆驗證 |
| **通訊與認證** | `@line/liff 2.29.1` + RESTful API | 支援一般網頁版 OAuth 2.1 與 LINE App 內嵌 LIFF 免登入快捷授權雙軌認證 |
| **部署託管** | `Cloudflare Pages` | 邊緣運算（Edge CDN）全球加速分發，零伺服器成本全自動化 CI/CD |

---

## 📂 專案目錄結構 (Project Structure)

專案遵循 Nuxt 4 官方標準架構（以 `app/` 為原始碼根目錄）：

```bash
hervive_pages/
├── .agents/                    # AI 輔助設計與程式碼工程規範 (taste_skills)
├── app/
│   ├── app.vue                 # 根組件：全域 FOUC 防護、AppToast 與載入生命週期
│   ├── components/             # 業務與共用組件
│   │   ├── AppToast.vue        # 品牌專屬非同步浮動通知膠囊 (取代原生 alert)
│   │   ├── load.vue            # 品牌首次進場進度動畫
│   │   └── MyCalendar.client.vue # 週/月日曆核心組件 (封裝 VueDatePicker)
│   ├── composables/            # 組合式函式庫
│   │   └── useToast.ts         # 全域響應式通知廣播狀態管理
│   ├── css/
│   │   └── main.css            # 全域樣式、排版標點規範、雙層框體與純 CSS Dropdown
│   ├── layouts/
│   │   └── default.vue         # 懸浮膠囊 Header (含下拉選單)、LIFF 底部導覽列、Footer
│   ├── pages/                  # 應用程式路由頁面
│   │   ├── index.vue           # [首頁] 沉浸式實拍 Hero 混合模式 + 非對稱 Bento Grid
│   │   ├── services.vue        # [服務項目] 雜誌級雙欄 <article> + <aside> 加購 Sticky 側欄
│   │   ├── about.vue           # [關於我們] 主理人故事、方案 A 高斯動態光暈相片輪播、等高資訊卡
│   │   ├── booking.vue         # [線上預約] 週時段選擇、時段防衝突保護、骨架屏、LINE 代碼複製
│   │   ├── member.vue          # [會員中心] 個資即時同步、歷史預約查詢、骨架屏
│   │   └── login.vue           # [會員登入/註冊] 手機密碼登入 + LINE LIFF 快捷登入
│   ├── plugins/
│   │   └── liff.client.ts      # LINE LIFF 客戶端初始化外掛
│   └── spa-loading-template.html # SPA 載入骨架樣板 (防止 SPA 水合前瞬間白屏)
├── public/                     # 靜態資源庫 (高解析圖片、向量圖標、品牌標誌)
│   ├── view_photo/             # 工作室實景照片 (views1 ~ views3)
│   ├── services/               # 課程實景示意圖
│   └── logo.png                # 品牌商標
├── nuxt.config.ts              # Nuxt 核心組態 (SEO, 預連線, Critical CSS, 模組設定)
├── tailwind.config.ts          # Tailwind 色彩 Tokens、字體家族、奢華漫射陰影
├── package.json
└── README.md
```

---

## 🎨 核心設計美學亮點 (Aesthetic & Taste Skills)

本專案依據 **高科大資管系「網頁程式設計 (Week 05 ~ 08)」** 技術體系，並導入 **`taste_skills`（Awwwards / $150k Agency 視角）** 全面重構：

### 1. 混合模式沉浸式 Hero (`background-blend-mode: multiply`)
* 借鑑 Week 08 大型專案實戰技術，首頁 Hero 將實拍沙龍光影照片與品牌深森林綠（`rgba(21, 67, 55, 0.90)`）進行乘算混合。
* 巨型奢華雙襯線文字搭配柔和多層立體陰影與香檳金徽章，首屏即營造頂級私人 SPA 的沉靜空間感。

### 2. 非對稱 Bento 幾何網格 (The Asymmetrical Bento Box)
* 徹底告別千篇一律的「三等高對稱卡片病（AI-Slop）」。
* 主卡片（佔據 7 欄）突出旗艦「01 客製化全方位管理」，右側垂直堆疊「02 溫柔手技」與「03 純淨產品」，打破視覺單調，節奏分明。

### 3. 雙層框體結構 (Double-Bezel Architecture / Doppelrand)
* 全站重要卡片容器均採用機器精密切削般的雙層結構：
  * **外層框體 (Outer Shell)**：微透明磨砂玻璃質感搭配極細金色外邊界與超大圓角（`rounded-[2rem]`）。
  * **內層核心 (Inner Core)**：依據同心圓公式精算內縮半徑（`rounded-[calc(2rem-0.375rem)]`），搭配高光倒角陰影。

### 4. 輪播「方案 A：高斯景深動態光暈底層 (Gaussian Ambient Backfill)」
* 面對直式長照（`views2.jpg` 5:6）與正方照（`views1/3.jpg` 1:1）長寬比不一的現實素材限制：
  * **底層**：同張照片放大 125% 並施加重度高斯模糊 (`blur-2xl`) 與深綠漸層遮罩，將兩側空隙自然化為同色系環境光暈。
  * **前景**：相片以 `object-contain` 保持 **100% 完整無損呈現（完全不切圖）**，浮動於柔光之上，兼顧真實度與奢華劇院感。

### 5. 雜誌化雙欄佈局 (Two-Column Editorial)
* `services.vue` 採用 `<article>`（左側 8 欄主課程）與 `<aside>`（右側 4 欄黏性側欄 `sticky top-24`）結構。
* 側欄整合「加購項目即時清單」與「沙龍私密呵護承諾」，價格均套用 `tabular-nums` 等寬對齊，標題自動套用 `text-wrap: balance` 防止孤字成行。

---

## ⚡ 效能與無障礙防禦架構 (Performance & Defenses)

### 全站零閃爍 (Zero FOUC & FOUT Defense)
針對前端框架在客戶端渲染時常見的「第一秒無樣式內容閃爍」問題，建立了三重防禦體系：
1. **`<head>` 關鍵阻斷樣式 (Critical Inline CSS)**：在 `nuxt.config.ts` 的 `app.head.style` 中直出高優先級背景色與 `.fouc-hidden` 規則，在瀏覽器解析 `<body>` 前即生效。
2. **原生行內樣式防護**：根節點與 `<Load>` 帶有原生 `style="position: fixed; inset: 0..."` 與 `opacity: 0 !important`，完全不依賴 Tailwind 或外部 JS 的下載時間。
3. **字型平行預先連線**：使用 `preconnect` 與 `crossorigin` 預先握手 Google Fonts 伺服器，非同步下載字型，消解文字跳動。

### 行動端 Viewport 100dvh 防護
* 全面換用現代 CSS 規範 `min-h-[100dvh]` 取代傳統 `100vh`，徹底防止 iOS Safari 與 LINE LIFF 內建瀏覽器在網址列滑動展開/收合時造成的版面抖動與跳位。

### 品牌專屬非同步 Toast 系統
* 封裝 `useToast` 響應式狀態，徹底拔除中斷體驗的原生 `window.alert()`。
* 提供深綠（成功）、霧金（提示）、柔紅（警示）三種半透明磨砂玻璃膠囊回饋，支援彈簧進出場微動態與自動銷毀機制。

---

## 🛠️ 環境配置與本機開發 (Getting Started)

### 1. 環境需求
* [Node.js](https://nodejs.org/) `>= 20.0.0`
* `npm` 或 `pnpm` / `yarn`

### 2. 安裝相依套件
```bash
git clone https://github.com/vulcan1202/hervive_pages.git
cd hervive_pages
npm install
```

### 3. 環境變數設定 (`.env`)
在專案根目錄建立 `.env` 檔案，並填入以下資訊：
```env
# 後端 API 服務端點
NUXT_PUBLIC_BACKEND_URL=https://your-api-domain.com

# LINE LIFF 與官方 Channel 設定
NUXT_PUBLIC_LINE_CHANNEL_ID=your_line_channel_id
NUXT_PUBLIC_LIFF_ID=your_liff_id
```

### 4. 啟動開發伺服器
```bash
npm run dev
```
啟動後在瀏覽器開啟 `http://localhost:3000` 即可檢視站點。

### 5. 建置與預覽
```bash
# 產出靜態網站 (SSG - 適用於 Cloudflare Pages)
npm run generate

# 本地預覽產出結果
npm run preview
```

---

## 🚀 部署架構 (Deployment)

本專案透過 Git 整合 **Cloudflare Pages** 進行全自動化持續整合與部署（CI/CD）：

* **Framework Preset**：`Nuxt.js`
* **Build Command**：`npm run generate`
* **Build Output Directory**：`dist` 或 `.output/public`
* **Node.js Version**：`20.x` 或以上

每次推送至 `master` 分支，Cloudflare Pages 將自動拉取最新程式碼，進行靜態最佳化打包，並分發至全球邊緣節點（Edge Network）。

---

## 📄 智慧財產權與授權 (License)

Copyright © 2026 **HERVIVE STUDIO (芯荷肌膚養護)**. All rights reserved.  
本專案之品牌識別、商標、照片素材與護理課程文案均屬 HERVIVE STUDIO 所有，未經授權禁止翻印商業使用。
