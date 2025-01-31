import { Dialog } from 'vant'

export default {
  data() {
    return {
      testData: '测试一下'
    }
  },
  created () {
    console.log('我是mixin的created')
  },
  methods: {
    checkLogin() {
      if (!this.$store.getters['user/token']) {
        Dialog.confirm({
          title: '温馨提示',
          message: '此时需要登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              back: this.$route.fullPath
            }
          })
        }).catch(() => {
          Dialog.close()
        })
        return false
      }
      return true
    }
  }
}
