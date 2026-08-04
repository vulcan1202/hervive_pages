<script setup>
useSeoMeta({
  title: '首頁',
  description: 'Hervive STUDIO 位於新北三重，提供專屬您的客製化美容護膚與皮膚管理。品牌結合了 Her 與 Vive（生活）之意，致力於讓每位女性在生活中找到屬於自己的節奏。提供水光透亮、緊顏管理等專業課程，讓您由內而外散發自信美麗。',
  ogTitle: 'Hervive STUDIO - 每個女人都擁有屬於自己的氛圍',
  ogDescription: '專注於客製化皮膚管理與療癒手技。在 Hervive STUDIO，我們陪您一起活出最真實、最自信的自我。立即預約您的水光之旅。',
})
</script>

<template>
  <div class="page-wrapper">
    <!-- Banner（透明背景） -->
    <div class="banner-container">
      <img
        src="/index/home-banner.png"
        alt="Hervie STUDIO Banner"
        class="banner-image"
      />
    </div>

    <!-- 主內容 -->
    <div class="content-wrapper">
      <!-- 品牌標題區 -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="brand-label">
            <span class="brand-label-text">Hervie Studio</span>
            <span class="brand-label-line" aria-hidden="true"></span>
          </div>

          <h1 class="hero-title">
            喚醒肌膚
            <span class="hero-title-accent">原本的光采</span>
          </h1>

          <div class="hero-description">
            <p class="hero-description-main">
              <span class="highlight">Hervie</span> 的名字，是由 <span class="highlight">「Her」（她）</span>和 <span class="highlight">「Vive」（生活）</span>結合而來<br />
              Vive 是西班牙語中「活；生活」的意思
            </p>
            <p class="hero-description-sub">
              Hervie 希望每一位女性都能夠在生活中找到屬於自己的節奏，活出最真實的自我<br />
              在赫琟，每個人都能擁有自信且舒適的氛圍
            </p>
          </div>

          <div class="divider-group">
            <span class="divider-line" aria-hidden="true"></span>
            <p class="divider-text">
              每個女人都擁有屬於自己的氛圍，從內而外擁有無限可能<br />
              讓您內在充滿自信，外在展現美麗✨
            </p>
            <span class="divider-line" aria-hidden="true"></span>
          </div>

          <div class="cta-group">
            <NuxtLink to="/services" class="btn btn-outline">
              服務項目
              <span class="btn-arrow" aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-primary">
              認識我們
              <span class="btn-arrow" aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 特色卡片區 -->
      <section class="cards-section">
        <div class="cards-grid">
          <div
            v-for="(card, index) in cards"
            :key="card.title"
            class="card-item"
            :style="{ transitionDelay: `${index * 60}ms` }"
          >
            <div class="card-icon-wrapper">
              <Icon :name="card.icon" size="36" class="card-icon" />
            </div>
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-description">{{ card.desc }}</p>
            <span class="card-indicator" aria-hidden="true"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { icon: 'mdi:face-woman-shimmer', title: '客製化護理', desc: '不使用制式菜單，根據當日膚況量身調配專屬課程。' },
        { icon: 'mdi:hand-heart', title: '溫柔手技', desc: '獨家淋巴引流按摩，讓緊繃的線條與情緒同步釋放。' },
        { icon: 'mdi:shield-check', title: '嚴選產品', desc: '全系列使用國際認證安全產品，敏感肌也能安心享受。' },
      ],
    }
  },
}
</script>

<style scoped>
/* ===== 全域 ===== */
.page-wrapper {
  background: transparent; /* 完全透明，無任何背景色 */
  padding: 0 1.25rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.content-wrapper {
  max-width: 1024px;
  margin: 0 auto;
}

/* ===== Banner ===== */
.banner-container {
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
  margin-bottom: 2.5rem;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.banner-image:hover {
  transform: scale(1.005);
}

/* ===== Hero 區 ===== */
.hero-section {
  text-align: center;
  padding: 1.5rem 0 2.5rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
}

/* 品牌標籤 */
.brand-label {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.25rem;
}

.brand-label-text {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #a8b0b2;
  text-transform: uppercase;
}

.brand-label-line {
  width: 2.5rem;
  height: 1px;
  background: #d5d0cb;
}

/* 主標題 */
.hero-title {
  font-family: 'Times New Roman', 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #154337;
  line-height: 1.25;
  letter-spacing: 0.04em;
}

.hero-title-accent {
  color: #a8b0b2;
}

/* 描述文字 */
.hero-description {
  max-width: 38rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hero-description-main {
  font-size: 1rem;
  color: #3e3e3e;
  line-height: 1.8;
  letter-spacing: 0.02em;
}

.hero-description-sub {
  font-size: 0.9rem;
  color: #888888;
  line-height: 1.8;
  font-style: italic;
  letter-spacing: 0.02em;
}

.highlight {
  color: #154337;
  font-weight: 600;
}

/* 分隔線組 */
.divider-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  width: 100%;
  max-width: 34rem;
  margin: 0 auto;
}

.divider-line {
  width: 2.5rem;
  height: 1px;
  background: #d5d0cb;
}

.divider-text {
  font-size: 1rem;
  font-weight: 500;
  color: #154337;
  letter-spacing: 0.06em;
  line-height: 1.8;
  text-align: center;
}

/* ===== CTA 按鈕 ===== */
.cta-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.875rem;
  padding-top: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  border-radius: 4px;
  transition: all 0.25s ease;
  cursor: pointer;
  text-decoration: none;
  position: relative;
}

.btn-arrow {
  display: inline-block;
  transition: transform 0.25s ease;
  font-size: 1.1rem;
}

.btn-outline {
  background: #ffffff;
  color: #154337;
  border: 1.5px solid #154337;
}

.btn-outline:hover {
  background: #f6f2ee;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(21, 67, 55, 0.08);
}

.btn-outline:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-primary {
  background: #154337;
  color: #faf4ee;
  border: 1.5px solid #154337;
}

.btn-primary:hover {
  background: #1d5a4a;
  border-color: #1d5a4a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(21, 67, 55, 0.15);
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

/* ===== 卡片區 ===== */
.cards-section {
  padding-top: 2.5rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.card-item {
  background: #ffffff;
  border: 1px solid #e6e3e0;
  border-radius: 4px;
  padding: 2rem 1.75rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  opacity: 0;
  transform: translateY(16px);
  animation: cardFadeIn 0.5s ease forwards;
}

.card-item:hover {
  transform: translateY(-4px);
  border-color: #154337;
  box-shadow: 0 8px 28px rgba(21, 67, 55, 0.06);
}

/* 卡片指示線 */
.card-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #154337;
  transition: width 0.35s ease;
}

.card-item:hover .card-indicator {
  width: 40%;
}

/* 卡片圖標 */
.card-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e6e3e0;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.card-item:hover .card-icon-wrapper {
  border-color: #154337;
  background: #faf8f6;
}

.card-icon {
  color: #154337;
  transition: transform 0.3s ease;
}

.card-item:hover .card-icon {
  transform: scale(1.04);
}

/* 卡片文字 */
.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #154337;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.9rem;
  color: #777777;
  line-height: 1.7;
  letter-spacing: 0.02em;
  max-width: 18rem;
  margin: 0 auto;
}

/* ===== 動畫 ===== */
@keyframes cardFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== 響應式 ===== */
@media (min-width: 640px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-description-main {
    font-size: 1.05rem;
  }

  .hero-description-sub {
    font-size: 0.95rem;
  }

  .divider-text {
    font-size: 1.05rem;
  }

  .btn {
    padding: 0.85rem 2.5rem;
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .page-wrapper {
    padding: 0 2rem 5rem;
  }

  .banner-container {
    padding-top: 2rem;
    padding-bottom: 3rem;
    margin-bottom: 3rem;
  }

  .hero-title {
    font-size: 3.75rem;
  }

  .hero-content {
    gap: 2rem;
  }

  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }

  .card-item {
    padding: 2.25rem 1.5rem;
  }

  .card-description {
    font-size: 0.85rem;
  }

  .divider-group {
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .page-wrapper {
    padding: 0 2.5rem 6rem;
  }

  .hero-title {
    font-size: 4.25rem;
  }

  .hero-description-main {
    font-size: 1.1rem;
  }

  .hero-description-sub {
    font-size: 1rem;
  }

  .cards-grid {
    gap: 2rem;
  }

  .card-item {
    padding: 2.5rem 2rem;
  }
}
</style>