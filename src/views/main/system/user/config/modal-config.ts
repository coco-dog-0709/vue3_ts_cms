import { IFormConfig } from '@/base-ui/g-form/type'

export const modalConfig: IFormConfig = {
  formItems: [
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
      type: 'password',
      field: 'password',
      label: '用户秘密',
      placeholder: '请输入用户密码',
      hidden: false
    },
    {
      type: 'text',
      field: 'cellphone',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      type: 'selection',
      field: 'departmentId',
      label: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      type: 'selection',
      field: 'roleId',
      label: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  rowLayout: {
    span: 24
  },
  formItemStyle: {
    padding: 0
  }
}
