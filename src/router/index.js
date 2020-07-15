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
    path: '/',
    name: 'Home',
    components:{
      content:() => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      header: () => import('../components/layout/Layout.vue'),
      slider:() => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--首页' }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components:{
      content:() => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      header: () => import('../components/layout/Layout.vue'),
      slider:() => import('../components/Header.vue'),
    },
    meta: { title: '东培学堂--关于' }
  },
  {
    path: '/login',
    name: 'Login',
    components:{
      login:() => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    },
    meta: { title: '东培学堂--登录' }
  },
  {
    path: '/404',
    name: 'error',
    components:{
      content:() => import(/* webpackChunkName: "login" */ '../views/404.vue'),
    },
    meta: { title: '东培学堂--错误页面' }
  },
  {path: '*', redirect: '/404', hidden: true}
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
