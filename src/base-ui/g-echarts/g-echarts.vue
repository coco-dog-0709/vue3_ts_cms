<template>
  <div class="g-echarts">
    <div ref="divRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from './hooks/use-ehcarts'
const divRef = ref<HTMLElement>()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    option: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

onMounted(() => {
  const { setOption } = useEcharts(divRef.value!)
  watchEffect(() => {
    setOption(props.option)
  })
})
</script>

<style scoped></style>
