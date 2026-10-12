<script setup>
defineEmits(['reserve']);
</script>

<template>
<section class="visit section" id="visit"><div><div class="eyebrow">COME ON OVER</div><h2>今天的好时光，<br>从<em>一张餐桌</em>开始。</h2><p>午后的闲聊，晚餐的相聚。留一点时间给喜欢的人。</p><button class="button" @click="$emit('reserve')">预订你的座位 <span>↗</span></button></div><div class="visit-info"><h3>期待与你相见</h3><div><span>营业时间</span><p>周一至周日<br>11:00–14:30 / 17:00–21:30</p></div><div><span>到店地址</span><p>你的城市 · 花园路 128 号<br><small>示例地址，正式上线前请替换</small></p></div><div><span>温馨提示</span><p>欢迎家庭聚餐与朋友小聚<br>如有食物过敏，请提前告知。</p></div></div></section>
</template>
