// 饼图
<template>
  <div class="pipe-echart">
    <GEcharts :option="option"></GEcharts>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed } from 'vue'
import { IDataType, ITitle } from '../type'
const props = withDefaults(
  defineProps<{
    data: IDataType[]
    title?: ITitle
    seriesName: string
  }>(),
  {}
)
import { GEcharts } from '@/base-ui'

const option = computed(() => {
  return {
    title: props.title,
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: props.seriesName,
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
