// 权限拦截在路由跳转使用 导航守卫

import router from '@/router'
import store from '@/store' // 引入store实例，和组件中的this.$store一回事
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出，只需要让代码执行即可
// 前置守卫
// next是前置守卫必须执行的钩子 next必须执行，如果不执行 页面就死了
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/loign', '/404']
router.beforeEach(async (to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有token 判断是否登录
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next() // 放行
    }
  } else {
    // 没有token判断是否在白名单
    if (whiteList.indexOf(to.path)) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 手动关闭一次 解决手动切换地址时候进度条不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
