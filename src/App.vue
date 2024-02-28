<!-- App.vue是根组件,在其中引入自定义的BasicLayout组件，后面每个新建的组件都要放在App.vue中进行注册-->
<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
</script>

<template>
  <BasicLayout />
</template>

<style>

</style>
