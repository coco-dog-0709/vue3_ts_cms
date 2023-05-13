export interface IColumnsList {
  prop?: string
  label?: string
  slotName?: string
  width?: string
  fixed?: string
}

export interface ITableConfig {
  columnsList: IColumnsList[] //绑定到el-column上的属性
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  title?: string
  rightButtonText?: string
  otherConfig?: any // 绑定到el-table上的属性
  showFooter?: boolean
}
