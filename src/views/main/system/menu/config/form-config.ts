import { IFormConfig } from '@/base-ui/g-form/type'
export const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'text',
      field: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      type: 'text',
      field: 'type',
      label: '菜单类型',
      placeholder: '请输入菜单类型'
    },
    {
      type: 'text',
      field: 'url',
      label: '菜单url',
      placeholder: '请输入菜单url'
    },
    {
      type: 'date-picker',
      field: 'creatAt',
      label: '创建时间',
      otherConfig: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ]
}
