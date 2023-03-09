export const initAuthUser = (): AuthUser => {
  return {
    id: '',
    avatar: '',
    username: '',
    realName: ''
  }
}

export const initAuthLoginData = (): ResponseData<string> => {
  return {
    code: 200,
    msg: '',
    data: ''
  }
}
