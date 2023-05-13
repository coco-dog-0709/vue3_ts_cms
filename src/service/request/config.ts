/*
 * 配置不同环境下 网络请求基本路径,一般有三种方式：
 * 方式一，手动配置(不推荐)
 * 方式二，根据process.env.NODE_ENV的值配置
 * 方式三，编写不同的环境变量配置文件(较复杂)
 * 这里采用方式二：
 * process.env.NODE_ENV的值在不同环境下不同   开发环境值为development   生产环境为production  测试环境为test
 */

let BASE_URL: string

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:5000'
} else {
  BASE_URL = 'http://lzl/test'
}

export { BASE_URL }
