<script setup>
import { ref, reactive, watch, nextTick, onBeforeUnmount } from 'vue';
const props = defineProps({ open: Boolean });
const emit = defineEmits(['update:open']);
const dialog = ref(null);
const resultElement = ref(null);
const result = ref('');
function localToday() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
const today = ref(localToday());
const form = reactive({ name: '', date: today.value, time: '11:30', guests: '2 位', phone: '', notes: '' });
let previousOverflow;
function unlockScroll() {
  if (previousOverflow !== undefined) { document.body.style.overflow = previousOverflow; previousOverflow = undefined; }
}
watch(() => props.open, async (open) => {
  await nextTick();
  if (!dialog.value || open !== props.open) return;
  if (open) {
    today.value = localToday();
    if (form.date < today.value) form.date = today.value;
    result.value = '';
    if (!dialog.value.open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.value.showModal();
    }
  } else if (dialog.value?.open) dialog.value.close();
}, { immediate: true });
function close() { dialog.value?.close(); }
function handleClose() { unlockScroll(); emit('update:open', false); }
function handleBackdrop(event) {
  if (event.target !== dialog.value) return;
  const bounds = dialog.value.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
}
async function submit(event) {
  if (!event.target.reportValidity()) return;
  result.value = `${form.name}，你的用餐意向：${form.date} ${form.time}，${form.guests}。这是本地预览，尚未发送或确认预订，请联系餐馆确认座位。`;
  await nextTick();
  resultElement.value?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
onBeforeUnmount(() => { dialog.value?.close(); unlockScroll(); });
</script>

<template>
<dialog id="reservation" ref="dialog" aria-labelledby="reservation-title" @close="handleClose" @cancel.prevent="close" @click="handleBackdrop"><form id="reservation-form" @submit.prevent="submit"><button class="close-dialog" type="button" aria-label="关闭预订" @click="close">×</button><div class="eyebrow">A TABLE FOR YOU</div><h2 id="reservation-title">为美好，留个座位。</h2><p>填写你的用餐计划，生成预订意向。</p><label>你的称呼<input name="name" v-model="form.name" autocomplete="name" required placeholder="怎么称呼你？" maxlength="40"></label><div class="form-row"><label>用餐日期<input type="date" :min="today" name="date" v-model="form.date" required></label><label>用餐时间<select name="time" v-model="form.time"><option>11:30</option><option>12:30</option><option>13:30</option><option>17:30</option><option>18:30</option><option>19:30</option><option>20:30</option></select></label></div><div class="form-row"><label>用餐人数<select name="guests" v-model="form.guests"><option>2 位</option><option>1 位</option><option>3 位</option><option>4 位</option><option>5 位</option><option>6 位</option></select></label><label>联系电话<input name="phone" v-model="form.phone" type="tel" autocomplete="tel" required pattern="[0-9+\(\) \-]{6,20}" placeholder="请输入联系电话"></label></div><label>特殊需求（选填）<textarea name="notes" v-model="form.notes" placeholder="食物过敏、儿童座椅或其他需求" maxlength="300"></textarea></label><button class="button form-submit" type="submit">生成预订意向 <span>↗</span></button><small class="form-disclaimer">这是展示页面，信息仅在本页面处理，不会发送到餐馆。</small><div v-if="result" id="reservation-result" ref="resultElement" role="status">{{ result }}</div></form></dialog>
</template>
