<template>
  <div class="home">
    <van-nav-bar
      title="智慧商城"
      fixed
      safe-area-inset-top
    ></van-nav-bar>

    <van-search
      shape="round"
      show-action
      placeholder="请输入商品名称"
      clearable
    >
      <template #action>
        <div>搜索</div>
      </template>
    </van-search>

    <van-swipe :autoplay="3000" width="100%">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <van-grid
      :column-num="grids.length / 2"
      square
      icon-size="40"
    >
      <van-grid-item
        v-for="(item, index) in grids"
        :icon="item.pic"
        :text="item.text"
        :key="index"
      />
    </van-grid>
  </div>
</template>

<script>
import { fetchHomeDetail } from '@/api/home'

export default {
  name: 'HomePage',
  data: () => {
    return {
      searchData: '',
      images: [],
      grids: []
    }
  },
  async created () {
    const { data: { pageData: { items } } } = await fetchHomeDetail()
    this.images = items[1].data.map(v => v.imgUrl)
    this.grids = items[4].data.map(v => ({ pic: v.imgUrl, text: v.text }))
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
}
</style>
