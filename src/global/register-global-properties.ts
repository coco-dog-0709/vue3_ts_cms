import { App } from 'vue'
import { timeFormat } from '@/utils'
export default function registerGlobalProperties(app: App) {
  //1.格式化时间的函数
  app.config.globalProperties.$timeFormat = timeFormat
}
