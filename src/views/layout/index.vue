<template>
  <div>
    <!--二级标签区域-->
    <router-view></router-view>

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
