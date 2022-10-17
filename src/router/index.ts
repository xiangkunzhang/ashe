import type { App } from 'vue'
import { createRouter } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'
import { initGuard } from '@/router/guard'
import { defaultConfig, initRoutes } from '@/router/helper'

class EkkoRouter {
  router: Router
  routers: RouteRecordRaw[]

  constructor() {
    this.routers = initRoutes()
    this.router = createRouter(defaultConfig(this.routers))
    this.init()
  }

  init() {
    this.makeGuard()
  }

  makeGuard() {
    initGuard(this.router)
  }

  install(app: App<Element>) {
    app.use(ekkoRouter.router)
  }
}

export const ekkoRouter = new EkkoRouter()

export default ekkoRouter.router
