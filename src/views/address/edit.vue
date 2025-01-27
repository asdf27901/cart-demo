<template>
  <div>
    <van-nav-bar fixed :title="$route.path === '/editAddress' ? '编辑地址' : '添加地址'" left-arrow border placeholder @click-left="$router.go(-1)" />

    <van-address-edit
      :area-list="areaList"
      :show-delete="$route.path === '/editAddress'"
      :tel-maxlength="11"
      :tel-validator="telValidator"
      :show-set-default="$route.path === '/editAddress'"
      @save="onSave"
      @delete="onDelete"
      :address-info="addressInfo"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { mapActions, mapMutations, mapState } from 'vuex'
import {
  addAddress,
  deleteAddress,
  fetchAddressDetail, fetchDefaultAddressId,
  setDefaultAddress,
  updateAddress
} from '@/api/address'
import { delLocalItem, getLocalItem, setLocalItem } from '@/utils/storage'

export default {
  name: 'AddressEdit',
  async created () {
    const addressId = this.$route.query.addressId

    const { data: { defaultId } } = await fetchDefaultAddressId()

    this.getRegionDataList()

    if (addressId) {
      await fetchAddressDetail(addressId)
        .then(res => {
          const selectedRegion = res.data.detail.region
          const areaCode = this.getRegionCode(selectedRegion.province, selectedRegion.city, selectedRegion.region)

          this.regionDetail = res.data.detail.region
          this.province_id = res.data.detail.province_id
          this.city_id = res.data.detail.city_id
          this.region_id = res.data.detail.region_id

          this.addressInfo = {
            id: res.data.detail.address_id,
            name: res.data.detail.name,
            addressDetail: res.data.detail.detail,
            tel: res.data.detail.phone,
            province: selectedRegion.province,
            city: selectedRegion.city,
            country: selectedRegion.region,
            areaCode,
            isDefault: defaultId === parseInt(addressId)
          }
        }).catch(error => {
          console.log(error)
        })
    }
  },
  data() {
    return {
      areaList,
      addressInfo: {},
      regionDetail: {},
      city_id: '',
      province_id: '',
      region_id: ''
    }
  },
  methods: {
    async onSave(content) {
      const addressId = this.$route.query.addressId
      const { name, tel: phone, addressDetail: detail, isDefault } = content
      const transferData = {
        name,
        phone,
        detail,
        region: this.setRegion([
          { name: content.province },
          { name: content.city },
          { name: content.county }
        ])
      }

      try {
        let res
        if (addressId) {
          transferData.addressId = addressId
          res = await updateAddress(transferData)
          if (isDefault) {
            await setDefaultAddress(addressId)
          }
        } else {
          res = await addAddress(transferData)
          await this.getAddressListAction()
          if (this.addressList.length === 1) {
            this.setSelectedAddressId(this.addressList[0].address_id)
            setLocalItem('selectedAddressId', this.addressList[0].address_id)
          }
        }

        if (res.status === 200) {
          this.$toast.success({
            message: res.message,
            forbidClick: true,
            duration: 1200
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1200)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async onDelete() {
      await deleteAddress(this.$route.query.addressId)
        .then(res => {
          if (res.status === 200) {
            const selectedAddressId = getLocalItem('selectedAddressId')
            if (selectedAddressId && selectedAddressId === parseInt(this.$route.query.addressId)) {
              this.setSelectedAddressId('')
              delLocalItem('selectedAddressId')
            }

            this.$toast.success({
              message: res.message,
              forbidClick: true,
              duration: 1200
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1200)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    setRegion(values) {
      const selectProvince = ['北京市', '天津市', '上海市', '重庆市'].includes(values[0].name) ? values[0].name.split('市')[0] : values[0].name
      const selectCity = values[1].name
      const selectRegion = values[2].name

      const provinceId = Object.keys(this.regionData).find(key => Object.values(this.regionData[key]).includes(selectProvince))

      const cities = this.regionData[provinceId].city
      const cityId = Object.keys(cities).find(key => Object.values(cities[key]).includes(selectCity))

      const regions = this.regionData[provinceId].city[cityId].region
      const regionId = Object.keys(regions).find(key => Object.values(regions[key]).includes(selectRegion))

      return [
        { value: provinceId, label: selectProvince },
        { value: cityId, label: selectCity },
        { value: regionId, label: selectRegion }
      ]
    },

    telValidator(tel) {
      return /^1(3[0-9]|4[5-9]|5[0-3,5-9]|6[2,5]|7[0-8]|8[0-9]|9[1,8-9])\d{8}$/.test(tel)
    },

    getRegionCode(province, city, region) {
      const newProvince = ['北京', '上海', '重庆', '天津'].includes(province) ? province + '市' : province
      const provinceCode = Object.keys(this.areaList.province_list).find(key => this.areaList.province_list[key] === newProvince)

      const cityCode = Object.keys(this.areaList.city_list).filter(key => key.slice(0, 2) === provinceCode.slice(0, 2)).find(key => this.areaList.city_list[key] === city)

      return Object.keys(this.areaList.county_list).filter(key => key.slice(0, 4) === cityCode.slice(0, 4)).find(key => this.areaList.county_list[key] === region)
    },
    ...mapActions('address', ['getRegionDataList', 'getAddressListAction']),
    ...mapMutations('address', ['setSelectedAddressId'])
  },
  computed: {
    ...mapState('address', ['regionData', 'addressList'])
  }
}
</script>

<style scoped>

</style>
