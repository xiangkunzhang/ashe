import request from '@/utils/axios'

export const fetchAuthLogin = () => {
  return request.get('/auth/login')
}
