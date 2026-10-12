<script setup>
import { ref, computed } from 'vue';
import { dishes } from '../data/menu.js';
const categories = [{ id: 'chinese', label: '中餐' }, { id: 'western', label: '西餐' }];
const currentCategory = ref('western');
const fullMenu = ref(false);
const visibleDishes = computed(() => fullMenu.value ? dishes : dishes.filter(dish => dish.category === currentCategory.value));
const menuStatus = computed(() => fullMenu.value ? `完整菜单 · ${dishes.length} 道精选，中餐与西餐任你搭配。` : currentCategory.value === 'chinese' ? `中餐 · ${visibleDishes.value.length} 道精选，家常热菜、主食与中式甜品。` : `西餐 · ${visibleDishes.value.length} 道精选，从意式主菜到手作甜点。`);
function selectCategory(category) { currentCategory.value = category; fullMenu.value = false; }
function toggleFullMenu() { fullMenu.value = !fullMenu.value; }
</script>

<template>
<section class="menu-section section" id="menu">
      <div class="section-top"><div><div class="eyebrow">A TASTE OF OUR KITCHEN</div><h2>值得为它，<em>再来一次</em></h2><p>经典风味与当季灵感，在这里恰好相遇。</p></div><button class="menu-link" id="all-menu" @click="toggleFullMenu" :aria-expanded="fullMenu" aria-controls="dish-grid">{{ fullMenu ? '收起完整菜单' : '查看完整菜单' }} <span>↗</span></button></div>
      <div class="filters" aria-label="菜品分类"><button v-for="category in categories" :key="category.id" :class="{ selected: !fullMenu && currentCategory === category.id }" :data-filter="category.id" :aria-pressed="!fullMenu && currentCategory === category.id" aria-controls="dish-grid" @click="selectCategory(category.id)">{{ category.label }} · {{ dishes.filter(dish => dish.category === category.id).length }} 道</button></div>
      <p id="menu-status" class="menu-status" role="status">{{ menuStatus }}</p>
      <div class="dish-grid" id="dish-grid">
        <article v-for="dish in visibleDishes" :key="dish.id" class="dish" :data-category="dish.category">
          <div class="dish-photo">
            <img :src="dish.image" :alt="dish.alt" loading="lazy">
            <span class="dish-tag">{{ dish.tag }}</span>
          </div>
          <div class="dish-title"><h3>{{ dish.name }}</h3><span>¥ {{ dish.price }}</span></div>
          <p class="dish-ingredients">{{ dish.description }}</p>
          <p class="dish-introduction">{{ dish.introduction }}</p>
        </article>
      </div>
      <div class="menu-note">菜单随季节调整，美味常有新意。图片为菜品风格示意，菜名与价格为展示内容。<span>素食友好 · 可告知饮食偏好</span></div>
    </section>
</template>
