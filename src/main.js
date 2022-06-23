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

import Draggable from 'vuedraggable'
app.component('Draggable', Draggable)

// 注册自定义组件
import UButton from '@/components/component-designer/u-button'
import UGrid from '@/components/component-designer/u-grid'
app.component('UButton', UButton)
app.component('UGrid', UGrid)

app.mount('#app')
