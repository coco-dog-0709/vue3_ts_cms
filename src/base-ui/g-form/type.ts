type IType = 'text' | 'password' | 'selection' | 'date-picker'
export interface IFormItem {
  type: IType
  field: string
  label: string
  placeholder?: string
  options?: Array<any>
  otherConfig?: any
  hidden?: boolean
}

interface IRowLayout {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export interface IFormConfig {
  formItems: IFormItem[]
  labelWidth?: string
  rowLayout?: IRowLayout
  formItemStyle?: any
}
