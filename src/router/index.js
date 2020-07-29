import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// export const constantRouterMap = [
//   {path: '/login', component: () => import('@/views/login/index'), hidden: true},
//   {path: '/404', component: () => import('@/views/404'), hidden: true},
//   {
//     path: '',
//     component: Layout,
//     redirect: '/home',
//     children: [{
//       path: 'home',
//       name: 'home',
//       component: () => import('@/views/home/index'),
//       meta: {title: '首页', icon: 'home'}
//     }]
//   }
// ]

const routes = [
  {
    path: '/home',
    name: 'Home',
    components: {
      content: () =>
        import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      header: () => import('../components/layout/Layout.vue'),
      slider: () => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--首页' },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      content: () =>
        import(/* webpackChunkName: "about" */ '../views/About.vue'),
      header: () => import('../components/layout/Layout.vue'),
      slider: () => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--关于' },
  },
  {
    path: '/',
    name: 'Login',
    components: {
      content: () =>
        import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    },
    meta: { title: '东培学堂--登录' },
  },
  {
    path: '/404',
    name: 'error',
    components: {
      content: () => import(/* webpackChunkName: "login" */ '../views/404.vue'),
    },
    meta: { title: '东培学堂--错误页面' },
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/recruitView/myClients',
    name: 'myClients',
    components: {
      content: () =>
        import(
          /* webpackChunkName: "about" */ '../views/recruitView/myClients.vue'
        ),
      header: () => import('../components/layout/Layout.vue'),
      slider: () => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--我的客户' },
  },
  {
    path: '/recruitView/IntentionEntry',
    name: 'IntentionEntry',
    components: {
      content: () =>
        import(
          /* webpackChunkName: "about" */ '../views/recruitView/IntentionEntry.vue'
        ),
      header: () => import('../components/layout/Layout.vue'),
      slider: () => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--意向录入' },
  },
  {
    path: '/recruitView/payMent',
    name: 'payMent',
    components: {
      content: () =>
        import(
          /* webpackChunkName: "about" */ '../views/recruitView/payMent.vue'
        ),
      header: () => import('../components/layout/Layout.vue'),
      slider: () => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--学员缴费' },
  },
  {
    path: '/recruitView/studentDetail',
    name: 'studentDetail',
    components: {
      content: () =>
        import(
          /* webpackChunkName: "about" */ '../views/recruitView/studentDetail.vue'
        ),
      header: () => import('../components/layout/Layout.vue'),
      slider: () => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--学员缴费' },
  },
  {
    path: '/recruitView/studyReport',
    name: 'studyReport',
    components: {
      content: () =>
        import(
          /* webpackChunkName: "about" */ '../views/recruitView/studyReport.vue'
        ),
      header: () => import('../components/layout/Layout.vue'),
      slider: () => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--学习报告' },
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
