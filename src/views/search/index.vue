<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search
      show-action
      placeholder="请输入搜索关键词"
      clearable
      v-model.trim="value"
      @search="onSearch(value)"
    >
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="recentlySearchList.length !== 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="recentlySearchList = []"/>
      </div>
      <div class="list">
        <div
          class="list-item"
          @click="onSearch(item)"
          v-for="item in recentlySearchList"
          :key="item"
        >{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getLocalItem, setLocalItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data: () => {
    return {
      recentlySearchList: [],
      value: ''
    }
  },
  created () {
    const searchList = getLocalItem('searchList')
    this.recentlySearchList = searchList || []
  },
  methods: {
    async onSearch(v) {
      // 如果字符串为空则显示toast弹窗
      if (!v) {
        return Toast.fail({
          duration: 1000,
          message: '请输入搜索内容',
          forbidClick: true
        })
      }
      // 通过交换赋值的方法无法让vue检测到
      // 需要实际修改数组长度才行
      const index = this.recentlySearchList.findIndex(value => value === v)
      if (index >= 0) {
        this.recentlySearchList = this.recentlySearchList.toSpliced(index, 1)
      }
      this.recentlySearchList.unshift(v)
      this.$router.push({
        path: '/searchList',
        query: {
          search: v
        }
      })
    }
  },
  watch: {
    // 监听搜索历史数据，发生变动修改本地缓存中的数据
    recentlySearchList: {
      deep: true,
      handler: newVal => {
        setLocalItem('searchList', newVal)
      }
    }
  },
  deactivated () {
    this.value = ''
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
