// todo sz 首页界面

import {createApp} from 'vue'
// 定义组件界面，用于挂载在页面上
import App from './App.vue'
// 引入vue-router路由组件，实现前端与后端的路由地址匹配
import * as VueRouter from 'vue-router';
import routes from "./config/route";
// todo sz※ 此处为全局引入
import Vant from 'vant';
import 'vant/lib/index.css';
import '../global.css'
import {Toast} from 'vant';

// 先执行app，再进行挂载
const app = createApp(App);
app.use(Vant);
app.config.globalProperties.$toast = Toast;
const router = VueRouter.createRouter({
    //todo sz※ 定义路由方式：  内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    // 与config/route.js文件进行匹配，将路由规则写在route.js文件中
    routes, // `routes: routes` 的缩写
})

// 引入vue-router组件
app.use(router);
app.use(Toast);

// todo sz※ 把一个main.ts中定义的App.vue的组件，挂载在index.html中id 为app的<div>页面上
app.mount('#app')
