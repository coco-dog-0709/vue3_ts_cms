//统一出口

import lzlRequest from './request'
import { BASE_URL } from './request/config'
import { cache } from '@/utils'

const request = new lzlRequest({
  baseURL: BASE_URL,
  timeout: 1000,
  interceptor: {
    requestInterceptor(config) {
      // 1.携带token
      const token = cache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestErrorInterceptor(err) {
      return err
    },
    reponseInterceptor(res) {
      return res
    },
    reponseErrorInterceptor(err) {
      return err
    }
  }
})

export default request
