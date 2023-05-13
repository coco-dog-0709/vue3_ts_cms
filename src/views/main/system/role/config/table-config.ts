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
      label: '角色名',
      prop: 'name',
      width: '150px'
    },
    {
      label: '相关权限',
      prop: 'intro',
      width: '150px'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      slotName: 'createAt',
      width: '200px'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      slotName: 'updateAt',
      width: '200px'
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
  title: '角色列表',
  rightButtonText: '新增角色'
}
