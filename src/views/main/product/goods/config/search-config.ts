import { IFormConfig } from '@/base-ui/g-form/type'
export const formConfig: IFormConfig = {
  formItems: [
    {
      type: 'text',
      label: '商品名称',
      field: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'text',
      label: '商品原价',
      field: 'oldPrice',
      placeholder: '请输入商品原价'
    },
    {
      type: 'text',
      label: '商品折扣价',
      field: 'newPrice',
      placeholder: '请输入商品折扣价'
    },
    {
      type: 'selection',
      label: '商品状态',
      field: 'status',
      placeholder: '请选择商品状态',
      options: [
        {
          label: '上架',
          value: 1
        },
        {
          label: '下架',
          value: 0
        }
      ]
    }
  ]
}
