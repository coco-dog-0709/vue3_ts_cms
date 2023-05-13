interface ILoginState {
  userInfo: any
  token: string
  userMenus: any
}

interface IAccount {
  name: string
  password: string
}

export { ILoginState, IAccount }
