<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active">
      <van-tab title="全部" @click="active = 0"></van-tab>
      <van-tab title="待支付" @click="active = 1"></van-tab>
      <van-tab title="待发货" @click="active = 2"></van-tab>
      <van-tab title="待收货" @click="active = 3"></van-tab>
      <van-tab title="待评价" @click="active = 4"></van-tab>
    </van-tabs>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onload"
    >
      <OrderListItem :list="orderList" :status="orderStatus[active]"/>
    </van-list>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getStatusOrderList } from '@/api/order'
export default {
  name: 'OrderIndex',
  components: {
    OrderListItem
  },
  data () {
    return {
      active: 0,
      orderStatus: {
        0: 'all',
        1: 'payment',
        2: 'delivery',
        3: 'received',
        4: 'comment'
      },
      page: 1,
      orderList: [],
      loading: false,
      finished: false,
      last_page: 0
    }
  },
  methods: {
    async getOrderList() {
      await getStatusOrderList(this.orderStatus[this.active], this.page)
        .then(res => {
          this.orderList = res.data.list.data
          this.last_page = res.data.list.last_page
          this.orderList.forEach(value => {
            value.goods_num = value.goods.reduce((pre, curr) => pre + curr.total_num, 0)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    async onload() {
      if (this.active !== 0) {
        this.page = this.page + 1
      }

      try {
        const res = await getStatusOrderList(this.orderStatus[this.active], this.page)
        const orderArray = res.data.list.data
        this.last_page = res.data.list.last_page
        orderArray.forEach(value => {
          value.goods_num = value.goods.reduce((pre, curr) => pre + curr.total_num, 0)
        })
        this.orderList.push(...orderArray)

        this.loading = false
      } catch (e) {
        console.log(e)
      }

      if (this.page >= this.last_page) {
        console.log(this.page)
        console.log(this.last_page)
        this.finished = true
      }
      if (this.active === 0) {
        this.page = this.page + 1
      }
    }
  },
  watch: {
    active: {
      // immediate: true, // 开启后进来立即执行一次下面handler函数
      handler() {
        this.page = 1
        this.getOrderList()
        this.finished = false
        window.scrollTo({ top: 0 })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
