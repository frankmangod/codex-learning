# 橄榄与木餐馆首页

Vue 3 + Vite + JavaScript，使用 Composition API 与单文件组件。

## 开发

```sh
npm install
npm run dev
```

开发服务固定使用 http://localhost:3000/，端口被占用时会明确报错。
`npm start` 同样启动开发服务。

## 验证与构建

```sh
npm test
npm run build
npm run preview
```

构建输出位于 `dist/`。生产预览也使用端口 3000，启动前请停止开发服务。
组件测试验证 Vue 状态与业务逻辑；原生表单校验、键盘焦点和响应式布局需在浏览器中验收。

## 内容维护

- `src/data/menu.js`：16 道示例菜品、价格、图片和中西餐分类。
- `src/components/`：导航、首屏、菜单、餐馆介绍、到店信息与预订弹窗。
- `src/App.vue`：页面组合和预订弹窗状态。
- `src/styles.css`：保留原有响应式视觉设计。

地址、价格和菜品是展示内容。预订意向仅在本页面处理，没有后台、网络提交或确认座位。
美食图片和字体沿用外部资源，需要网络连接。
