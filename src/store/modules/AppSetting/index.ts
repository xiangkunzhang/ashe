import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAppSettingStore = defineStore({
  id: 'AppSetting',
  state: (): AppSetting => ({
    isMobile: false
  }),
  getters: {
    getIsMobile(state): boolean {
      return state.isMobile
    }
  },
  actions: {
    setIsMobile(value: boolean): void {
      this.isMobile = value
    }
  }
})

// Need to be used outside the setup
export function useAppSettingStoreOut() {
  return useAppSettingStore(store)
}
