import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/style/common.less'

Vue.config.productionTip = false

Vue.directive('loading', {
  update: (el, binding) => {
    if (binding.value) {
      el.style.display = 'none'
    } else {
      el.style.display = binding.arg
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
