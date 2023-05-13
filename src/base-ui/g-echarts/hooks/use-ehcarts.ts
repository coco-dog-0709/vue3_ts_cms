import * as echarts from 'echarts'

//注册中国地图
import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)
  const setOption = (option: echarts.EChartsOption) => {
    echartsInstance.setOption(option)
  }

  //窗口大小改变时，重新渲染图表
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  //执行某个动作之后想更新图表，可以使用这个函数
  const resize = () => {
    echartsInstance.resize()
  }

  return {
    echartsInstance,
    setOption,
    resize
  }
}
