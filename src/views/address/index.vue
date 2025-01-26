<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar fixed title="收货地址" left-arrow border placeholder @click-left="$router.go(-1)" />

    <!-- 地址列表 -->
    <div class="address-list" v-if="newAddressList.length > 0">
      <van-address-list
        v-model="chosenAddressId"
        :list="newAddressList"
        default-tag-text="默认"
        @add="$router.push('/createAddress')"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>

    <van-empty
      v-else
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="快去添加收货地址吧~"
      v-loading:flex="isLoading"
    >
      <van-button round type="danger" @click="$router.push('/createAddress')">添加地址</van-button>
    </van-empty>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { getLocalItem, setLocalItem } from '@/utils/storage'

export default {
  name: 'AddressIndex',
  async created () {
    await this.getDefaultAddressIdAction()
    this.chosenAddressId = getLocalItem('selectedAddressId') || this.selectedAddressId || this.defaultAddressId
    setLocalItem('selectedAddressId', this.chosenAddressId)
    await this.getAddressListAction()
    this.setSelectedAddressId(this.chosenAddressId)
    this.isLoading = false
  },
  data() {
    return {
      chosenAddressId: '',
      isLoading: true
    }
  },
  methods: {
    onEdit (address) {
      // 处理编辑地址的逻辑
      this.$router.push({
        path: 'editAddress',
        query: {
          addressId: address.id
        }
      })
    },
    onSelect(item) {
      this.setSelectedAddressId(item.id)
      setLocalItem('selectedAddressId', item.id)
      this.$router.go(-1)
    },
    ...mapActions('address', ['getAddressListAction', 'getDefaultAddressIdAction']),
    ...mapMutations('address', ['setSelectedAddressId'])
  },
  computed: {
    ...mapGetters('address', ['newAddressList']),
    ...mapState('address', ['selectedAddressId', 'defaultAddressId'])
  }
}
</script>

<style scoped>
.address-list{
  min-height: calc(100vh - 45px);
  padding-bottom: 20px;
  background-color: #f9f9f9;
}
.van-empty {
  margin-top: 120px;
}
</style>
