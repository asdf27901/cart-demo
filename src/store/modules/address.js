import { fetchAddressList, fetchDefaultAddressId, fetchRegionList } from '@/api/address'

const state = {
  addressList: [],
  defaultAddressId: '',
  selectedAddressId: '',
  regionData: ''
}

const mutations = {
  setDefaultAddressId(state, defaultAddressId) {
    state.defaultAddressId = defaultAddressId
  },

  setSelectedAddressId(state, selectedAddressId) {
    state.selectedAddressId = selectedAddressId
  },

  setAddressList(state, addressList = []) {
    state.addressList = addressList
  },

  setRegionData(state, regionData = {}) {
    state.regionData = regionData
  }
}

const actions = {
  async getAddressListAction(context) {
    try {
      const { data: { list } } = await fetchAddressList()
      context.commit('setAddressList', list)
    } catch (e) {
      console.log(e)
    }
  },

  async getDefaultAddressIdAction(context) {
    try {
      const { data: { defaultId } } = await fetchDefaultAddressId()
      context.commit('setDefaultAddressId', defaultId)
    } catch (e) {
      console.log(e)
    }
  },

  async getRegionDataList(context) {
    try {
      const { data: { list } } = await fetchRegionList()
      context.commit('setRegionData', list)
    } catch (e) {
      console.log(e)
    }
  }
}

const getters = {
  newAddressList(state) {
    return state.addressList.map(value => {
      return {
        ...value,
        id: value.address_id,
        tel: value.phone,
        address: value.region.province + value.region.city + value.region.region + value.detail,
        isDefault: value.address_id === state.defaultAddressId
      }
    }).map(value => {
      delete value.address_id
      delete value.province_id
      delete value.phone
      delete value.city_id
      delete value.region_id
      return value
    })
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
