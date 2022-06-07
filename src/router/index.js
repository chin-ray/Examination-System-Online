import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/redirect',
    hidden: true,
    // component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
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
    name: 'Home',
    meta: { title: 'Home' },
    component: () => import('@/views/home/index.vue'),
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
