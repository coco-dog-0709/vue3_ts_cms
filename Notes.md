# 项目笔记

## 一. 代码规范

### 1.1. 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode 需要安装一个插件：EditorConfig for VS Code

![image-20210722215138665](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2gh989yj30pj05ggmb.jpg)

### 1.2. 使用 prettier 工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。
虽然可以通过下载 prettier 插件来格式化代码，但是项目中直接依赖 prettier 可以让项目不管在什么编辑器下都保持风格统一

1.安装 prettier

```shell
npm install prettier -D
```

2.配置.prettierrc 文件：

- useTabs：使用 tab 缩进还是空格缩进，选择 false；
- tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；
- printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；
- singleQuote：使用单引号还是双引号，选择 true，使用单引号；
- trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
- semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

3.创建.prettierignore 忽略文件(忽略某些文件)

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4.VSCode 需要安装 prettier 的插件

![image-20210722214543454](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2acx21rj30ow057mxp.jpg)

5.测试 prettier 是否生效

- 测试一：在代码中保存代码；
- 测试二：配置一次性修改的命令；

在 package.json 中配置一个 scripts：

```json
    "prettier": "prettier --write ."
```

### 1.3. 使用 ESLint 检测

1.在前面创建项目的时候，我们就选择了 ESLint，所以 Vue 会默认帮助我们配置需要的 ESLint 环境。

2.VSCode 需要安装 ESLint 插件：

![image-20210722215933360](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2oq26odj30pw05faaq.jpg)

3.解决 eslint 和 prettier 冲突的问题：

安装插件：（vue 在创建项目时，如果选择 prettier，那么这两个插件会自动安装）

```shell
npm i eslint-plugin-prettier eslint-config-prettier -D
```

添加 prettier 插件：

```json
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
```

### 1.4. git Husky 和 eslint

虽然我们已经要求项目使用 eslint 了，但是不能保证组员提交代码之前都将 eslint 中的问题解决掉了：

- 也就是我们希望保证代码仓库中的代码都是符合 eslint 规范的；

- 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合 eslint 规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 Husky 工具：

- husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用 husky 呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

这里会做三件事：

1.安装 husky 相关的依赖：

![image-20210723112648927](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg)

2.在项目目录下创建 `.husky` 文件夹：

```
npx huksy install
```

![image-20210723112719634](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq16zo75j307703mt8m.jpg)

3.在 package.json 中添加一个脚本：

![image-20210723112817691](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg)

接下来，我们需要去完成一个操作：在进行 commit 时，执行 lint 脚本：

![image-20210723112932943](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq3hn229j30nf04z74q.jpg)

这个时候我们执行 git commit 的时候会自动对代码进行 lint 校验。

### 1.5. git commit 规范

#### 1.5.1. 代码提交风格

通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw17gaqjj30to0cj3zp.jpg)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

- Commitizen 是一个帮助我们编写规范 commit message 的工具；

  1.安装 Commitizen

```shell
npm install commitizen -D
```

2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装 cz-conventional-changelog：

![image-20210723145249096](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvz2odi4j30ek00zmx2.jpg)

并且在 package.json 中进行配置：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvzftay5j30iu04k74d.jpg)

这个时候我们提交代码需要使用 `npx cz`：

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | :------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

- 第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

- 第三步选择提交的信息

![image-20210723150204780](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

- 第四步提交详细的描述信息

![image-20210723150223287](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

- 第五步是否是一次重大的更改

![image-20210723150322122](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

- 第六步是否影响某个 open issue

![image-20210723150407822](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

#### 1.5.2. 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

- 我们可以通过 commitlint 来限制提交；

  1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建 commitlint.config.js 文件，配置 commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
如果不成功，换个命令行 窗口试一试
```

## 二. 第三方库集成

### 2.1. vue.config.js 配置

vue.config.js 有三种配置方式：

- 方式一：直接通过 CLI 提供给我们的选项来配置：
  - 比如 publicPath：配置应用程序部署的子目录（默认是 `/`，相当于部署在 `https://www.my-app.com/`）；
  - 比如 outputDir：修改输出的文件夹；
- 方式二：通过 configureWebpack 修改 webpack 的配置：
  - 可以是一个对象，直接会被合并；
  - 可以是一个函数，会接收一个 config，可以通过 config 来修改配置；
- 方式三：通过 chainWebpack 修改 webpack 的配置：
  - 是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 config 对象，可以对配置进行修改；

```js
const path = require('path')

module.exports = {
  outputDir: './build',
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
  }
}
```

### 2.2. vue-router 集成

安装 vue-router 的最新版本：

```shell
npm install vue-router@next
```

创建 router 对象：

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
```

安装 router：

```ts
import router from './router'

createApp(App).use(router).mount('#app')
```

在 App.vue 中配置跳转：

```html
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>
```

### 2.3. vuex 集成

安装 vuex：

```shell
npm install vuex@next
```

创建 store 对象：

```ts
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: 'coderwhy'
    }
  }
})

export default store
```

安装 store：

```ts
createApp(App).use(router).use(store).mount('#app')
```

在 App.vue 中使用：

```html
<h2>{{ $store.state.name }}</h2>
```

### 2.4. element-plus 集成

Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库：

- 相信很多同学在 Vue2 中都使用过 element-ui，而 element-plus 正是 element-ui 针对于 vue3 开发的一个 UI 组件库；
- 它的使用方式和很多其他的组件库是一样的，所以学会 element-plus，其他类似于 ant-design-vue、NaiveUI、VantUI 都是差不多的；

安装 element-plus

```shell
npm install element-plus
```

#### 2.4.1. 全局引入

一种引入 element-plus 的方式是全局引入，代表的含义是所有的组件和插件都会被自动注册,优点是引入方便，缺点是打包会将 elementUI 所有的代码都打包进去。

```js
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
```

#### 2.4.2. 局部引入

按需引入，也就是在开发中用到某个组件对某个组件进行引入：

```vue
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>

    <h2>{{ $store.state.name }}</h2>

    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'App',
  components: {
    ElButton
  }
})
</script>

<style lang="less"></style>
```

但是我们会发现是没有对应的样式的，引入样式有两种方式：

- 全局引用样式（像之前做的那样）；
- 局部引用样式（通过 babel 的插件）；

  1.安装 babel 的插件：

```shell
npm install babel-plugin-import -D
```

2.配置 babel.config.js

```js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
```

但是这里依然有个弊端：

- 这些组件我们在多个页面或者组件中使用的时候，都需要导入并且在 components 中进行注册；
- 所以我们可以将它们在全局注册一次；

```ts
import { ElButton, ElTable, ElAlert, ElAside, ElAutocomplete, ElAvatar, ElBacktop, ElBadge } from 'element-plus'

const app = createApp(App)

const components = [ElButton, ElTable, ElAlert, ElAside, ElAutocomplete, ElAvatar, ElBacktop, ElBadge]

for (const cpn of components) {
  app.component(cpn.name, cpn)
}
```

### 2.5. axios 集成

#### axios 的基本使用：

##### 基本使用：

```ts
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'cobe',
      age: 24
    }
  })
  .then((res) => {
    console.log(res)
  })

axios返回一个promise，promise也可以有类型:AxiosResponse<any, any>,拿到的结果res就是这种类型
```

##### 全局配置：

可以给所有的请求设置一些公共的配置，比如基本的 url，超时时间，一些公共的头部等：

```ts
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
axios
  .get('/get', {
    //不用再写baseurl了
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('/post', {
    data: {
      name: 'cobe',
      age: 24
    },
    timeout: 1000
  })
  .then((res) => {
    console.log(res)
  })
```

##### 局部配置：

也可以在某个网络请求单独进行配置：

```ts
axios
  .get('/get', {
    params: {
      name: 'coderwhy',
      age: 18
    },
    baseURL: 'http://httpbin.org',
    timeout: 10000
  })
  .then((res) => {
    console.log(res)
  })
```

##### axios.all:

可以同时发送多个请求，axios.all 内部是基于 promise.all 来封装的

```ts
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'coderwhy',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'cobe',
        age: 24
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })
```

##### axios 的拦截器：

拦截器有两个参数，fn1 是成功时候执行的函数，fn2 是失败时候执行的函数

```ts
axios.interceptors.request.use(fn1, fn2)
axios.interceptors.response.use(fn1, fn2)
```

- 具体细节：

  请求拦截器中成功函数的参数 config 就是我们在请求的时候设置的一些配置，比如 baseUrl,timeout,等等，我们可以对这些配置进行一些修改之后，

  再继续发送请求,比如如果改了 baseUrl，就可以对请求做一个转发

```js
//请求拦截器
axios.interceptors.request.use(
  (config) => {
    //对请求的配置做一些操作，比如：
    // 1.添加token
    // 2.添加loading效果
    return config
  },
  (err) => {
    //请求发生错误时的处理
    console.log(err)
    return err
  }
)

//响应拦截器
axios.interceptors.response.use(
  (res) => {
    //对返回的数据做一些处理
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)

//注意： 要先定义拦截器，再发送请求，
```

#### axios 的封装:

##### 基本封装:

采用类来封装 axios，通过实例化 OYQRequest 类的时候传递 config 来设置某一类请求的基本参数，比如 baseURL，timeout 等，

```js
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'

class OYQRequest {
  instance: AxiosInstance // AxiosInstance为axios的实例对应的类型
  constructor(config: AxiosRequestConfig) {
    // AxiosRequestConfig为创建axios实例时传入的配置对象的类型
    this.instance = axios.create(config)
  }
  request(config: AxiosRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

const request1 = new OYQRequest({ baseURL: BASE_URL, timeout: TIME_OUT })

export { request1 }
```

##### 拦截器的封装:

封装拦截器可以从以下三个角度来封装，即封装每个类实例的请求都会执行的拦截器，和封装每个实例特有的拦截器，和每个实例下某个请求特有的拦截器

![image-20220316200244254](C:\Users\李志亮\AppData\Roaming\Typora\typora-user-images\image-20220316200244254.png)

###### 实例特有的拦截器的封装:

试想，我们可以 new 出多个 OYQRequest 类的实例，但是这些实例在请求拦截的或响应拦截的时候，所需要做的事情可能是不一样的，有些可能需要添加 token，

有些可能需要 loading 动画，如果我们就简单的在 Request 类里面添加统一的拦截器，那么必然不能适应多种场景，

所以我们要想办法在初始化 OYQRequest 类的时候在 config 参数中将拦截器作为属性动态的传入，但是 AxiosRequestConfig 接口中并没有 interceptor 属性

所以我们的思路是，创建一个新的类型 OYQRequestConfig，这个接口继承自 AxiosRequestConfig，之后在这个接口中再定义一个 interceptor 属性，之后 config 使用

OYQRequestConfig 接口即可

另外 interceptor 有四个拦截器函数，这四个拦截器分别对应不同的类型，所以我们还要定义一个 OYQRequestInterceptor 接口，里面定义每个拦截器函数的类型

```ts
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'
import type { AxiosInstance，AxiosRequestConfig, AxiosResponse } from 'axios'

`//定义拦截器的接口
interface OYQRequestInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig  // 可选链，因为即使传入了拦截器，也不一定所有的拦截器都要传
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceporCatch?: (err: any) => any
}
//定义AxiosRequestConfig的扩展接口：
interface OYQRequestConfig extends AxiosRequestConfig {
  interceptor?: OYQRequestInterceptor
}`

class OYQRequest {
  instance: AxiosInstance
  interceptor?: OYQRequestInterceptor    // 可选链，因为不一定需要传入拦截器
  constructor(config: OYQRequestConfig) {
    this.instance = axios.create(config)
    `this.interceptor = config.interceptor

    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )`
  }
  request(config: OYQRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

const request1 = new OYQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  `interceptor: {
    requestInterceptor(config) {
      //一些处理，比如添加token，添加loading动画等
      return config
    },
    requestInterceptorCatch(err) {
      return err
    }
  }`
})

export { request1 }

目前，我们是request1这个实例传入了两个拦截器，请求拦截器和请求错误拦截器
那么，下一次我们再实例化OYQRequest类的时候，就可以传入任意我们想要传入的拦截器了
```

###### 实例共享的拦截器的封装:

目前我们实现了可以在实例化 OYQRequest 类时，某个实例自己的拦截器的封装，但是我们也可以封装一个通用的拦截器，就是每个类实例都会执行的拦截器

很简单，直接在 constructor 函数中调用 instance 的 interceptors 下对应的函数

```ts
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'
import type { AxiosInstance } from 'axios'
import type { OYQRequestConfig, OYQRequestInterceptor } from './type'

class OYQRequest {
  instance: AxiosInstance
  interceptor?: OYQRequestInterceptor
  constructor(config: OYQRequestConfig) {
    this.instance = axios.create(config)`//实例共享的拦截器:
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )`
  }
  request(config: OYQRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

const request1 = new OYQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor(config) {
      //一些处理，比如添加token，添加loading动画等
      console.log('请求成功的拦截')

      return config
    },
    requestInterceptorCatch(err) {
      return err
    }
  }
})

export { request1 }
```

###### 某个请求独有的拦截器封装:

```ts
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'
import type { AxiosInstance } from 'axios'
import type { OYQRequestConfig, OYQRequestInterceptor } from './type'

class OYQRequest {
  instance: AxiosInstance
  interceptor?: OYQRequestInterceptor
  constructor(config: OYQRequestConfig) {
    this.instance = axios.create(config)
  }

  request(config: OYQRequestConfig) {
    this.instance.request(config).then((res) => {
      ;`if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }`
      console.log(res)
    })
  }
}

const request1 = new OYQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor(config) {
      //一些处理，比如添加token，添加loading动画等
      console.log('某个实例请求成功的拦截')

      return config
    },
    requestInterceptorCatch(err) {
      return err
    }
  }
})

export { request1 }

//在某个文件中调用request1的request函数：
import { request1 } from '@/network/request'
request1.request({
  url: '/home/multidata',
  method: 'GET',
  interceptor: {
    requestInterceptor: (config) => {
      console.log('某个请求单独的拦截')
      return config
    }
  }
})
```

## 三.区分不同环境：

在开发中，有时候我们需要根据不同的环境设置不同的环境变量，常见的有三种环境：

- 开发环境：development；

- 生产环境：production；

- 测试环境：test；

比如发送网络请求模块中的 baseurl 变量在开发环境下可能是 http://coderwhy/development,在生产环境下是 http://coderwhy/production，在测试环境下是 http://coderwhy/test

那么在不同环境下 baseurl 的值就需要做出相应改变，而改变环境变量的值有三种方法：

- 方式一：手动修改不同的变量；(不推荐)

- 方式二：根据 process.env.NODE_ENV 的值进行区分；(最常用)

process.env.NODE_ENV 的值在不同环境下的值不同，内部是通过 DefinPlugin 来设置

在开发环境下值为 development

在生产环境下值为 production

在测试环境下值为 test

那么我们就可以进行判断：

```ts
let BASE_URL: string
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://coderwhy/development'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy/production'
} else {
  BASE_URL = 'http://coderwhy/test'
}
export { BASE_URL }

//捡知识：
let foo = '123'
let bar = 'why'

export foo
export bar   //不可这样导出一个变量

可以在定义时就导出:
export let foo = '123'
export let bar = 'why'

也可这样导出:
export { foo,bar }
```

- 方式三：编写不同的环境变量配置文件；(较麻烦)

需要在项目根目录下创建三个文件

.env.development

.env.production

.env.test

那么在这三个文件中我们就可以给定义 BASE_URL 定义不同的值

```ts
在.dev.development中:
BASE_URL = http://coderwhy/development
VUE_APP_MESSAGE = Hello Message(development)

在.dev.production中:
BASE_URL = http://coderwhy/production
VUE_APP_MESSAGE = Hello Message(production)

在.dev.test中:
BASE_URL = http://coderwhy/test
VUE_APP_MESSAGE = Hello Message(test)

//注意:  获取的时候要通过process.env.VUE_APP_MESSAGE来获取而不是VUE_APP_MESSAGE
```

```ts
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略,不会被提交到git仓库
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

**注意:只有 `NODE_ENV`，`BASE_URL` 和以 `VUE_APP_` 开头的变量将通过 `webpack.DefinePlugin` 静态地嵌入到客户端侧的代码中**

## 四. 接口文档

https://documenter.getpostman.com/view/12387168/TzsfmQvw

baseURL 的值：

```
http://152.136.185.210:5000
```

设置全局 token 的方法：

```js
const res = pm.response.json()
pm.globals.set('token', res.data.token)
```

接口文档 v2 版本：（有部分更新）

https://documenter.getpostman.com/view/12387168/TzzDKb12

## 五. 项目业务知识点

#### 1.app.use

app.use 的参数如果是一个函数，会自动将 app 传入这个函数，
如果参数是一个对象，会执行这个对象的 install 方法，并且也会将 app 作为 install 方法的参数

#### 2.tsconfig.json 文件

ts 源于 js 又归于 js，ts 代码最终要转换成 js 代码才能在浏览器上运用，而转换的规则，比如是转换成 es6 的代码还是转化成 es5 的代码，

就可以通过 tsconfig.json 文件来配置

#### 3.defineComponent 函数

从 js 的角度，这个函数没有什么作用，但是从 ts 来看，这个函数可以帮助我们在组件内部做很多类型的推导，让我们编写出来的组件相关的代码更加严谨

#### 4.css 初始化

一个项目搭建时，一般会对 css 的样式做一些初始化，初始化可以借助一些三方库比如 normaliz.css，

可以去 github 上下载 normalize.css 文件，然后引用到项目中，也可以通过 npm 的方式将 normalize 作为一个第三方包下载到项目中

另外在已经既有的三方库基础上，我们可能自己还会自定义一些 css 的基本样式

##### 在 css 文件中引用 css 文件:

```css
@import url('./base.less'); //不要忘记 ';'
```

#### 5.表单验证

```html
<el-form :model="account" :rules="rules" label-width="60px">
  <el-form-item label="账号" prop="name">
    <el-input v-model="account.name" type="text" />
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="account.password" type="password" />
  </el-form-item>
</el-form>
```

element-plus 表单验证可以传入一个 rules 对象,校验时可以通过 pettern 字段来定义正则表达式，如：

```ts
password: [
  { required: true, message: '密码不能为空', trigger: 'blur' },
  {
    pattern: /^[a-zA-Z0-9_]{6,12}$/,
    message: '密码需为6~12个字母或数字或下划线',
    trigger: 'blur'
  }
]
```

也可以自定义校验规则，**校验信息可以通过 callback(new Error('校验信息'))抛出**。

```ts
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}
...

age: [{ validator: checkAge, trigger: 'blur' }],
```

#### 6.登录功能设计

![image-20221211211317681](C:\Users\李志亮\AppData\Roaming\Typora\typora-user-images\image-20221211211317681.png)

##### 具体设计:

点击登录的时候，通知 login-account 或 login-phone 要登录了，把具体的登录相关逻辑写到两个组件内，而不写到 login-panel 内，避免 login-panel 内的逻辑臃肿

login-panel 组件只负责登录模块整体架构的搭建。

##### 获取组件类型

###### 几种思路

以 login-account 组建为例，当点击立即登录的时候，我们要调用 login-account 内的 loginAction 方法执行登录逻辑，那么就必须在 login-panel 内获取到 login-account 组件实例

之后调用其内部的 loginAction 方法

```ts
//login-account组件
export default defineComponent({
  setup() {
	...
    const loginAction = () => {
      console.log('loginAction')
    }

    return {
	  ...
      loginAction
    }
  }
})
```

从 TS 的角度，使用 ref 并且 accountRef 初始值为 null 来获取 accountLogin 组件，会导致调用 accountRef.value.loginAction()时报错，

因为 accountRef.value 可能为 null，当为 null 时不可能有 loginAction 方法

```html
<template>
  ...
  <login-account ref="accountRef" />
  ...
</template>
```

```ts
//login-panel组件:
<script lang="ts">
...
import LoginAccount from './login-account.vue'
export default defineComponent({
  components: {
    LoginAccount,
  },
  setup() {
    const accountRef = ref(null)
    const handleLogin = () => {
      //调用组件内部方法:
      accountRef.value.loginAction()  //报错
    }
    return {
      accountRef,
      handleLogin
    }
  }
})
</script>
```

当然也可以初始化的时候不传值，不传值 accountRef 的值就是 any,但是这样的坏处是，any 可能具有任何方法，这意味着即使 accountRef 组件内没有某个方法，

去调用这个方法的时候，也不会报错：

```ts
//login-panel组件:
<script lang="ts">
    ...
export default defineComponent({
  setup() {
    const accountRef = ref()
    const handleLogin = () => {
      //调用组件内部方法:
      accountRef.value.a()  //不报错
      accountRef.value.abc() //不报错
    }
	...
  }
})
</script>
```

正确的思路是，获取 accountLogin 组件的时候，能够拿到组件对应的类型，将这个类型作为 accountRef 变量的类型

但是 loginAccount 组件实际上是一个对象，那么如何拿到 accountLogin 组件对象的类型呢？

```ts
<script lang="ts">
	...
export default defineComponent({

  setup() {
    `const accountRef = ref<InstanceType<typeof LoginAccount>>()`
    const handleLogin = () => {
      //调用组件内部方法:
      accountRef.value?.loginAction() //不报错   使用可选链是因为初始化的时候没有传值，accountRef.value可能是undefined

      accountRef.value.a()  //报错 因为没有这个方法
      accountRef.value.abc() //报错
    }
	...
  }
})
</script>
```

###### 组件实例

定义一个 Demo 组件，会导出一个对象:

```ts
export default defineComponent({
	...
})
```

**思考:**

```text
当在其他组件中使用这个组件的时候，是不是直接使用导出的这个对象?
```

**答案:**

```text
不是，导出的这个对象其实是组件的描述对象，真正使用这个组件的时候是根据这个描述对象去创建一个真正的组件实例
试想，Demo组件可以在a组件内使用，同时也可以在b组件内使用,如果是同一个对象，必然会相互影响。
所以其实是在a组件中使用的时候，创建一个组件实例，在b组件中使用的时候，又创建了一个组件实例。
```

###### 详解`ref<InstanceType<typeof LoginAccount>>()`

```text
首先ref<>()   <>可以固定ref参数的类型
那么InstanceType<typeof LoginAccount> 的值就是一个组件实例的类型
组件实例是一个对象，那么拿到一个对象的类型，就是拿到这个对象的构造函数
InstanceType<typeof LoginAccount>可以拿到LoginAccount组件实例的构造函数
```

#### 7.setup 中使用 store 中的状态

在组件中使用 store 中的状态时,store 的类型为 any

```ts
  setup() {
    const store = useStore()  ==> any
    return {}
  }
```

但是实际上我们已经定义好了根 store 中 state 的类型和子 store 中 state 的类型:

```ts
//根store
interface IrooteState {
  name: string
  age: number
}

//子store
interface ILoginState {
  userInfo: any
  token: string
  userMenus: any
}
```

所以我们想在 setup 中使用 store 时能明确推导出 store 的类型，而不是推断为 any，另外，当想使用子 store 中的状态时，需要这样:

```ts
  setup() {
    const store = useStore()  ==> any
    const userMenus = store.state.loginModule.userMenus  ==> 根store的state中根本没有loginModule这个属性
    return {}
  }
```

为了使用时 store 不被推断为 any，并且可以使用子模块中的状态，需要这样:

store/type.ts：

```ts
interface IrooteState {
  name: string
  age: number
}
interface IModuleState {
  loginModule: ILoginState
}

//根模块和子模块的交叉类型
type IrootAndModuleState = IrooteState & IModuleState

export { IrootAndModuleState }
```

store/index.ts

```ts
//为了在组件中store不为any并且可以使用子store中的状态,重构useStore函数：

import { createStore, useStore as useVuexStore, Store } from 'vuex'

export function useStore(): Store<IrootAndModuleState> {
  return useVuexStore()
}
```

#### 8.权限控制

##### 1.基于角色控制权限

###### 后端设计

对于后端来讲，所有登录系统的人都是一个用户，所以后端会维护一个用户表，假如给每个用户都去分配权限，那么会非常的繁琐，

比较好的思路是会再维护一个角色表，每个用户创建的时候会分配一个角色，另外还会维护要一个权限表(菜单表)，每个角色都会有对应的权限。

这就是基于权限控制。

###### 前端设计

对于前端来讲，其实是不知道到底谁会登录的，因为超级管理可能会登录，管理员可能会登录，运营也可能会登录，所以就确定不了用户到底能访问哪些页面，

也就不能把菜单写死，这就意味着要根据不同的登录者(角色)去动态的展示菜单。

举例来说，假如系统总共有 abcdef6 个页面，张三作为运营，能够访问的页面有 a、b、c 三个页面，李四作为管理员，能够访问的页面有 a、b、c、d 四个页面

王五作为超级管理员，能够访问所有的页面，那么这三个不同的人在登录的时候，就需要返回不同的页面菜单。

##### 2.展示菜单的三种方案

###### 1.写死所有的路由

把系统的所有页面的路由都注册，当用户登录成功的时候，然后根据用户的权限，隐藏掉该用户不能访问的页面的菜单，显示该用户能够访问的页面的菜单

不过这种方法有一个弊端，那就是虽然菜单里面看不到该用户不能访问的页面的菜单项，但是依然可以通过地址栏输入 url 的方式展示用户不能访问的页面。

因为已经注册了所有的路由。

```ts
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
        //注册所有的路由
    ]
  },
```

###### 2.事先配置

前端事先定义好每种角色能够访问的所有路由，当用户登录成功，拿到用户的角色信息，去匹配某种角色，匹配成功就渲染该角色对应的路由

但是这种方式不好的地方是，当要新增一种角色时，需要前端去改角色配置。

```ts
const rolesRoutes = {
    superadmin: [{},{},{},{},{}],   //超级管理员的路由
    admin: [{},{},{}],  //管理员的路由
    user: [{},{}],  //运营的路由
}

  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: rolesRoutes.superadmin   //假如当前登录的用户是超级管理员
  },
```

###### 3.动态路由

先获取到所有页面的 routes(一个数组)，当用户登录成功的时候，会返回用户的角色信息，比如用户是管理员，之后根据用户的角色信息去请求对应的权限信息。

权限信息中有该角色能够访问的所有页面的信息。之后遍历信息，去和所有页面路由去匹配，匹配到了，就是该用户能够访问的页面。

```ts
//所有页面的routes
const allPageRoutes = [
  	{
  	  path: '/system/user',
  	  name: 'login',
  	  component: () => import('@/views/main/system/user/user.vue')
  	},
  	  ...
]
//用户的权限信息
const userMenu = [
    {
      url:'/system/user',
      //其他信息...
    }
    ...
]

//用户实际渲染的路由
cosnt userRoutes = []

//遍历用户权限信息，做匹配:
userMenu.forEach((item,index) => {
    const mapRoute =  allPageRoutes.find((routes) => {
        routes.url === item.system
    })
    if(mapRoute) {
        userRoutes.push(mapRoute)
    }
})
```

#### 9.GForm 高级组件封装

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e62684a60f264a9daba9ba38508d5070~tplv-k3u1fbpfcp-watermark.image?)

如图，像这样的搜索相关的组件在很多个页面都会用到，那么我们就可以将这种组件封装成高阶组件，最后可以通过配置的方式使用。

#### 10.GTable 高级组件封装

#### 前端可视化

##### Echrts

使用上整体来说分为三步

1. 初始化 echarts 实例
2. 设置/更新数据
3. 调用 setOption 方法绘制数据，形成图表

## 六、项目部署:

流程图：

![image-20230507164913456](C:\Users\25843\AppData\Roaming\Typora\typora-user-images\image-20230507164913456.png)

##### 1.控制台链接远程服务器:

```powershell
ssh root@8.138.57.66
# 如果连接不上，先执行:
ssh-keygen -R 8.138.57.66
```

##### 2.安装 Java 环境

```powershell
# dnf类似于npm
dnf search java-1.8
dnf install java-1.8.0-openjdk.x86_64
```

##### 3.安装 Jenkins

```powershell
# 在服务器根目录下生成这个目录: /etc/yum.repos.d/jenkins.repo
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo

最新网址：https://pkg.jenkins.io/redhat/


# 但是好像生成到了/root目录，所以需要执行命令将jenkins.repo移到/etc/yum.repos.d目录下:
mv jenkins.repo /etc/yum.repos.d/
# 进入/etc/yum.repos.d目录:
cd /etc/yum.repos.d/
# 编辑jenkins.repo文件:
vi jenkins.repo

```

```pow
# 导⼊GPG密钥以确保您的软件合法
rpm --import https://pkg.jenkins.io/redhat/jenkins.io-2023.key

```

```powershell
# 安装Jenkins

dnf install daemonize-1.7.8-1.el8.x86_64  # （一定要先安装daemonize）后面是指定版本，可以不加
dnf install jenkins-2.308-1.1.noarch --nogpgcheck
```

```powershell
# 操作Jenkins
systemctl start jenkins
systemctl status jenkins
systemctl enable jenkins  # 随着操作系统的启动而启动，不用自己手动启动
systemctl stop jenkins
```

##### 4.配置 Jenkins

访问 http://8.138.57.66:8080/ (前提是在安全组中配置了 8080 端口)

获取管理员密码:

```powershell
cat /var/lib/jenkins/secrets/initialAdminPassword
```



##### 5.配置Nginx

5.1安装:

```powershell
dnf install nginx
systemctl start nginx
systemctl status nginx
systemctl enable nginx

# 浏览器访问
http://8.138.57.66:80 # 前提是安全组配置了80端口
```

5.2创建项目文件夹

```powershell
cd /root/
mkdir vue3_ts_cms
cd vue3_ts_cms
touch index.html # 生成一个index.html
vi index.html # 往index.html写入内容
# 接下来我们要做的就是让用户访问http://8.138.57.66:80的时候 展示我们刚才创建的index.html，这需要修改nginx的配置文件
```

5.3修改nginx的配置文件

```powershell
vi /etc/nginx/nginx.conf

修改: 
1:
user nginx; -->  user root;

2:
server {
	....
    # root         /usr/share/nginx/ht;
    ....
    
    location / {
        root /root/vue3_ts_cms;
        index index.html;
    }

最后:
systemctl restart nginx项目笔记
一. 代码规范
1.1. 集成 editorconfig 配置
EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

￼
# http://editorconfig.org
​
root = true
​
[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行
​
[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
VSCode 需要安装一个插件：EditorConfig for VS Code

![image-20210722215138665](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2gh989yj30pj05ggmb.jpg)

1.2. 使用 prettier 工具
Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。
虽然可以通过下载 prettier 插件来格式化代码，但是项目中直接依赖 prettier 可以让项目不管在什么编辑器下都保持风格统一

1.安装 prettier

￼
npm install prettier -D
2.配置.prettierrc 文件：

useTabs：使用 tab 缩进还是空格缩进，选择 false；

tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；

printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；

singleQuote：使用单引号还是双引号，选择 true，使用单引号；

trailingComma：在多行输入的尾逗号是否添加，设置为 none；

semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

￼
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
3.创建.prettierignore 忽略文件(忽略某些文件)

￼
/dist/*
.local
.output.js
/node_modules/**
​
**/*.svg
**/*.sh
​
/public/*
4.VSCode 需要安装 prettier 的插件

![image-20210722214543454](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2acx21rj30ow057mxp.jpg)

5.测试 prettier 是否生效

测试一：在代码中保存代码；

测试二：配置一次性修改的命令；

在 package.json 中配置一个 scripts：

￼
    "prettier": "prettier --write ."
1.3. 使用 ESLint 检测
1.在前面创建项目的时候，我们就选择了 ESLint，所以 Vue 会默认帮助我们配置需要的 ESLint 环境。

2.VSCode 需要安装 ESLint 插件：

![image-20210722215933360](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2oq26odj30pw05faaq.jpg)

3.解决 eslint 和 prettier 冲突的问题：

安装插件：（vue 在创建项目时，如果选择 prettier，那么这两个插件会自动安装）

￼
npm i eslint-plugin-prettier eslint-config-prettier -D
添加 prettier 插件：

￼
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
1.4. git Husky 和 eslint
虽然我们已经要求项目使用 eslint 了，但是不能保证组员提交代码之前都将 eslint 中的问题解决掉了：

也就是我们希望保证代码仓库中的代码都是符合 eslint 规范的；

那么我们需要在组员执行 git commit 命令的时候对其进行校验，如果不符合 eslint 规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 Husky 工具：

husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用 husky 呢？

这里我们可以使用自动配置命令：

￼
npx husky-init && npm install
这里会做三件事：

1.安装 husky 相关的依赖：

![image-20210723112648927](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg)

2.在项目目录下创建 .husky 文件夹：

npx huksy install
![image-20210723112719634](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq16zo75j307703mt8m.jpg)

3.在 package.json 中添加一个脚本：

![image-20210723112817691](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg)

接下来，我们需要去完成一个操作：在进行 commit 时，执行 lint 脚本：

![image-20210723112932943](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq3hn229j30nf04z74q.jpg)

这个时候我们执行 git commit 的时候会自动对代码进行 lint 校验。

1.5. git commit 规范
1.5.1. 代码提交风格
通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw17gaqjj30to0cj3zp.jpg)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

Commitizen 是一个帮助我们编写规范 commit message 的工具；

1.安装 Commitizen

npm install commitizen -D
2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

npx commitizen init cz-conventional-changelog --save-dev --save-exact
这个命令会帮助我们安装 cz-conventional-changelog：

![image-20210723145249096](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvz2odi4j30ek00zmx2.jpg)

并且在 package.json 中进行配置：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvzftay5j30iu04k74d.jpg)

这个时候我们提交代码需要使用 npx cz：

第一步是选择 type，本次更新的类型

Type	作用
feat	新增特性 (feature)
fix	修复 Bug(bug fix)
docs	修改文档 (documentation)
style	代码格式修改(white-space, formatting, missing semi colons, etc)
refactor	代码重构(refactor)
perf	改善性能(A code change that improves performance)
test	测试(when adding missing tests)
build	变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）
ci	更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等
chore	变更构建流程或辅助工具(比如更改测试环境)
revert	代码回退
第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

第三步选择提交的信息

![image-20210723150204780](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

第四步提交详细的描述信息

![image-20210723150223287](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

第五步是否是一次重大的更改

![image-20210723150322122](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

第六步是否影响某个 open issue

![image-20210723150407822](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

1.5.2. 代码提交验证
如果我们按照 cz 来规范了提交风格，但是依然有同事通过 git commit 按照不规范的格式提交应该怎么办呢？

我们可以通过 commitlint 来限制提交；

1.安装 @commitlint/config-conventional 和 @commitlint/cli

npm i @commitlint/config-conventional @commitlint/cli -D
2.在根目录创建 commitlint.config.js 文件，配置 commitlint

module.exports = {
  extends: ['@commitlint/config-conventional']
}
3.使用 husky 生成 commit-msg 文件，验证提交信息：

npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
如果不成功，换个命令行 窗口试一试
二. 第三方库集成
2.1. vue.config.js 配置
vue.config.js 有三种配置方式：

方式一：直接通过 CLI 提供给我们的选项来配置：

比如 publicPath：配置应用程序部署的子目录（默认是 /，相当于部署在 https://www.my-app.com/）；

比如 outputDir：修改输出的文件夹；

方式二：通过 configureWebpack 修改 webpack 的配置：

可以是一个对象，直接会被合并；

可以是一个函数，会接收一个 config，可以通过 config 来修改配置；

方式三：通过 chainWebpack 修改 webpack 的配置：

是一个函数，会接收一个基于 webpack-chain 的 config 对象，可以对配置进行修改；

const path = require('path')

module.exports = {
  outputDir: './build',
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
  }
}
2.2. vue-router 集成
安装 vue-router 的最新版本：

npm install vue-router@next
创建 router 对象：

import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
安装 router：

import router from './router'

createApp(App).use(router).mount('#app')
在 App.vue 中配置跳转：

<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>
2.3. vuex 集成
安装 vuex：

npm install vuex@next
创建 store 对象：

import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: 'coderwhy'
    }
  }
})

export default store
安装 store：

createApp(App).use(router).use(store).mount('#app')
在 App.vue 中使用：

<h2>{{ $store.state.name }}</h2>
2.4. element-plus 集成
Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库：

相信很多同学在 Vue2 中都使用过 element-ui，而 element-plus 正是 element-ui 针对于 vue3 开发的一个 UI 组件库；

它的使用方式和很多其他的组件库是一样的，所以学会 element-plus，其他类似于 ant-design-vue、NaiveUI、VantUI 都是差不多的；

安装 element-plus

npm install element-plus
2.4.1. 全局引入
一种引入 element-plus 的方式是全局引入，代表的含义是所有的组件和插件都会被自动注册,优点是引入方便，缺点是打包会将 elementUI 所有的代码都打包进去。

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
2.4.2. 局部引入
按需引入，也就是在开发中用到某个组件对某个组件进行引入：

<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>

    <h2>{{ $store.state.name }}</h2>

    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'App',
  components: {
    ElButton
  }
})
</script>

<style lang="less"></style>
但是我们会发现是没有对应的样式的，引入样式有两种方式：

全局引用样式（像之前做的那样）；

局部引用样式（通过 babel 的插件）；

1.安装 babel 的插件：

npm install babel-plugin-import -D
2.配置 babel.config.js

￼
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
但是这里依然有个弊端：

这些组件我们在多个页面或者组件中使用的时候，都需要导入并且在 components 中进行注册；

所以我们可以将它们在全局注册一次；

￼
import { ElButton, ElTable, ElAlert, ElAside, ElAutocomplete, ElAvatar, ElBacktop, ElBadge } from 'element-plus'
​
const app = createApp(App)
​
const components = [ElButton, ElTable, ElAlert, ElAside, ElAutocomplete, ElAvatar, ElBacktop, ElBadge]
​
for (const cpn of components) {
  app.component(cpn.name, cpn)
}
2.5. axios 集成
axios 的基本使用：
基本使用：
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'cobe',
      age: 24
    }
  })
  .then((res) => {
    console.log(res)
  })

axios返回一个promise，promise也可以有类型:AxiosResponse<any, any>,拿到的结果res就是这种类型
全局配置：
可以给所有的请求设置一些公共的配置，比如基本的 url，超时时间，一些公共的头部等：

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
axios
  .get('/get', {
    //不用再写baseurl了
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('/post', {
    data: {
      name: 'cobe',
      age: 24
    },
    timeout: 1000
  })
  .then((res) => {
    console.log(res)
  })
局部配置：
也可以在某个网络请求单独进行配置：

axios
  .get('/get', {
    params: {
      name: 'coderwhy',
      age: 18
    },
    baseURL: 'http://httpbin.org',
    timeout: 10000
  })
  .then((res) => {
    console.log(res)
  })
axios.all:
可以同时发送多个请求，axios.all 内部是基于 promise.all 来封装的

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'coderwhy',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'cobe',
        age: 24
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })
axios 的拦截器：
拦截器有两个参数，fn1 是成功时候执行的函数，fn2 是失败时候执行的函数

axios.interceptors.request.use(fn1, fn2)
axios.interceptors.response.use(fn1, fn2)
具体细节：

请求拦截器中成功函数的参数 config 就是我们在请求的时候设置的一些配置，比如 baseUrl,timeout,等等，我们可以对这些配置进行一些修改之后，

再继续发送请求,比如如果改了 baseUrl，就可以对请求做一个转发

//请求拦截器
axios.interceptors.request.use(
  (config) => {
    //对请求的配置做一些操作，比如：
    // 1.添加token
    // 2.添加loading效果
    return config
  },
  (err) => {
    //请求发生错误时的处理
    console.log(err)
    return err
  }
)

//响应拦截器
axios.interceptors.response.use(
  (res) => {
    //对返回的数据做一些处理
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)

//注意： 要先定义拦截器，再发送请求，
axios 的封装:
基本封装:
采用类来封装 axios，通过实例化 OYQRequest 类的时候传递 config 来设置某一类请求的基本参数，比如 baseURL，timeout 等，

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'

class OYQRequest {
  instance: AxiosInstance // AxiosInstance为axios的实例对应的类型
  constructor(config: AxiosRequestConfig) {
    // AxiosRequestConfig为创建axios实例时传入的配置对象的类型
    this.instance = axios.create(config)
  }
  request(config: AxiosRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

const request1 = new OYQRequest({ baseURL: BASE_URL, timeout: TIME_OUT })

export { request1 }
拦截器的封装:
封装拦截器可以从以下三个角度来封装，即封装每个类实例的请求都会执行的拦截器，和封装每个实例特有的拦截器，和每个实例下某个请求特有的拦截器

![image-20220316200244254](C:\Users\李志亮\AppData\Roaming\Typora\typora-user-images\image-20220316200244254.png)

实例特有的拦截器的封装:
试想，我们可以 new 出多个 OYQRequest 类的实例，但是这些实例在请求拦截的或响应拦截的时候，所需要做的事情可能是不一样的，有些可能需要添加 token，

有些可能需要 loading 动画，如果我们就简单的在 Request 类里面添加统一的拦截器，那么必然不能适应多种场景，

所以我们要想办法在初始化 OYQRequest 类的时候在 config 参数中将拦截器作为属性动态的传入，但是 AxiosRequestConfig 接口中并没有 interceptor 属性

所以我们的思路是，创建一个新的类型 OYQRequestConfig，这个接口继承自 AxiosRequestConfig，之后在这个接口中再定义一个 interceptor 属性，之后 config 使用

OYQRequestConfig 接口即可

另外 interceptor 有四个拦截器函数，这四个拦截器分别对应不同的类型，所以我们还要定义一个 OYQRequestInterceptor 接口，里面定义每个拦截器函数的类型

￼
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'
import type { AxiosInstance，AxiosRequestConfig, AxiosResponse } from 'axios'
​
`//定义拦截器的接口
interface OYQRequestInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig  // 可选链，因为即使传入了拦截器，也不一定所有的拦截器都要传
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceporCatch?: (err: any) => any
}
//定义AxiosRequestConfig的扩展接口：
interface OYQRequestConfig extends AxiosRequestConfig {
  interceptor?: OYQRequestInterceptor
}`
​
class OYQRequest {
  instance: AxiosInstance
  interceptor?: OYQRequestInterceptor    // 可选链，因为不一定需要传入拦截器
  constructor(config: OYQRequestConfig) {
    this.instance = axios.create(config)
    `this.interceptor = config.interceptor
​
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )`
  }
  request(config: OYQRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}
​
const request1 = new OYQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  `interceptor: {
    requestInterceptor(config) {
      //一些处理，比如添加token，添加loading动画等
      return config
    },
    requestInterceptorCatch(err) {
      return err
    }
  }`
})
​
export { request1 }
​
目前，我们是request1这个实例传入了两个拦截器，请求拦截器和请求错误拦截器
那么，下一次我们再实例化OYQRequest类的时候，就可以传入任意我们想要传入的拦截器了
实例共享的拦截器的封装:
目前我们实现了可以在实例化 OYQRequest 类时，某个实例自己的拦截器的封装，但是我们也可以封装一个通用的拦截器，就是每个类实例都会执行的拦截器

很简单，直接在 constructor 函数中调用 instance 的 interceptors 下对应的函数

￼
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'
import type { AxiosInstance } from 'axios'
import type { OYQRequestConfig, OYQRequestInterceptor } from './type'
​
class OYQRequest {
  instance: AxiosInstance
  interceptor?: OYQRequestInterceptor
  constructor(config: OYQRequestConfig) {
    this.instance = axios.create(config)`//实例共享的拦截器:
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )`
  }
  request(config: OYQRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}
​
const request1 = new OYQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor(config) {
      //一些处理，比如添加token，添加loading动画等
      console.log('请求成功的拦截')
​
      return config
    },
    requestInterceptorCatch(err) {
      return err
    }
  }
})
​
export { request1 }
某个请求独有的拦截器封装:
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '@/global'
import type { AxiosInstance } from 'axios'
import type { OYQRequestConfig, OYQRequestInterceptor } from './type'

class OYQRequest {
  instance: AxiosInstance
  interceptor?: OYQRequestInterceptor
  constructor(config: OYQRequestConfig) {
    this.instance = axios.create(config)
  }

  request(config: OYQRequestConfig) {
    this.instance.request(config).then((res) => {
      ;`if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }`
      console.log(res)
    })
  }
}

const request1 = new OYQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor(config) {
      //一些处理，比如添加token，添加loading动画等
      console.log('某个实例请求成功的拦截')

      return config
    },
    requestInterceptorCatch(err) {
      return err
    }
  }
})

export { request1 }

//在某个文件中调用request1的request函数：
import { request1 } from '@/network/request'
request1.request({
  url: '/home/multidata',
  method: 'GET',
  interceptor: {
    requestInterceptor: (config) => {
      console.log('某个请求单独的拦截')
      return config
    }
  }
})
三.区分不同环境：
在开发中，有时候我们需要根据不同的环境设置不同的环境变量，常见的有三种环境：

开发环境：development；

生产环境：production；

测试环境：test；

比如发送网络请求模块中的 baseurl 变量在开发环境下可能是 http://coderwhy/development,在生产环境下是 http://coderwhy/production，在测试环境下是 http://coderwhy/test

那么在不同环境下 baseurl 的值就需要做出相应改变，而改变环境变量的值有三种方法：

方式一：手动修改不同的变量；(不推荐)

方式二：根据 process.env.NODE_ENV 的值进行区分；(最常用)

process.env.NODE_ENV 的值在不同环境下的值不同，内部是通过 DefinPlugin 来设置

在开发环境下值为 development

在生产环境下值为 production

在测试环境下值为 test

那么我们就可以进行判断：

let BASE_URL: string
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://coderwhy/development'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy/production'
} else {
  BASE_URL = 'http://coderwhy/test'
}
export { BASE_URL }

//捡知识：
let foo = '123'
let bar = 'why'

export foo
export bar   //不可这样导出一个变量

可以在定义时就导出:
export let foo = '123'
export let bar = 'why'

也可这样导出:
export { foo,bar }
方式三：编写不同的环境变量配置文件；(较麻烦)

需要在项目根目录下创建三个文件

.env.development

.env.production

.env.test

那么在这三个文件中我们就可以给定义 BASE_URL 定义不同的值

在.dev.development中:
BASE_URL = http://coderwhy/development
VUE_APP_MESSAGE = Hello Message(development)

在.dev.production中:
BASE_URL = http://coderwhy/production
VUE_APP_MESSAGE = Hello Message(production)

在.dev.test中:
BASE_URL = http://coderwhy/test
VUE_APP_MESSAGE = Hello Message(test)

//注意:  获取的时候要通过process.env.VUE_APP_MESSAGE来获取而不是VUE_APP_MESSAGE
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略,不会被提交到git仓库
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
注意:只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中

四. 接口文档
https://documenter.getpostman.com/view/12387168/TzsfmQvw

baseURL 的值：

http://152.136.185.210:5000
设置全局 token 的方法：

const res = pm.response.json()
pm.globals.set('token', res.data.token)
接口文档 v2 版本：（有部分更新）

https://documenter.getpostman.com/view/12387168/TzzDKb12

五. 项目业务知识点
1.app.use
app.use 的参数如果是一个函数，会自动将 app 传入这个函数，
如果参数是一个对象，会执行这个对象的 install 方法，并且也会将 app 作为 install 方法的参数

2.tsconfig.json 文件
ts 源于 js 又归于 js，ts 代码最终要转换成 js 代码才能在浏览器上运用，而转换的规则，比如是转换成 es6 的代码还是转化成 es5 的代码，

就可以通过 tsconfig.json 文件来配置

3.defineComponent 函数
从 js 的角度，这个函数没有什么作用，但是从 ts 来看，这个函数可以帮助我们在组件内部做很多类型的推导，让我们编写出来的组件相关的代码更加严谨

4.css 初始化
一个项目搭建时，一般会对 css 的样式做一些初始化，初始化可以借助一些三方库比如 normaliz.css，

可以去 github 上下载 normalize.css 文件，然后引用到项目中，也可以通过 npm 的方式将 normalize 作为一个第三方包下载到项目中

另外在已经既有的三方库基础上，我们可能自己还会自定义一些 css 的基本样式

在 css 文件中引用 css 文件:
@import url('./base.less'); //不要忘记 ';'
5.表单验证
<el-form :model="account" :rules="rules" label-width="60px">
  <el-form-item label="账号" prop="name">
    <el-input v-model="account.name" type="text" />
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="account.password" type="password" />
  </el-form-item>
</el-form>
element-plus 表单验证可以传入一个 rules 对象,校验时可以通过 pettern 字段来定义正则表达式，如：

password: [
  { required: true, message: '密码不能为空', trigger: 'blur' },
  {
    pattern: /^[a-zA-Z0-9_]{6,12}$/,
    message: '密码需为6~12个字母或数字或下划线',
    trigger: 'blur'
  }
]
也可以自定义校验规则，校验信息可以通过 callback(new Error('校验信息'))抛出。

￼
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}
...
​
age: [{ validator: checkAge, trigger: 'blur' }],
6.登录功能设计
![image-20221211211317681](C:\Users\李志亮\AppData\Roaming\Typora\typora-user-images\image-20221211211317681.png)

具体设计:
点击登录的时候，通知 login-account 或 login-phone 要登录了，把具体的登录相关逻辑写到两个组件内，而不写到 login-panel 内，避免 login-panel 内的逻辑臃肿

login-panel 组件只负责登录模块整体架构的搭建。

获取组件类型
几种思路
以 login-account 组建为例，当点击立即登录的时候，我们要调用 login-account 内的 loginAction 方法执行登录逻辑，那么就必须在 login-panel 内获取到 login-account 组件实例

之后调用其内部的 loginAction 方法

//login-account组件
export default defineComponent({
  setup() {
	...
    const loginAction = () => {
      console.log('loginAction')
    }

    return {
	  ...
      loginAction
    }
  }
})
从 TS 的角度，使用 ref 并且 accountRef 初始值为 null 来获取 accountLogin 组件，会导致调用 accountRef.value.loginAction()时报错，

因为 accountRef.value 可能为 null，当为 null 时不可能有 loginAction 方法

<template>
  ...
  <login-account ref="accountRef" />
  ...
</template>
//login-panel组件:
<script lang="ts">
...
import LoginAccount from './login-account.vue'
export default defineComponent({
  components: {
    LoginAccount,
  },
  setup() {
    const accountRef = ref(null)
    const handleLogin = () => {
      //调用组件内部方法:
      accountRef.value.loginAction()  //报错
    }
    return {
      accountRef,
      handleLogin
    }
  }
})
</script>
当然也可以初始化的时候不传值，不传值 accountRef 的值就是 any,但是这样的坏处是，any 可能具有任何方法，这意味着即使 accountRef 组件内没有某个方法，

去调用这个方法的时候，也不会报错：

￼
//login-panel组件:
<script lang="ts">
    ...
export default defineComponent({
  setup() {
    const accountRef = ref()
    const handleLogin = () => {
      //调用组件内部方法:
      accountRef.value.a()  //不报错
      accountRef.value.abc() //不报错
    }
    ...
  }
})
</script>
正确的思路是，获取 accountLogin 组件的时候，能够拿到组件对应的类型，将这个类型作为 accountRef 变量的类型

但是 loginAccount 组件实际上是一个对象，那么如何拿到 accountLogin 组件对象的类型呢？

￼
<script lang="ts">
    ...
export default defineComponent({
​
  setup() {
    `const accountRef = ref<InstanceType<typeof LoginAccount>>()`
    const handleLogin = () => {
      //调用组件内部方法:
      accountRef.value?.loginAction() //不报错   使用可选链是因为初始化的时候没有传值，accountRef.value可能是undefined
​
      accountRef.value.a()  //报错 因为没有这个方法
      accountRef.value.abc() //报错
    }
    ...
  }
})
</script>
组件实例
定义一个 Demo 组件，会导出一个对象:

￼
export default defineComponent({
    ...
})
思考:

￼
当在其他组件中使用这个组件的时候，是不是直接使用导出的这个对象?
答案:

￼
不是，导出的这个对象其实是组件的描述对象，真正使用这个组件的时候是根据这个描述对象去创建一个真正的组件实例
试想，Demo组件可以在a组件内使用，同时也可以在b组件内使用,如果是同一个对象，必然会相互影响。
所以其实是在a组件中使用的时候，创建一个组件实例，在b组件中使用的时候，又创建了一个组件实例。
详解ref<InstanceType<typeof LoginAccount>>()
￼
首先ref<>()   <>可以固定ref参数的类型
那么InstanceType<typeof LoginAccount> 的值就是一个组件实例的类型
组件实例是一个对象，那么拿到一个对象的类型，就是拿到这个对象的构造函数
InstanceType<typeof LoginAccount>可以拿到LoginAccount组件实例的构造函数
7.setup 中使用 store 中的状态
在组件中使用 store 中的状态时,store 的类型为 any

￼
  setup() {
    const store = useStore()  ==> any
    return {}
  }
但是实际上我们已经定义好了根 store 中 state 的类型和子 store 中 state 的类型:

￼
//根store
interface IrooteState {
  name: string
  age: number
}
​
//子store
interface ILoginState {
  userInfo: any
  token: string
  userMenus: any
}
所以我们想在 setup 中使用 store 时能明确推导出 store 的类型，而不是推断为 any，另外，当想使用子 store 中的状态时，需要这样:

￼
  setup() {
    const store = useStore()  ==> any
    const userMenus = store.state.loginModule.userMenus  ==> 根store的state中根本没有loginModule这个属性
    return {}
  }
为了使用时 store 不被推断为 any，并且可以使用子模块中的状态，需要这样:

store/type.ts：

￼
interface IrooteState {
  name: string
  age: number
}
interface IModuleState {
  loginModule: ILoginState
}
​
//根模块和子模块的交叉类型
type IrootAndModuleState = IrooteState & IModuleState
​
export { IrootAndModuleState }
store/index.ts

￼
//为了在组件中store不为any并且可以使用子store中的状态,重构useStore函数：
​
import { createStore, useStore as useVuexStore, Store } from 'vuex'
​
export function useStore(): Store<IrootAndModuleState> {
  return useVuexStore()
}
8.权限控制
1.基于角色控制权限
后端设计
对于后端来讲，所有登录系统的人都是一个用户，所以后端会维护一个用户表，假如给每个用户都去分配权限，那么会非常的繁琐，

比较好的思路是会再维护一个角色表，每个用户创建的时候会分配一个角色，另外还会维护要一个权限表(菜单表)，每个角色都会有对应的权限。

这就是基于权限控制。

前端设计
对于前端来讲，其实是不知道到底谁会登录的，因为超级管理可能会登录，管理员可能会登录，运营也可能会登录，所以就确定不了用户到底能访问哪些页面，

也就不能把菜单写死，这就意味着要根据不同的登录者(角色)去动态的展示菜单。

举例来说，假如系统总共有 abcdef6 个页面，张三作为运营，能够访问的页面有 a、b、c 三个页面，李四作为管理员，能够访问的页面有 a、b、c、d 四个页面

王五作为超级管理员，能够访问所有的页面，那么这三个不同的人在登录的时候，就需要返回不同的页面菜单。

2.展示菜单的三种方案
1.写死所有的路由
把系统的所有页面的路由都注册，当用户登录成功的时候，然后根据用户的权限，隐藏掉该用户不能访问的页面的菜单，显示该用户能够访问的页面的菜单

不过这种方法有一个弊端，那就是虽然菜单里面看不到该用户不能访问的页面的菜单项，但是依然可以通过地址栏输入 url 的方式展示用户不能访问的页面。

因为已经注册了所有的路由。

￼
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
        //注册所有的路由
    ]
  },
2.事先配置
前端事先定义好每种角色能够访问的所有路由，当用户登录成功，拿到用户的角色信息，去匹配某种角色，匹配成功就渲染该角色对应的路由

但是这种方式不好的地方是，当要新增一种角色时，需要前端去改角色配置。

const rolesRoutes = {
    superadmin: [{},{},{},{},{}],   //超级管理员的路由
    admin: [{},{},{}],  //管理员的路由
    user: [{},{}],  //运营的路由
}

  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: rolesRoutes.superadmin   //假如当前登录的用户是超级管理员
  },
3.动态路由
先获取到所有页面的 routes(一个数组)，当用户登录成功的时候，会返回用户的角色信息，比如用户是管理员，之后根据用户的角色信息去请求对应的权限信息。

权限信息中有该角色能够访问的所有页面的信息。之后遍历信息，去和所有页面路由去匹配，匹配到了，就是该用户能够访问的页面。

￼
//所有页面的routes
const allPageRoutes = [
    {
      path: '/system/user',
      name: 'login',
      component: () => import('@/views/main/system/user/user.vue')
    },
      ...
]
//用户的权限信息
const userMenu = [
    {
      url:'/system/user',
      //其他信息...
    }
    ...
]
​
//用户实际渲染的路由
cosnt userRoutes = []
​
//遍历用户权限信息，做匹配:
userMenu.forEach((item,index) => {
    const mapRoute =  allPageRoutes.find((routes) => {
        routes.url === item.system
    })
    if(mapRoute) {
        userRoutes.push(mapRoute)
    }
})
9.GForm 高级组件封装
￼

如图，像这样的搜索相关的组件在很多个页面都会用到，那么我们就可以将这种组件封装成高阶组件，最后可以通过配置的方式使用。

10.GTable 高级组件封装
前端可视化
Echrts
使用上整体来说分为三步

初始化 echarts 实例

设置/更新数据

调用 setOption 方法绘制数据，形成图表

六、项目部署:
流程图：

￼

1.控制台链接远程服务器:
￼
ssh root@8.138.57.66
# 如果连接不上，先执行:
ssh-keygen -R 8.138.57.66
2.安装 Java 环境
￼
# dnf类似于npm
dnf search java-1.8
dnf install java-1.8.0-openjdk.x86_64
3.安装 Jenkins
￼
# 在服务器根目录下生成这个目录: /etc/yum.repos.d/jenkins.repo
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
​
最新网址：https://pkg.jenkins.io/redhat/
​
​
# 但是好像生成到了/root目录，所以需要执行命令将jenkins.repo移到/etc/yum.repos.d目录下:
mv jenkins.repo /etc/yum.repos.d/
# 进入/etc/yum.repos.d目录:
cd /etc/yum.repos.d/
# 编辑jenkins.repo文件:
vi jenkins.repo
​
￼
# 导⼊GPG密钥以确保您的软件合法
rpm --import https://pkg.jenkins.io/redhat/jenkins.io-2023.key
​
￼
# 安装Jenkins
​
dnf install daemonize-1.7.8-1.el8.x86_64  # （一定要先安装daemonize）后面是指定版本，可以不加
dnf install jenkins-2.308-1.1.noarch --nogpgcheck
￼
# 操作Jenkins
systemctl start jenkins
systemctl status jenkins
systemctl enable jenkins  # 随着操作系统的启动而启动，不用自己手动启动
systemctl stop jenkins
4.配置 Jenkins
访问 http://8.138.57.66:8080/ (前提是在安全组中配置了 8080 端口)

获取管理员密码:

￼
cat /var/lib/jenkins/secrets/initialAdminPassword
5.配置Nginx
5.1安装:

￼
dnf install nginx
systemctl start nginx
systemctl status nginx
systemctl enable nginx
​
# 浏览器访问
http://8.138.57.66:80 # 前提是安全组配置了80端口
5.2创建项目文件夹

￼
cd /root/
mkdir vue3_ts_cms
cd vue3_ts_cms
touch index.html # 生成一个index.html
vi index.html # 往index.html写入内容
# 接下来我们要做的就是让用户访问http://8.138.57.66:80的时候 展示我们刚才创建的index.html，这需要修改nginx的配置文件
5.3修改nginx的配置文件

￼
vi /etc/nginx/nginx.conf
​
修改: 
1:
user nginx; -->  user root;
​
2:
server {
    ....
    # root         /usr/share/nginx/ht;
    ....
    
    location / {
        root /root/vue3_ts_cms;
        index index.html;
    }
​
最后:
systemctl restart nginx
```

##### 6.安装git

```powershell
dnf install git
```





待优化：

- 删除时弹出删除成功提示
- 添加接口异常处理，接口异常的时候没有容错和吐司提示
- 支持删除多个
- 目前全局的 store 东西都放在 system 中，后面放到 store/index 中
- 侧边栏背景优化
- formItemStyle 不生效
- 新增和编辑时密码隐藏错乱，区分新增和编辑，弹框位置偏下
- 权限放到了本地存储中，好像不太合适，应该放到 store 中，每次刷新页面去请求
