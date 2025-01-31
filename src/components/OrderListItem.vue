<template>
  <div>
    <div class="order-list-item" v-if="list.length !== 0">
      <div v-for="item in list" :key="item.order_id">
        <div class="tit">
          <div class="time">{{ item.create_time }}</div>
          <div class="status">
            <span>{{ item.state_text }}</span>
          </div>
        </div>
        <div class="list">
          <div class="list-item" v-for="good in item.goods" :key="good.goods_id">
            <div class="goods-img">
              <img :src="good.goods_image" alt="">
            </div>
            <div class="goods-content text-ellipsis-2">
              {{ good.goods_name }}
            </div>
            <div class="goods-trade">
              <p>¥ {{ good.goods_price }}</p>
              <p>x {{ good.total_num }}</p>
            </div>
          </div>
        </div>
        <div class="total">
          共{{ item.goods_num }}件商品，总金额 ¥{{ item.total_price }}
        </div>
        <div class="actions">
          <span v-if="item.state_text === '待支付'">立刻付款</span>
          <span v-if="item.state_text === '待发货'">申请取消</span>
          <span v-if="item.state_text === '待收货'">确认收货</span>
          <span v-if="item.state_text === '待评价'">评价</span>
        </div>
      </div>
    </div>
    <van-empty
      v-else
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      :description="getDescription()"
    />
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    status: {
      type: String,
      default: 'all'
    }
  },
  methods: {
    getDescription() {
      let statusText
      switch (this.status) {
        case 'payment':
          statusText = '待支付'
          break
        case 'delivery':
          statusText = '待发货'
          break
        case 'received':
          statusText = '待收货'
          break
        case 'comment':
          statusText = '待评价'
          break
        default:
          return '当前订单列表为空~~请下单~~'
      }
      return `没有${statusText}订单`
    }
  }
}
</script>

<style lang="less" scoped>
.order-list-item {
  margin: 10px auto;
  width: 94%;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 0.5px 2px 0 rgba(0,0,0,.05);
  border-radius: 8px;
  color: #333;
  font-size: 13px;

  .tit {
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .status {
      color: #fa2209;
    }
  }

  .list-item {
    display: flex;
    .goods-img {
      width: 90px;
      height: 90px;
      margin: 0px 10px 10px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-content {
      flex: 2;
      line-height: 18px;
      max-height: 36px;
      margin-top: 8px;
    }
    .goods-trade {
      flex: 1;
      line-height: 18px;
      text-align: right;
      color: #b39999;
      margin-top: 8px;
    }
  }

  .total {
    text-align: right;
  }
  .actions {
    text-align: right;
    span {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      color: #383838;
      border: 0.5px solid #a8a8a8;
      font-size: 14px;
      padding: 0 15px;
      border-radius: 5px;
      margin: 10px 0;
    }
  }
}

.van-empty {
  min-height: calc(100vh - 45px - 44px);
}
</style>
