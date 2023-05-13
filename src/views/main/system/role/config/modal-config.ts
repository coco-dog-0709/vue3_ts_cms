import { IFormConfig } from '@/base-ui/g-form/type'
export const modalConfig: IFormConfig = {
  formItems: [
    {
      type: 'text',
      field: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'text',
      field: 'intro',
      label: '角色描述',
      placeholder: '请输入角色介绍'
    }
  ],
  formItemStyle: {
    padding: 0
  },
  rowLayout: {
    span: 24
  }
}
