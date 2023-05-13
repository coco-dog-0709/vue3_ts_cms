import request from '@/service'
import { IDataType } from '../../type'
import { IQueryInfo } from './type'

/**
 * 统一查询页面列表的接口，具体哪个页面由pageUrl决定
 * @param pageUrl
 * @param queryInfo
 * @returns
 */
export function getPageList(pageUrl: string, queryInfo: IQueryInfo) {
  return request.post<IDataType>({
    url: pageUrl,
    data: queryInfo,
    loading: true
  })
}
/**
 * 统一删除列表的接口，具体哪个页面由pageUrl决定
 * @param url  pageName/id
 * @returns
 */
export function deletePageData(pageUrl: string) {
  return request.delete<IDataType>({
    url: pageUrl
  })
}

/**
 * 统一新增的接口，具体哪个页面由pageUrl决定
 * @param pageUrl  pageName/id
 * @returns
 */
export function addPageData(pageUrl: string, newData: any) {
  return request.post<IDataType>({
    url: pageUrl,
    data: newData
  })
}

/**
 * 统一编辑的接口，具体哪个页面由pageUrl决定
 * @param pageUrl  pageName/id
 * @returns
 */
export function editPageData(pageUrl: string, editData: any) {
  return request.patch<IDataType>({
    url: pageUrl,
    data: editData
  })
}
