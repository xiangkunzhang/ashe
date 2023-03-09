import request from '@/utils/axios'
import { ref } from 'vue'
import type { UseFetchResult } from '@/types/model/api'

export const fetchAuthLogin = (param: AuthLoginParam): Promise<ResponseData<string>> => {
  return request.post<string>('/base/login', param)
}

export const fetchAuthInfo = (): Promise<ResponseData<string>> => {
  return request.get<string>('/base/getInfo')
}

export const useFetchLogin = (): UseFetchResult<string> => {
  const loading = ref(false)
  const isError = ref(false)
  const res = ref<string>('')
  const load = async (param: AuthLoginParam) => {
    loading.value = true
    isError.value = false
    try {
      const resp = await fetchAuthLogin(param)
      console.log(resp)
      res.value = resp.data || ''
    } catch (e) {
      isError.value = true
    } finally {
      loading.value = false
    }
  }

  return { result: res, loading, isError, doFetch: load }
}

export const useFetchAuthInfo = (): UseFetchResult<string> => {
  const loading = ref(false)
  const isError = ref(false)
  const res = ref<string>('')
  const load = async () => {
    loading.value = true
    isError.value = false
    try {
      const resp = await fetchAuthInfo()
      console.log(resp)
      res.value = resp.data || ''
    } catch (e) {
      isError.value = true
    } finally {
      loading.value = false
    }
  }

  return { result: res, loading, isError, doFetch: load }
}
