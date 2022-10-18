import { createI18n } from 'vue-i18n'
import zhCN from './zh-cn'
import type { I18n, Locale } from 'vue-i18n'
import type { App } from 'vue'

class EkkoI18n {
  i18n: I18n<EkkoI18nMessage, {}, {}, Locale, false>
  private loadedLang: Array<string> = []

  constructor() {
    this.i18n = createI18n({
      legacy: false,
      allowComposition: true,
      locale: zhCN.name,
      fallbackLocale: zhCN.name,
      messages: {
        [zhCN.name]: zhCN.message
      }
    })
  }

  setLang(locale: string): EkkoI18nMessage {
    this.i18n.global.locale.value = locale
    document.querySelector('html')?.setAttribute('lang', locale)
    return this.i18n.global.messages.value
  }

  async loadLocale(locale: string) {
    // 相同语言
    if (this.i18n.global.locale.value === locale) {
      return Promise.resolve(this.setLang(locale))
    }
    // 语言已经加载
    if (this.loadedLang.includes(locale)) {
      return Promise.resolve(this.setLang(locale))
    }
    // 语言未加载
    return import(`./${locale}/index.ts`).then(message => {
      this.i18n.global.setLocaleMessage(locale, message.default.message)
      this.loadedLang.push(locale)
      return this.setLang(locale)
    })
  }

  install(app: App<Element>) {
    app.use(this.i18n)
  }
}

const i18n = new EkkoI18n()

export default i18n
