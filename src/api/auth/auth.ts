import request from '@/utils/axios'
import { ref } from 'vue'
import type { UseFetchResult } from '@/types/model/api'
import { initAuthLoginData } from '@/api/auth/model'

export const fetchAuthLogin = (param: AuthLoginParam): Promise<ResponseData<AuthLoginData>> => {
  return request.get<AuthLoginData>('/auth/login', { params: param })
}

export const useFetchLogin = (): UseFetchResult<AuthLoginData> => {
  const loading = ref(false)
  const isError = ref(false)
  const res = ref<AuthLoginData>(initAuthLoginData())
  const load = async (param: AuthLoginParam) => {
    loading.value = true
    isError.value = false
    try {
      const resp = await fetchAuthLogin(param)
      res.value = resp.data || initAuthLoginData()
    } catch (e) {
      isError.value = true
    } finally {
      loading.value = false
    }
  }

  return { result: res, loading, isError, doFetch: load }
}
