import { defineStore } from 'pinia'
import { store } from '@/store'
import i18n from '@/i18n'

export const useAppSettingStore = defineStore({
  id: 'AppSetting',
  state: (): AppSetting => ({
    isMobile: false,
    locale: 'zh-cn',
    i18nMessage: {
      NaiveUILocale: {},
      NaiveDateLocale: {}
    }
  }),
  getters: {
    getLocale(state): string {
      return state.locale
    },
    getIsMobile(state): boolean {
      return state.isMobile
    },
    getLocaleMessage(state): EkkoI18nMessage {
      return state.i18nMessage
    }
  },
  actions: {
    setIsMobile(value: boolean): void {
      this.isMobile = value
    },
    async setLocale(locale) {
      const message = await i18n.loadLocale(locale)
      this.locale = locale
      this.i18nMessage = message[locale]
    }
  }
})

// Need to be used outside the setup
export function useAppSettingStoreOut() {
  return useAppSettingStore(store)
}
