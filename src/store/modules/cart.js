import { fetchCartList, updateCart } from '@/api/cart'

const state = {
  cartList: []
}

const mutations = {
  updateCartList(state, { list }) {
    state.cartList = list
  },

  changeCheckStatus(state, goodsId) {
    const good = state.cartList.find(value => value.id === goodsId)
    good.isChecked = !good.isChecked
  },

  changeCheckStatusByChecked(state, isChecked) {
    for (const good of state.cartList) {
      good.isChecked = isChecked
    }
  }
}

const actions = {
  async getCartList(context, needCheckedGoods = []) {
    const { data } = await fetchCartList()
    data.list.forEach(value => {
      value.isChecked = needCheckedGoods.includes(value.id)
    })
    context.commit('updateCartList', data)
  },

  async updateCartAction(context, { goodsId, goodsNum, goodsSkuId }) {
    try {
      await updateCart(goodsId, goodsNum, goodsSkuId)
      // 从getters中获取需要选中的商品id，组成一个新的数组对象
      const needCheckedIds = context.getters.checkedGoods.map(v => v.id)
      // 更新了购物车数量后需要重新请求getCartList
      context.dispatch('getCartList', needCheckedIds)
    } catch (e) {
      console.log(e)
    }
  }
}

const getters = {
  checkedGoods(state) {
    return state.cartList.filter(v => v.isChecked)
  },

  totalPrice(state, getters) {
    return getters.checkedGoods.reduce((pre, curr) => pre + curr.goods.goods_price_min * curr.goods_num, 0).toFixed(2)
  },

  goodsNum(state) {
    return state.cartList.reduce((pre, curr) => pre + curr.goods_num, 0)
  },

  checkedNum(state, getters) {
    return getters.checkedGoods.length
  }
}

const namespaced = true

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
