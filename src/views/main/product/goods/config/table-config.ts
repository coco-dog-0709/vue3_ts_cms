import { ITableConfig } from '@/base-ui/g-table/type'
export const tableConfig: ITableConfig = {
  columnsList: [
    {
      label: '标题',
      prop: 'name',
      width: '120px'
    },
    {
      label: '原价',
      prop: 'oldPrice',
      width: '80px',
      slotName: 'oldPrice'
    },
    {
      label: '折扣价',
      prop: 'newPrice',
      width: '80px',
      slotName: 'newPrice'
    },
    {
      label: '商品图片',
      prop: 'imgUrl',
      slotName: 'imgUrl'
    },
    {
      label: '状态',
      prop: 'status',
      width: '80px',
      slotName: 'status'
    },
    {
      label: '生产地',
      prop: 'address',
      width: '80px'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      width: '150px',
      slotName: 'createAt'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      width: '150px',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      prop: 'status',
      width: '200px',
      fixed: 'right',
      slotName: 'operate'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
