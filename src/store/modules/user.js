import { setLocalItem } from '@/utils/storage'

const state = () => {
  return {
    userInfo: {
      token: '',
      userId: ''
    }
  }
}

const getters = {
  token: state => {
    return state.userInfo.token
  }
}

const mutations = {
  setUserInfo: (state, userObj) => {
    state.userInfo = userObj
    setLocalItem('userInfo', userObj)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
