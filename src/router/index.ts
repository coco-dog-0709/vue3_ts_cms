import { createRouter, createWebHashHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

import { cache } from '@/utils'

import { getUserRoutes } from '@/global'

//routes应该有类型
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态添加用户路由:
const userMenus = cache.getCache('userMenus')
if (userMenus) {
  const userRoutes = getUserRoutes(userMenus)
  userRoutes.forEach((route) => {
    router.addRoute('main', route)
  })
}

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = cache.getCache('token')
    if (!token) {
      return '/login'
    }
    // /main时默认重定向到/main/analysis/overview
    if (to.path === '/main') {
      router.push('/main/analysis/overview')
    }
  }
})

export default router
