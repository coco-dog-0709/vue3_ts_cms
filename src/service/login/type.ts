export interface IAccount {
  name: string
  password: string
}

//定义接口返回数据的类型:
// 1.登录接口
export interface IAccountLoginData {
  id: number
  name: string
  token: string
}
