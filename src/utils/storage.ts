export class Storage {
  readonly baseAppName = 'PokiMall'

  storageName = ''

  constructor(name: string) {
    this.storageName = this.makeName(name)
  }

  setLocal(data: any) {
    localStorage.setItem(this.storageName, this.makeData(data))
  }

  setLocalBtoa(data: any) {
    const dataStr = JSON.stringify(data)
    localStorage.setItem(this.storageName, btoa(dataStr))
  }

  getLocal(notObject?: boolean): object | string | any {
    if (notObject) {
      return localStorage.getItem(this.storageName) || ''
    }
    return JSON.parse(localStorage.getItem(this.storageName) || '{}')
  }

  getLocalAtob(): object {
    const localStr = localStorage.getItem(this.storageName)
    if (localStr) {
      return JSON.parse(atob(localStr))
    }
    return {}
  }

  setSession(data: any) {
    sessionStorage.setItem(this.storageName, this.makeData(data))
  }

  setSessionBtoa(data: any) {
    const dataStr = JSON.stringify(data)
    sessionStorage.setItem(this.storageName, btoa(dataStr))
  }

  getSession(notObject?: boolean): object | string | any {
    if (notObject) {
      return sessionStorage.getItem(this.storageName) || ''
    }
    return JSON.parse(sessionStorage.getItem(this.storageName) || '{}')
  }

  getSessionAtob(): object {
    const localStr = sessionStorage.getItem(this.storageName)
    if (localStr) {
      return JSON.parse(atob(localStr))
    }
    return {}
  }

  clear() {
    localStorage.removeItem(this.storageName)
    sessionStorage.removeItem(this.storageName)
  }

  allClear() {
    localStorage.clear()
    sessionStorage.clear()
  }

  makeName(name: string): string {
    return `${this.baseAppName}_${name}`
  }

  makeData(data: any): string {
    if (typeof data === 'string') {
      return data
    } else {
      return JSON.stringify(data)
    }
  }
}
