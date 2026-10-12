<script setup>
import { ref } from 'vue';
defineEmits(['reserve']);
const mobileOpen = ref(false);
const activeSection = ref('home');
const links = [{ id: 'home', label: '首页' }, { id: 'menu', label: '探索菜单' }, { id: 'story', label: '我们的故事' }, { id: 'visit', label: '到店指南' }];
function navigate(id) { activeSection.value = id; mobileOpen.value = false; }
</script>

<template>
<header class="header">
    <a class="brand" href="#home" aria-label="橄榄与木首页"><span class="brand-icon">❧</span><span>OLIVE <i>&</i> OAK<small>橄榄与木 · 意式餐馆</small></span></a>
    <nav id="main-nav" class="nav" :class="{ open: mobileOpen }" aria-label="主导航"><a v-for="link in links" :key="link.id" :href="'#' + link.id" :class="{ active: activeSection === link.id }" @click="navigate(link.id)">{{ link.label }}</a></nav>
    <button class="button nav-book" @click="$emit('reserve')">预订座位 <span>↗</span></button>
    <button class="mobile-toggle" :aria-label="mobileOpen ? '关闭导航' : '打开导航'" :aria-expanded="mobileOpen" aria-controls="main-nav" @click="mobileOpen = !mobileOpen">☰</button>
  </header>
</template>
