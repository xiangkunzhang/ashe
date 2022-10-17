import { useTitle } from '@vueuse/core'
import type { Router } from 'vue-router'

export default class TitleGuard {
  router: Router

  constructor(r: Router) {
    this.router = r
    this.init()
  }

  init() {
    this.router.beforeEach(async (_to, _from, next) => {
      // 开始 loadingBar
      window.$loadingBar?.start()
      // 页面跳转权限处理
      next()
    })

    this.router.afterEach(to => {
      console.log('router.afterEach')
      // 设置document title
      useTitle(to.meta.title)
      // 结束 loadingBar
      window.$loadingBar?.finish()
    })
  }
}

export function initTitleGuard(r: Router): void {
  new TitleGuard(r)
}
