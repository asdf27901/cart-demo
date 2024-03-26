<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="$route.query.search || ''"
      :placeholder="'搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" @click="$router.push('/sort')"/>
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns" v-if="goodsList.length !== 0">
      <div
        class="sort-item"
        @click="search({
        sortType: 'all',
        goodsName: $route.query.search,
        categoryId: $route.query.sortId
        })"
      >综合</div>
      <div
        class="sort-item"
        @click="search({
        sortType: 'sales',
        goodsName: $route.query.search,
        categoryId: $route.query.sortId
        })"
      >销量</div>
      <div
        class="sort-item"
        @click="search({
        sortType: 'price',
        goodsName: $route.query.search,
        sortPrice: 1,
        categoryId: $route.query.sortId
        })"
      >价格 </div>
    </div>

    <van-empty
      v-if="isShow"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="没有找到商品哦o(╥﹏╥)o"
    ></van-empty>

    <div
      class="goods-list"
      v-if="goodsList.length !== 0"
      v-loading:block="isLoading"
    >
      <GoodItem v-for="good in goodsList" :key="good.goods_id" :good="good"></GoodItem>
    </div>
  </div>
</template>

<script>
import GoodItem from '@/components/GoodItem.vue'
import { searchGood } from '@/api/search'
export default {
  name: 'SearchList',
  data: () => {
    return {
      goodsList: [],
      isShow: false,
      isLoading: false
    }
  },
  components: {
    GoodItem
  },
  created () {
    this.search({
      sortType: 'all',
      goodsName: this.$route.query.search,
      categoryId: this.$route.query.sortId
    })
  },
  methods: {
    async search(obj) {
      this.isLoading = true
      const { data: { list: { data } } } = await searchGood(obj)
      this.goodsList = data
      this.isShow = this.goodsList.length === 0
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
