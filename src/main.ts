// todo sz 首页界面

import {createApp} from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from "./config/route";
// todo sz※ 此处是否为全局引入 ，不是按需引入
import Vant from 'vant';
import 'vant/lib/index.css';
import '../global.css'

// 先执行app，再进行挂载
const app = createApp(App);
app.use(Vant);

// 路由插件？
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);

// todo sz※ 把一个main.ts中定义的App.vue的组件，挂载在index.html中id 为app的<div>页面上
app.mount('#app')
