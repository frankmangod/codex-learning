import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { parse, compileScript } from '@vue/compiler-sfc';
import * as vue from 'vue';
import { dishes } from '../src/data/menu.js';

// Exercise the actual SFC setup code with Vue reactivity. Native dialog methods
// are doubles here; browser layout and native constraint validation need UI QA.
function setupComponent(name, props = {}, document = {}) {
  const { descriptor } = parse(readFileSync(new URL(`../src/components/${name}.vue`, import.meta.url), 'utf8'));
  const code = compileScript(descriptor, { id: name }).content
    .replace(/import .*? from .*?;\r?\n/g, '')
    .replace('export default', 'globalThis.component =');
  const cleanup = [];
  const stops = [];
  const context = vm.createContext({ ...vue, dishes, document,
    onBeforeUnmount: callback => cleanup.push(callback),
    watch: (...args) => { const stop = vue.watch(...args); stops.push(stop); return stop; },
  });
  vm.runInContext(code, context);
  const events = [];
  const state = context.component.setup(props, { expose() {}, emit: (...args) => events.push(args) });
  return { state, events, dispose() { cleanup.forEach(fn => fn()); stops.forEach(fn => fn()); } };
}

test('menu defaults to 8 western dishes and restores the category after collapse', () => {
  const { state } = setupComponent('MenuSection');
  assert.equal(dishes.length, 16);
  assert.equal(state.visibleDishes.value.length, 8);
  assert.ok(state.visibleDishes.value.every(dish => dish.category === 'western'));
  state.selectCategory('chinese');
  assert.equal(state.visibleDishes.value.length, 8);
  assert.ok(state.visibleDishes.value.every(dish => dish.category === 'chinese'));
  state.toggleFullMenu();
  assert.equal(state.visibleDishes.value.length, 16);
  state.toggleFullMenu();
  assert.equal(state.currentCategory.value, 'chinese');
  assert.equal(state.visibleDishes.value.length, 8);
  state.toggleFullMenu();
  state.selectCategory('western');
  assert.equal(state.fullMenu.value, false);
  assert.ok(state.visibleDishes.value.every(dish => dish.category === 'western'));
});

test('mobile navigation closes on selection and updates the active link', () => {
  const { state } = setupComponent('SiteHeader');
  state.mobileOpen.value = true;
  state.navigate('menu');
  assert.equal(state.mobileOpen.value, false);
  assert.equal(state.activeSection.value, 'menu');
});

test('reservation validates, generates local intent, reopens and restores scrolling', async () => {
  const props = vue.reactive({ open: false });
  const document = { body: { style: { overflow: 'auto' } } };
  const component = setupComponent('ReservationDialog', props, document);
  const { state, events } = component;
  const nativeDialog = {
    open: false,
    showModal() { this.open = true; },
    close() { this.open = false; props.open = false; state.handleClose(); },
    getBoundingClientRect: () => ({ left: 100, right: 500, top: 100, bottom: 600 }),
  };
  state.dialog.value = nativeDialog;
  const settle = async () => { await vue.nextTick(); await vue.nextTick(); };
  props.open = true;
  await settle();
  assert.equal(state.dialog.value.open, true);
  assert.equal(document.body.style.overflow, 'hidden');
  await state.submit({ target: { reportValidity: () => false } });
  assert.equal(state.result.value, '');
  state.form.name = '测试客人';
  state.form.phone = '13800000000';
  await state.submit({ target: { reportValidity: () => true } });
  assert.match(state.result.value, /测试客人/);
  assert.match(state.result.value, /尚未发送或确认预订/);
  state.handleBackdrop({ target: state.dialog.value, clientX: 200, clientY: 200 });
  assert.equal(state.dialog.value.open, true);
  state.handleBackdrop({ target: state.dialog.value, clientX: 20, clientY: 20 });
  assert.equal(state.dialog.value.open, false);
  assert.equal(document.body.style.overflow, 'auto');
  assert.ok(events.some(([event, value]) => event === 'update:open' && value === false));
  await settle();
  props.open = true;
  await settle();
  assert.equal(state.result.value, '');
  assert.equal(state.dialog.value.open, true);
  state.close();
  await settle();
  assert.equal(document.body.style.overflow, 'auto');
  props.open = true;
  await settle();
  component.dispose();
  assert.equal(document.body.style.overflow, 'auto');
});
