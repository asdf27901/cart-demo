<template>
  <keep-alive :exclude="['SearchList', 'DetailIndex']">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import { getLocalItem } from '@/utils/storage'
import { mapMutations } from 'vuex'

export default {
  created () {
    // 页面初始化时，从本地查找userInfo，放入vuex/user中
    const userObj = getLocalItem('userInfo')
    if (userObj) {
      this.setUserInfo(userObj)
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo'])
  }
}
</script>

<style lang="less">
</style>
