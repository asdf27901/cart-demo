import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/searchList.vue'
import Pay from '@/views/pay/index.vue'
import Detail from '@/views/detail/index.vue'
import Orders from '@/views/orders/index.vue'
import Home from '@/views/layout/home.vue'
import Sort from '@/views/layout/sort.vue'
import Cart from '@/views/layout/cart.vue'
import My from '@/views/layout/my.vue'

Vue.use(VueRouter)

const routes = [
  { name: '登录', path: '/login', component: Login },
  {
    name: '初始页',
    path: '/',
    component: Layout,
    children: [
      { name: '主页', path: '/home', component: Home },
      { name: '分类', path: '/sort', component: Sort },
      { name: '购物车', path: '/cart', component: Cart },
      { name: '我的', path: '/my', component: My },
    ],
    redirect: '/home'
  },
  { name: '搜索页', path: '/search', component: Search },
  { name: '搜索列表', path: '/searchList', component: SearchList },
  { name: '支付页', path: '/pay', component: Pay },
  { name: '详情页', path: '/detail', component: Detail },
  { name: '订单页', path: '/orders', component: Orders },
]

const router = new VueRouter({
  routes
})

export default router
