/**
 * 为什么不用prop字段作为插槽名，而单独定义一个slotName字段，
 * 因为prop字段绑定tabelData数组中元素的对应字段，
 * 而有些列比如"操作"列，在tabelData数组中并没有对应的字段
 * 而操作列又需要一个具名插槽
 * */
import { ITableConfig } from '@/base-ui/g-table/type'

export const tableConfig: ITableConfig = {
  columnsList: [
    {
      label: '用户名',
      prop: 'name',
      width: '120px'
    },
    {
      label: '真实姓名',
      prop: 'realname',
      width: '120px'
    },
    {
      label: '电话号码',
      prop: 'cellphone',
      width: '120px'
    },
    {
      label: '状态',
      prop: 'enable',
      slotName: 'enable',
      width: '120px'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      slotName: 'createAt',
      width: '180px'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      slotName: 'updateAt',
      width: '180px'
    },
    {
      label: '操作',
      slotName: 'operate',
      width: '200px',
      fixed: 'right'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  title: '用户列表',
  rightButtonText: '新增用户'
}
