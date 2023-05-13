interface ISystemState {
  tableData: Array<any>
  totalCount: number
}

interface IPageListPayload {
  pageName: string
  queryInfo: any
}

export { ISystemState, IPageListPayload }
