import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

/* Router Modules */
import asyncMenus from './modules/menu'

export const constantRoutes = [
  {
    path: '/redirect',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/401',
    hidden: true,
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        meta: { title: 'Dashboard', elSvgIcon: 'Fold', affix: true },
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  ...asyncMenus,
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
