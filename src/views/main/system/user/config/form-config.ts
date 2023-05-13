import { IFormConfig } from '@/base-ui/g-form/type'

export const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'text',
      field: 'id',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      type: 'text',
      field: 'name',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'text',
      field: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'text',
      field: 'cellphone',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      type: 'selection',
      field: 'enable',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    },
    {
      type: 'date-picker',
      field: 'createAt',
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
    padding: '10px 5px;'
  }
}
