import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: { name: "index" }
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        keepAlive: false
      },
      component: (resolve) => {
        require(['components/Index'], resolve)
      }
    },
    {
      path: '/vux',
      name: 'vux',
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: false,
        keepAlive: false
      },
      component: (resolve) => {
        require(['components/HelloWorld'], resolve)
      }
    },
    {
      path: '/surveyDetail/:id',
      name: 'surveyDetail',
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: false
      },
      component: (resolve) => {
        require(['components/surveyDetail'], resolve)
      }
    },
    {
      name: '404',
      path: '/404',
      component: resolve => require(['components/notFound/404'], resolve),
    },
    {
      path: '*',
      redirect: { name: "404" }
    }
  ]
})
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('islogin')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
