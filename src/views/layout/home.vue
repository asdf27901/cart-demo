<template>
  <div class="home">
    <van-nav-bar
      title="智慧商城"
      fixed
      safe-area-inset-top
    ></van-nav-bar>

    <van-search
      shape="round"
      placeholder="请输入商品名称"
      clearable
      @focus="$router.push('/search')"
    >
    </van-search>

    <van-swipe :autoplay="3000" width="100%">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img v-lazy="item.imgUrl" />
      </van-swipe-item>
    </van-swipe>

    <van-grid
      :column-num="navBarList.length / 2"
      square
      icon-size="40"
    >
      <van-grid-item
        v-for="item in navBarList"
        :icon="item.imgUrl"
        :text="item.text"
        :key="item.imgUrl"
      />
    </van-grid>

    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>

    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodItem
          v-for="item in goodList"
          :key="item.goods_id"
          :good="item"
        ></GoodItem>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchHomeDetail } from '@/api/home'
import GoodItem from '@/components/GoodItem.vue'

export default {
  name: 'HomePage',
  components: {
    GoodItem
  },
  data: () => {
    return {
      searchData: '',
      bannerList: [],
      navBarList: [],
      goodList: []
    }
  },
  async created () {
    const { data: { pageData: { items } } } = await fetchHomeDetail()
    this.bannerList = items[1].data
    this.navBarList = items[4].data
    this.goodList = items[6].data
  }
}
</script>

<style scoped lang="less">
.home {
    padding-top: 100px;
    padding-bottom: 50px;
  .van-nav-bar {
    z-index: 999;
    background-color: #ffffff;
    ::v-deep .van-nav-bar__title {
      color: black;
    }
  }
  .van-search {
    z-index: 999;
    position: fixed;
    top: 46px;
    width: 100%;
  }
  .van-swipe .van-swipe-item {
    height: 185px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #ffffff;
  }
  .van-swipe .van-swipe-item img {
    width: 100%;
    height: 185px;
  }
  // 主会场
  .main img {
    display: block;
    width: 100%;
  }
  // 猜你喜欢
  .guess .guess-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>
