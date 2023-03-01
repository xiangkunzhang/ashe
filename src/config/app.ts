import { createApp } from 'vue'
import { ekkoRouter } from '@/router'
import { appStore } from '@/store'
import I18n from '@/i18n'
import AppPage from '@/App.vue'

export const initApp = () => {
  const app = createApp(AppPage)
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
  app.use(ekkoRouter).use(appStore).use(I18n)
  return app
}

export default initApp()
