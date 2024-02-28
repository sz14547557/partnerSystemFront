<!--多个页面用到的样式都是相同的，所以定义一个通用的布局文件，复用样式-->
<!--      @click-left和@click-right定义了左侧按钮和右侧按钮时会触发什么事件-->

<template>
<!--  导航条-->
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
<!--    此处为导航条中间的搜索区域，可以自定义-->
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

<!--  指定一个插槽-->
  <div id="content">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
  </div>

<!--  引入底部tabbar -->
  <van-tabbar route @change="onChange">
<!--  【name参数】为标识符   【to参数】用于点击时跳转到不同的地址-->
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<!--定义一个vue3的语法糖，定义setup lang 使script定义的所有变量都会暴露在当前页面，在template标签中可以直接获取定义的变量-->
<script setup lang="ts" >
import { useRouter } from "vue-router";
import {ref} from "vue";
import routes from "../config/route";

const router = useRouter();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

// 点击导航条左侧按钮
const onClickLeft = () => {
  router.back();
};

// 点击导航条右侧按钮 导航到指定的位置
const onClickRight = () => {
  router.push('/search')
};

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
