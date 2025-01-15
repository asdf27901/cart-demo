<template>
  <div>
    <!--二级标签区域-->
    <!--
    如果一级路由之间跳转需要缓存一级路由的话只需要一级路由上包裹<keep-alive>
    如果一级路由到二级路由跳转需要缓存一级路由的话也是只需要在一级路由上包裹<keep-alive>
    如果是二级路由到一级路由上跳转需要缓存二级路由的话，则需要在一级路由和一级路由下的二级路由包裹<keep-alive>
    -->
<!--    <keep-alive :include="['Home', 'SortPage']">-->
<!--      <router-view></router-view>-->
<!--    </keep-alive>-->
    <keep-alive-router-view :cache="$route.meta.cache" :default-cache="true"></keep-alive-router-view>

    <!--标签栏切换-->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="list-switching" to="/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
export default {
  name: 'LayoutIndex',
  data: () => {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">

</style>
