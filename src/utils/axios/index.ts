import { BaseAxios } from './base'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export class AxiosRequest extends BaseAxios {
  private printConsole = true

  private readonly noErrorMsg: boolean = false

  constructor(noErrorMsg?: boolean) {
    super()
    this.noErrorMsg = noErrorMsg || false
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
        console.groupCollapsed(`【接口请求】%c %s`, 'background: #222; color: #bada55', config.url)
        console.log(`【headers】`, config.headers)
        console.log(`【baseURL】%c %s`, 'background: #222; color: #bada55', config.baseURL)
        console.log(`【方法】${config.method?.toUpperCase()}`)
        console.log(`【传参】Data`, config.data)
        console.log(`【传参】Params`, config.params)
        console.groupEnd()
      }
      return config
    })
  }

  makeResponseInterceptor() {
    this.instance.interceptors.response.use(
      async (response: AxiosResponse): Promise<any> => {
        const { data, config, status, statusText } = response
        if (this.printConsole) {
          console.groupCollapsed(`【接口返回】%c %s`, 'background: #4c3c3c; color: #cc8f5c', config.url)
          console.log(`【headers】`, config.headers)
          console.log(`【方法】${config.method?.toUpperCase()}`)
          console.log(`【Status】Code`, status)
          console.log(`【Status】Text`, statusText)
          console.log(`【结果】`, data)
          console.groupEnd()
        }
        // todo 结果处理
        return data
      },
      async (error: any): Promise<any> => {
        if (this.noErrorMsg) {
          console.error(error)
          return error
        }
        if (error.constructor.name === 'CanceledError') {
          window.$message?.warning('请求被取消')
        } else if (error.response) {
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          if (error.response.status) {
            window.$message?.error('请求失败，错误代码：' + error.response.status)
          } else {
            window.$message?.error('请求失败，服务器异常')
          }
        } else if (error.request) {
          // 请求已经成功发起，但没有收到响应
          if (error.message) {
            if (error.message.startsWith('timeout')) {
              window.$message?.error('请求失败，请求超时')
            } else {
              window.$message?.error(error.message)
            }
          } else {
            window.$message?.error('请求失败，请求异常')
          }
        } else {
          console.error(error)
          window.$message?.error('请求失败, 未知错误')
        }
        return error
      }
    )
  }

  controlGet<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): { reqBody: Promise<R>; controller: AbortController } {
    const controller = new AbortController()
    return {
      reqBody: this.get(url, { ...(config || {}), signal: controller.signal }),
      controller
    }
  }

  withoutMsg() {
    return new AxiosRequest(true)
  }
}

export const request = new AxiosRequest()

export default request
