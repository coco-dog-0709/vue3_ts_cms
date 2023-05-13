/*
 * 采用类来封装网络请求的好处是:
 * 1.避免过渡依赖某个库，比如axios，当axios库停止维护时，只需要更改这一文件即可。
 * 2.当项目足够大时，很多资源不是放在同一个服务器下，那么当域名不同时，可以创建类的多个实例，传入不同的配置即可。
 * 3.可以对拦截器进行颗粒化的封装，可封装每个类实例特有的拦截器(需要实例化时传入),也可以封装所有实例共有的拦截器，甚至是某个请求特有的拦截器。
 */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { lzlRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const LOADING_DEFAULT_STATUS = false

class lzlRequest {
  instance: AxiosInstance
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: lzlRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.loading ?? LOADING_DEFAULT_STATUS

    //1.自定义每个实例单独执行的拦截器
    this.instance.interceptors.request.use(
      config.interceptor?.requestInterceptor,
      config.interceptor?.reponseErrorInterceptor
    )
    this.instance.interceptors.response.use(
      config.interceptor?.reponseInterceptor,
      config.interceptor?.reponseErrorInterceptor
    )

    //2.定义所有实例都会执行的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '正在加载...'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        /*
         * 对于响应失败的处理，服务器有两种思路，
         * 一，当服务器响应失败时，会返回http状态码，然后前端根据http状态码去展示页面
         * 二，响应失败时，依然返回200，然后数据里面返回代表失败的code和错误信息
         */
        // 方式一：
        const data = res.data
        return data
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request(config: lzlRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      //3.定义某个请求都有的拦截器
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }

      if (config.loading === true) {
        this.showLoading = config.loading
      }

      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptor?.reponseInterceptor) {
            res = config.interceptor.reponseInterceptor(res)
          }
          resolve(res)
          // 最后初始化showLoading,以免影响下一个网络请求
          this.showLoading = LOADING_DEFAULT_STATUS
        })
        .catch((err) => {
          this.showLoading = LOADING_DEFAULT_STATUS
          reject(err)
        })
    })
  }

  get<T>(config: lzlRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: lzlRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: lzlRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: lzlRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default lzlRequest
