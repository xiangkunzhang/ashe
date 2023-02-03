import { RouteRecordRaw } from 'vue-router'

export const NotFoundPage = () => import('@/pages/error/NotFound.vue')
export const NoPermissionPage = () => import('@/pages/error/NoPermission.vue')
export const RedirectPage = () => import('@/pages/redirect/index')

const basicRouters: RouteRecordRaw[] = [
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

export const staticRouters: RouteRecordRaw[] = [
  {
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
  },
  {
    name: 'Auth',
    path: '/auth',
    component: () => import('@/layout/login.vue'),
    meta: {
      title: '',
      hidden: true,
      withoutLogin: true
    },
    children: [
      {
        name: 'AuthLogin',
        path: 'login',
        component: () => import('@/pages/auth/Login.vue'),
        meta: {
          title: 'Login',
          hidden: true,
          withoutLogin: true
        }
      }
    ]
  },
  ...basicRouters
]
