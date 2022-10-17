import type { Router } from 'vue-router'
import { initTitleGuard } from '@/router/guard/title'

export default class Guard {
  router: Router

  constructor(router: Router) {
    this.router = router
    this.init()
  }

  init() {
    initTitleGuard(this.router)
  }
}

export function initGuard(router: Router) {
  new Guard(router)
}
