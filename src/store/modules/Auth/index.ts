import { defineStore } from 'pinia'
import { store } from '@/store'
import { useWebStorage } from '@/utils/storage'
import { ekkoRouter } from '@/router'

const storageAuth = useWebStorage('AuthToken')
// const storageAuthUser = useWebStorage('AuthUser')
export const useAuthStore = defineStore({
  id: 'Auth',
  state: (): StoreAuth => ({
    token: '',
    user: {
      id: '',
      username: ''
    }
  }),
  getters: {
    getToken(state): string {
      if (state.token) {
        return ''
      }
      const token = storageAuth.getLocal<string>() || ''
      this.token = token
      return token
    },
    getIsLogin(): boolean {
      return !!this.getToken
    }
  },
  actions: {
    setToken(value: string): void {
      this.token = value
      storageAuth.setLocal(value)
    },
    setLoginUser(token: string) {
      this.setToken(token)
    },
    setLoginOut(): void {
      this.token = ''
      storageAuth.clear()
      ekkoRouter.router.replace({ name: 'AuthLogin' })
    }
  }
})

// Need to be used outside the setup
export function useAuthStoreOut() {
  return useAuthStore(store)
}
