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

// 注册自定义组件
import UButton from '@/components/draggable/UButton'
import UGridRow from '@/components/draggable/UGridRow'
app.component('UButton', UButton)
app.component('UGridRow', UGridRow)

app.mount('#app')
