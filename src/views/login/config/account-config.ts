// 账号登录组件的相关配置
export const rules = {
  name: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,9}$/,
      message: '用户名需为3~9个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]{6,12}$/,
      message: '用户名需为6~12个字母或数字或下划线',
      trigger: 'blur'
    }
  ]
}
