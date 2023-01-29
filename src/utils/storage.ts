import { EkkoEncrypt } from '@/utils/encrypt'

export class Storage {
  readonly baseAppName = 'Ashe'

  storageName = ''

  constructor(name: string) {
    this.storageName = this.makeName(name)
  }

  setLocal(data: any) {
    localStorage.setItem(this.storageName, this.encodeData(data))
  }

  getLocal<T>(): T | unknown {
    return this.decodeData<T>(localStorage.getItem(this.storageName) || '') as T
  }

  setSession(data: any) {
    sessionStorage.setItem(this.storageName, this.encodeData(data))
  }
  getSession<T>(): T | unknown {
    return this.decodeData<T>(sessionStorage.getItem(this.storageName) || '') as T
  }

  clear() {
    localStorage.removeItem(this.storageName)
    sessionStorage.removeItem(this.storageName)
  }

  allClear() {
    localStorage.clear()
    sessionStorage.clear()
  }

  private makeName(name: string): string {
    return `${this.baseAppName}_${name}`
  }

  private encodeData(data: any): string {
    if (!data) {
      return ''
    }
    switch (data.constructor) {
      case Array:
      case Object:
        return EkkoEncrypt.aesEncrypt(encodeURIComponent(JSON.stringify(data)))
      case String:
      case Number:
        return EkkoEncrypt.aesEncrypt(encodeURIComponent(String(data)))
      default:
        return ''
    }
  }

  private decodeData<T>(val: string): T | unknown {
    let res = ''
    if (val) {
      const decodeStr = EkkoEncrypt.aesDecrypt(decodeURIComponent(val))
      try {
        res = JSON.parse(decodeStr)
      } catch (e) {
        res = decodeStr
      }
    }
    return res
  }
}
