import { IFormConfig } from '@/base-ui/g-form/type'

export const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'text',
      field: 'roleName',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'text',
      field: 'trueName',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'date-picker',
      field: 'createTime',
      label: '创建时间',
      otherConfig: {
        startPlaceholder: '请选择开始时间',
        endPlaceholder: '请选择结束时间'
      }
    }
  ],
  labelWidth: '120px',
  rowLayout: {
    xs: 24, // 屏幕 < 768px 一行显示一个表单
    sm: 24, // 768px < 屏幕 < 992px 一行显示一个表单
    md: 12, // 992px < 屏幕 < 1200px 一行显示两个表单
    lg: 8, // 1200px < 屏幕 < 1920px 一行显示三个表单
    xl: 6 // 屏幕 > 1920px 一行显示四个表单
  },
  formItemStyle: {
    padding: '10px 5px'
  }
}
