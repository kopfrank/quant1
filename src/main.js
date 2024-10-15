import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css' // 引入 Element Plus 样式

const app = createApp(App)

app.use(router)
// 使用 Element Plus
app.use(ElementPlus)

app.mount('#app')
