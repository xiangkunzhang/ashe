import type { Router } from 'vue-router'
import { useAuthStoreOut } from '@/store/modules/Auth'

export default class TitleGuard {
  router: Router

  constructor(r: Router) {
    this.router = r
    this.init()
  }

  init() {
    this.router.beforeEach(async (_to, _from, next) => {
      // 页面跳转权限处理
      const authStore = useAuthStoreOut()
      if (!_to.meta.withoutLogin) {
        if (!authStore.getToken) {
          next({ name: 'AuthLogin' })
        }
      }

      next()
    })
  }
}

export function initAuthGuard(r: Router): void {
  new TitleGuard(r)
}
