import { cache } from '@/utils'
/**
 * 该函数去筛选用户对于每个页面的按钮的权限
 * 用户需要传入当前页的页面名称，根据名称和按钮类型，去查找有没有这种按钮类型的权限
 * @param {string} pageName 用户所在页面名称
 * @param {string} permissionType 按钮的类型 有:create、delete、update、query
 * @returns boolean
 *
 * **/
export default function (pageName: string, permissionType: string): boolean {
  const userPermissions = cache.getCache('userPermissions')
  const permission = `system:${pageName}:${permissionType}`
  return !!userPermissions.find((item: string) => item === permission)
}
