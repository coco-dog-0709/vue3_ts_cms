// 玫瑰图
<template>
  <div class="line-echart">
    <GEcharts :option="option"></GEcharts>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed } from 'vue'
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
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
