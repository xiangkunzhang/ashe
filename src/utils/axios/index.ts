import { BaseAxios } from './base'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

class AxiosRequest extends BaseAxios {
  private printConsole = true

  constructor() {
    super()
    this.init()
  }

  init() {
    this.makeRequestInterceptor()
    this.makeResponseInterceptor()
  }

  makeRequestInterceptor() {
    this.instance.interceptors.request.use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
      // todo
      // config.headers['Authorization'] = `Bearer ${jwt}`
      if (this.printConsole) {
        console.groupCollapsed(`【接口】`, config.url)
        console.log(`【headers】`, config.headers)
        console.log(`【baseURL】`, config.baseURL)
        console.log(`【方法】${config.method?.toUpperCase()}`)
        console.log(`【传参】`, config.method === 'post' ? config.data : config.params)
        console.groupEnd()
      }
      return config
    })
  }

  makeResponseInterceptor() {
    this.instance.interceptors.response.use(async (response: AxiosResponse): Promise<any> => {
      // todo
      return response
    })
  }
}

export const request = new AxiosRequest()

export default request