import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getLocalItem } from '@/utils/storage'

Vue.use(VueRouter)

const routes = [
  { name: '登录', path: '/login', component: () => import('@/views/login/index.vue') },
  {
    name: '初始页',
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      { name: '主页', path: '/home', component: () => import('@/views/layout/home.vue'), meta: { cache: true } },
      { name: '分类', path: '/sort', component: () => import('@/views/layout/sort.vue'), meta: { cache: true } },
      { name: '购物车', path: '/cart', component: () => import('@/views/layout/cart.vue') },
      { name: '我的', path: '/my', component: () => import('@/views/layout/my.vue') },
    ],
    redirect: '/home'
  },
  { name: '搜索页', path: '/search', component: () => import('@/views/search/index.vue') },
  { name: '搜索列表', path: '/searchList', component: () => import('@/views/search/searchList.vue') },
  { name: '支付页', path: '/pay', component: () => import('@/views/pay/index.vue') },
  { name: '详情页', path: '/detail/:good_id', component: () => import('@/views/detail/index.vue') },
  { name: '订单页', path: '/orders', component: () => import('@/views/orders/index.vue') },
  { name: '收货地址页', path: '/address', component: () => import('@/views/address/index.vue') },
  { name: '新建收货地址页', path: '/createAddress', component: () => import('@/views/address/edit.vue') },
  { name: '编辑收货地址页', path: '/editAddress', component: () => import('@/views/address/edit.vue') }
]

const router = new VueRouter({
  routes
})

// 当路由跳转被强制取消时，会抛出一个Promise.reject异常，类型为NavigationFailure
// 官方屏蔽异常方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}

const AUTH_PAGE_PATH = [
  '/cart',
  '/my',
  '/pay',
  '/orders',
  '/address',
  '/createAddress',
  '/editAddress'
]

router.beforeEach((to, from, next) => {
  if (!AUTH_PAGE_PATH.includes(to.path)) {
    next()
    return
  }

  if (!store.getters['user/token'] && !getLocalItem('userInfo')) {
    next('/login')
  } else { // 已登录
    next()
  }
})

export default router
