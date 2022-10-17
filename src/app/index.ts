import { createApp } from 'vue'
import { ekkoRouter } from '@/router'
import { appStore } from '@/store'
import App from '@/App.vue'

export const initApp = () => {
  const app = createApp(App)
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
  app.use(ekkoRouter)
  app.use(appStore)
  return app
}

export default initApp()
