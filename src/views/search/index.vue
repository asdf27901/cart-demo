<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search
      show-action
      placeholder="请输入搜索关键词"
      clearable
      v-model="value"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" />
      </div>
      <div class="list">
        <div class="list-item" @click="$router.push('/searchlist')" v-for="item in recentlySearchList" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { searchGood } from '@/api/search'

import index from 'vuex'

export default {
  name: 'SearchIndex',
  computed: {
    index () {
      return index
    }
  },
  data: () => {
    return {
      recentlySearchList: [],
      value: ''
    }
  },
  methods: {
    async onSearch() {
      // 通过交换赋值的方法无法让vue检测到
      // 需要实际修改数组长度才行
      const index = this.recentlySearchList.findIndex(value => value === this.value)
      if (index >= 0) {
        this.recentlySearchList = this.recentlySearchList.toSpliced(index, 1)
      }
      this.recentlySearchList.unshift(this.value)

      // const res = await searchGood(this.value)
      // console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
