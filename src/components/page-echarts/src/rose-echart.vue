// 玫瑰图
<template>
  <div class="rose-echart">
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
    legend: {
      top: 'top',
      left: '0'
    },
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: props.seriesName,
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.data
      }
    ]
  }
})
</script>

<style scoped></style>
