import request from '@/service'
import { IDataType } from '@/service/type'

//获取分类商品个数数据:
export function getCategoryGoodsCount() {
  return request.get<IDataType>({
    url: '/goods/category/count'
  })
}
//获取分类商品销量数据:
export function getCategoryGoodsSale() {
  return request.get<IDataType>({
    url: '/goods/category/sale'
  })
}

//获取分类商品收藏数据:
export function getCategoryGoodsFavor() {
  return request.get<IDataType>({
    url: '/goods/category/favor'
  })
}

//获取不同城市销量数据:
export function getCityGoodsSale() {
  return request.get<IDataType>({
    url: '/goods/address/sale'
  })
}
