# vue3-ts-cms

## 技术栈

Vue3 + TS + webpack + Element-Plus + Echarts + Babel + Less

## 启动

npm run serve

## 开发规范

### 目录

- base-ui 任何项目可复用的组件
- components 该项目可复用的组件
- views 页面级组件
- cpns 某页面下的子组件
- global 全局动作，如注册 ElementPlus 动态注册路由
- views 页面级组件
- router 路由
- store vuex 状态管理
- hooks hooks 通用逻辑抽取

### 命名规范

- 组件使用统一采用大驼峰 如 `<LoginPanel />`
- 组件命名统一采用短横线分隔符 '-' 命名 如 login-panel
- hooks 命名统一采用短横线分隔符 '-' 命名 如 use-echarts
- 工具方法统一采用短横线分隔符 如 local-cache
- 全局方法统一以$开头 如 时间格式化方法 $timeFormat
- 个人感受:总体来说驼峰命名更舒服，更符合开发习惯，无奈一开始使用了短横线分隔，只能将错纠错。

### 提交规范

npm run commit

## 涉及功能和模块

- 登录功能(获取 token、本地存储、获取用户信息、用户菜单)

- axios 网络请求的封装

- 权限控制-动态路由注册

- 权限控制-按钮权限

- 高级组件的封装-GForm、GTable 的封装

- Echarts 的使用和封装
