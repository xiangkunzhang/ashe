import { defineStore } from 'pinia'
import { store } from '@/store'
import { useWebStorage } from '@/utils/storage'

const storageAuth = useWebStorage('AuthToken')
const storageAuthUser = useWebStorage('AuthUser')
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
    setLoginUser(loginData: AuthLoginData) {
      this.setToken(loginData.token)
      this.user = Object.assign(this.user, loginData.user)
      storageAuthUser.setLocal(this.user)
    }
  }
})

// Need to be used outside the setup
export function useAuthStoreOut() {
  return useAuthStore(store)
}
