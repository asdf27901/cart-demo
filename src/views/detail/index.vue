<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" indicator-color="#fff">
      <van-swipe-item v-for="image in goodDetail.goods_images" :key="image.external_url">
        <img :src="image.external_url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ goodDetail.goods_price_max }}</span>
          <span class="oldprice">￥{{ goodDetail.line_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ goodDetail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ goodDetail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ totalComment }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || require('@/assets/default-avatar.png')" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score === 10 ? 5 : item.score === 20 ? 2.5 : 1" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/kHgx21fZMWwqirkMhawkAw.jpg" alt="">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/0rRMmncfF0kGjuK5cvLolg.jpg" alt="">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/2P04A4Jn0HKxbKYSHc17kw.jpg" alt="">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/MT4k-mPd0veQXWPPO5yTIw.jpg" alt="">
    </div>

    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" @click="$router.replace('/home')"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartTotal > 0 ? cartTotal : ''" @click="$router.replace('/cart')"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="clickBtn('加入购物车')"/>
      <van-goods-action-button type="danger" text="立即购买" @click="clickBtn('立即购买')"/>
    </van-goods-action>

    <van-action-sheet v-model="showSheet" :title="title">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="goodDetail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ goodDetail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ goodDetail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <!-- v-model 本质上 :value 和 @input 的简写 -->
          <CustomStepper v-model="buyCount"></CustomStepper>
        </div>

<!--         有库存才显示提交按钮-->
        <div class="showbtn" v-if="goodDetail.stock_total > 0">
          <div class="btn" v-if="title === '加入购物车'" @click="joinCart">加入购物车</div>
          <div class="btn now" v-else @click="buyNow">立刻购买</div>
        </div>

        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { fetchGoodDetail } from '@/api/goods'
import { fetchCommentList, fetchCommentTotalCount } from '@/api/comment'
import CustomStepper from '@/components/CustomStepper.vue'
import { Toast } from 'vant'
import { addCard, cartCount } from '@/api/cart'
import checkLoginConfirm from '@/mixin/checkLoginConfirm'

export default {
  name: 'DetailIndex',
  mixins: [checkLoginConfirm],
  async created () {
    const goodId = this.$route.params.good_id
    const [
      { data: { detail } },
      { data: { list } },
      { data: { total: { all } } },
      { data: { cartTotal } }
    ] = await Promise.all([
      fetchGoodDetail(goodId),
      fetchCommentList(goodId),
      fetchCommentTotalCount(goodId),
      cartCount()
    ])
    this.goodDetail = detail
    this.commentList = list.reverse()
    this.totalComment = all
    this.cartTotal = cartTotal
  },
  components: {
    CustomStepper
  },
  data () {
    return {
      goodDetail: {},
      commentList: [],
      totalComment: '',
      showSheet: false,
      title: '',
      buyCount: 1,
      cartTotal: 0
    }
  },
  methods: {
    clickBtn(title) {
      this.showSheet = !this.showSheet
      this.title = title
    },
    async joinCart() {
      if (!this.checkLogin()) {
        return
      }
      const res = await addCard(this.goodDetail.goods_id, this.buyCount, this.goodDetail.skuList[0].goods_sku_id)
      Toast.success({
        message: res.message,
        forbidClick: true,
        onClose: () => {
          this.cartTotal = res.data.cartTotal
          this.showSheet = !this.showSheet
        }
      })
    },
    buyNow() {
      if (!this.checkLogin()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodDetail.goods_id,
          goodsNum: this.buyCount,
          goodsSkuId: this.goodDetail.skuList[0].goods_sku_id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

// 弹层的样式
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
</style>
