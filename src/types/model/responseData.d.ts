declare interface ResponseData<T = any> {
  msg: string
  code: number
  data?: T
}

declare interface ResponseRow<T = any> {
  msg: string
  code: number
  rows?: T[]
  total?: number
}
