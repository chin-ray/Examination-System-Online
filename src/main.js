import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";
import { createPinia } from "pinia";
import VueDragDrop from 'vue-drag-drop'
import '@/styles/index.scss' // global css

import { VButton } from '@/components/draggable' // 注册自定义组件

const app = createApp(App);

app.use(VButton)

// 2.2. 创建pinia实例
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VueDragDrop)

app.mount('#app')
