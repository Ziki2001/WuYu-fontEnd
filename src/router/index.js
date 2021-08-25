import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index',
    component: () => import('../views/Home/Index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        meta: { index: 1 },
        component: () => import('../views/Home/Index/Index.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/manager',
        name: 'manager',
        meta: { index: 2 },
        component: () => import('../views/Home/Manage/Index.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由拦截
router.beforeEach(function (to, from, next) {
  if (!localStorage.getItem('user')) {
    if (to.path === '/manager') {
      next('/login')
    }
  };
  next()
})
export default router
