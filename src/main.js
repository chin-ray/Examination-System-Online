import { createApp } from 'vue'
import App from './App.vue'

import { VButton } from '@/components/draggable' // 注册自定义组件

import router from "./router";
import { createPinia } from "pinia";
import '@/styles/index.scss' // global css

const app = createApp(App);

app.use(VButton)

// 2.2. 创建pinia实例
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app')
