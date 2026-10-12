<script setup>
import { ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroSection from './components/HeroSection.vue';
import MenuSection from './components/MenuSection.vue';
import RestaurantStory from './components/RestaurantStory.vue';
import VisitSection from './components/VisitSection.vue';
import ReservationDialog from './components/ReservationDialog.vue';
const reservationOpen = ref(false);
const year = new Date().getFullYear();
</script>

<template>
  <SiteHeader @reserve="reservationOpen = true" />
  <main>
    <HeroSection @reserve="reservationOpen = true" />
    <div class="values-strip"><span>✳ <b>时令鲜食</b><small>跟随季节的味道</small></span><span>❧ <b>手作料理</b><small>用心，而不将就</small></span><span>☼ <b>自在相聚</b><small>让美好自然发生</small></span><span>♡ <b>温暖款待</b><small>每一位，都是熟客</small></span></div>
    <MenuSection />
    <RestaurantStory />
    <VisitSection @reserve="reservationOpen = true" />
  </main>
  <footer><a class="brand" href="#home"><span class="brand-icon">❧</span><span>OLIVE <i>&</i> OAK<small>好好吃饭，慢慢生活。</small></span></a><p>© <span>{{ year }}</span> Olive & Oak · 餐馆概念展示</p><a href="#home">回到顶部 ↑</a></footer>
  <ReservationDialog v-model:open="reservationOpen" />
</template>
