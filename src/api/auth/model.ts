export const initAuthUser = (): AuthUser => {
  return {
    id: '',
    avatar: '',
    username: '',
    realName: ''
  }
}

export const initAuthLoginData = (): AuthLoginData => {
  return {
    user: initAuthUser(),
    token: ''
  }
}
