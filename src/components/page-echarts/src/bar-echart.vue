// 饼图
<template>
  <div class="bar-echart">
    <GEcharts :option="option"></GEcharts>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed } from 'vue'
import * as echarts from 'echarts'

const props = withDefaults(
  defineProps<{
    xLabels: string[]
    values: number[]
  }>(),
  {
    xLabels: () => [],
    values: () => []
  }
)
import { GEcharts } from '@/base-ui'

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: false,
        color: '#000'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
