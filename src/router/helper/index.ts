import { createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

export const NotFoundPage = () => import('@/pages/error/NotFound.vue')
export const NoPermissionPage = () => import('@/pages/error/NoPermission.vue')
export const RedirectPage = () => import('@/pages/redirect/index')

export const scrollBehavior: RouterScrollBehavior = to => {
  return new Promise(resolve => {
    if (to.hash) {
      const el = document.querySelector(to.hash)
      if (el) {
        resolve({ el, behavior: 'smooth' })
      }
    }

    const scrollPosition = { left: 0, top: 0 }

    const duration = !scrollPosition.left && !scrollPosition.top ? 0 : 350

    setTimeout(() => resolve(scrollPosition), duration)
  })
}

/** 路由默认设置 */
export const defaultConfig = (routers: RouteRecordRaw[]) => {
  return {
    scrollBehavior: scrollBehavior,
    history: createWebHistory(),
    routes: routers
  }
}

/** 固定路由 */
export const staticRouters: RouteRecordRaw[] = [
  {
    name: 'Redirect',
    path: '/redirect/:path(.*)',
    component: RedirectPage,
    meta: {
      title: 'Redirect',
      hidden: true,
      withoutLogin: true
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      title: '404',
      hidden: true,
      withoutLogin: true
    }
  },
  {
    path: '/403',
    name: 'NoPermission',
    component: NoPermissionPage,
    meta: {
      title: '401',
      hidden: true,
      withoutLogin: true
    }
  },
  {
    path: '/:w+',
    redirect: '/404',
    meta: {
      title: 'Mid-404',
      hidden: true,
      withoutLogin: true
    }
  }
]

/** 初始化路由表 */
export const initRoutes = (): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = []
  result.push({
    name: 'Index',
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      hidden: true,
      withoutLogin: true
    },
    children: [
      {
        name: 'Index',
        path: '',
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: 'Index',
          hidden: true,
          withoutLogin: true
        }
      }
    ]
  })
  result.push(...staticRouters)
  return result
}
