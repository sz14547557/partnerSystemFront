<!-- todo sz※ 标签查询页  使用编程式导航 onSearch 点击搜索时要触发的事件，onCancel 点击取消时要触发的事件-->
<template>
  <form action="/">
<!--    搜索组件 v-model用于控制搜索框中的文字,后面使用searchText就可以获取输入框中的文字-->
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
<!--  插入一个分割线，名称为：已选标签-->
  <van-divider content-position="left">已选标签</van-divider>
<!--  如果未选择标签，则补充占位符，如果有标签则不提示-->
  <div v-if="activeIds.length === 0">请选择标签</div>

<!--  van-row 设置列元素间距 -->
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
<!--    @close指定一个移除标签  -->
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>

<!--  tagList标签列表（结构必须按规则定义），从后台进行获取，或定义在前端中-->
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
// 引用useRouter
import {useRouter} from "vue-router";

// 定义router路由
const router = useRouter()

const searchText = ref('');

// todo sz※ 此处必须为 text 和 id结构
const originTagList = [{
  text: '性别',
  children: [
    {text: '男', id: '男'},
    {text: '女', id: '女'},
  ],
},
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大3', id: '大3'},
      {text: '大4', id: '大4'},
      {text: '大5', id: '大5'},
      {text: '大6', id: '大6'},
    ],
  },
]

// todo sz※ 通过定义好的originTagList， 为标签列表tagList 进行赋值
let tagList = ref(originTagList);

/**
 * 搜索过滤   todo sz※ 这个方法的作用是什么？
 */
const onSearch = () => {
  // 过滤originTagList集合后获取指定的标签，赋值为tagList标签。用于展示
  // 将数组打平，  把children的每一项都拼成一个大数组 用于
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    // 如果标签中包含所需的标签，则保留，否则进行过滤 。
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });

}

/**
 * 取消
 * @param val
 */
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

// 已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

//   移除标签的方法，
const doClose = (tag) => {
  // 使用filter过滤 ，不等于要删除的内容在删除
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/**
 * 执行搜索 定义搜索Url
 */
const doSearchResult = () => {
  //todo sz※  使用router.push 进行页面跳转，具体的路由地址定义在config/route.ts中
  console.log("我是搜索框中的文字："+searchText.value);
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>
