import { useTitle } from '@vueuse/core'
import type { Router } from 'vue-router'
import { useAppSettingStore } from '@/store/modules/AppSetting'
import { useAuthStoreOut } from '@/store/modules/Auth'

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
      const settingStore = useAppSettingStore()
      await settingStore.setLocale(settingStore.getLocale)
      // 页面跳转权限处理
      next()
    })

    this.router.afterEach(to => {
      console.log('router.afterEach')
      const c = useAuthStoreOut()
      console.log('c.getToken', c, c.getToken)
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
