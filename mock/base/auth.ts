import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'

export default [
  {
    url: '/auth/login',
    time: 100,
    method: 'get',
    timeout: 100,
    response({ query }) {
      console.log('/auth/login query', query)
      if (!query.username || !query.password) {
        return {
          code: 100,
          message: '用户名或密码错误'
        }
      }
      const name = Random.cname()
      return {
        code: 0,
        data: {
          user: {
            id: Random.guid(),
            avatar: Random.image('80x80', '#FF6600', name),
            username: query.username,
            realName: name
          },
          token: Random.guid()
        },
        message: '操作成功'
      }
    }
  },
  {
    url: '/auth/register'
  }
] as MockMethod[]
