import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/auth/login',
    time: 100,
    method: 'get',
    response(query) {
      console.log('/auth/login query', query)
      return {
        code: 0,
        data: {}
      }
    }
  },
  {
    url: '/auth/register'
  }
] as MockMethod[]
