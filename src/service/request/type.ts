import type { AxiosRequestConfig } from 'axios'

//拦截器类型:
export interface lzlRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestErrorInterceptor?: (err: any) => any
  reponseInterceptor?: (res: any) => any
  reponseErrorInterceptor?: (err: any) => any
}
// AxiosRequestConfig的扩展类型:
export interface lzlRequestConfig extends AxiosRequestConfig {
  interceptor?: lzlRequestInterceptors
  loading?: boolean
}
