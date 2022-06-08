import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";
import { createPinia } from "pinia";
import '@/styles/index.scss' // global css

const app = createApp(App);

// 2.2. 创建pinia实例
const pinia = createPinia();

app.use(router);
app.use(pinia);

import VButton from '@/components/draggable/VButton' // 注册自定义组件
app.component('VButton', VButton)

app.mount('#app')
