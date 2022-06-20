import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/components/error-page/404.vue')
  },
  {
    path: '/401',
    component: () => import('@/components/error-page/401.vue')
  },
  {
    path: '/',
    name: 'Editor',
    meta: { title: 'Editor' },
    component: () => import('@/views/Editor/index.vue'),
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
