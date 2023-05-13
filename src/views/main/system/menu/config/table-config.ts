import { ITableConfig } from '@/base-ui/g-table/type'

export const tableConfig: ITableConfig = {
  columnsList: [
    {
      label: '菜单名称',
      prop: 'name',
      width: '200px'
    },
    {
      label: 'url',
      prop: 'url',
      width: '120px'
    },
    {
      label: 'icon图标',
      prop: 'icon',
      width: '120px'
    },
    {
      label: '按钮权限',
      prop: 'permission',
      width: '120px'
    },
    {
      label: '分类',
      prop: 'sort',
      width: '120px'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      slotName: 'createAt',
      width: '150px'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      slotName: 'updateAt',
      width: '150px'
    },
    {
      label: '操作',
      slotName: 'operate',
      width: '200px',
      fixed: 'right'
    }
  ],
  otherConfig: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  showFooter: false
}
