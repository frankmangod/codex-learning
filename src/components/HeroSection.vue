<script setup>
defineEmits(['reserve']);
</script>

<template>
<section class="hero" id="home">
      <div class="hero-copy">
        <div class="eyebrow"><span></span> GOOD FOOD. GOOD COMPANY.</div>
        <h1>把日子，<br>过成<span class="accent">好滋味</span><span class="dot">。</span></h1>
        <p class="hero-description">让新鲜的食材说话，让相聚的时光慢下来。<br>一份用心的料理，一张为你留好的餐桌。</p>
        <div class="hero-actions"><a class="button" href="#menu">探索我们的菜单 <span>↗</span></a><button class="text-button" @click="$emit('reserve')">预约一场美好 <span>→</span></button></div>
        <div class="hero-footnote"><span class="line"></span> 从田园到餐桌，认真对待每一口。</div>
      </div>
      <div class="hero-visual">
        <img class="hero-image" src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=85" alt="新鲜罗勒与番茄搭配的意式青酱面">
        <div class="image-shade"></div>
        <div class="round-stamp">FRESH & SEASONAL<span>❧</span> MADE WITH LOVE</div>
        <div class="image-caption"><span>当季灵感 · 主厨之选</span><h2>一口，遇见地中海。</h2><a href="#menu" aria-label="查看主厨推荐">↗</a></div>
      </div>
    </section>
</template>
