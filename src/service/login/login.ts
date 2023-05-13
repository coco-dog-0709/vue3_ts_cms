import request from '../index'

import type { IAccount, IAccountLoginData } from './type'
import type { IDataType } from '../type'

/* 
登录接口
*/
export function accountLogin(account: IAccount) {
  return request.post<IDataType<IAccountLoginData>>({
    url: '/login',
    data: account,
    loading: true
  })
}
/* 
查询用户信息
*/
export function queryUserInfoById(id: number) {
  return request.get<IDataType>({
    url: `/users/${id}`
  })
}
/* 
查询用户菜单
*/
export function queryUserMenusByRoleId(id: number) {
  return request.get<IDataType>({
    url: `/role/${id}/menu`,
    loading: true
  })
}
