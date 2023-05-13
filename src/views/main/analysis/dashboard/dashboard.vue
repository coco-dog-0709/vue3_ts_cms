<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="7">
        <GCard title="分类商品数量(饼图)" shadow="hover">
          <PieEchart :data="goodsCount" series-name="分类商品"></PieEchart>
        </GCard>
      </el-col>
      <el-col :span="10">
        <GCard title="分类商品城市销量" shadow="hover">
          <MapEchart :data="cityGoodsSale" series-name="分类商品"></MapEchart>
        </GCard>
      </el-col>
      <el-col :span="7">
        <GCard title="分类商品数量(玫瑰图)" shadow="hover">
          <RoseEchart :data="goodsCount" series-name="分类商品"></RoseEchart>
        </GCard>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <GCard title="分类商品全国销量" shadow="hover">
          <LineEchart v-bind="goodsSale"></LineEchart>
        </GCard>
      </el-col>
      <el-col :span="12">
        <GCard title="分类商品收藏" shadow="hover">
          <BarEchart v-bind="goodsFavor"></BarEchart>
        </GCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

import { GCard } from '@/base-ui'
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    GCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('analyseModule/getCategoryGoodsDataAction')

    const goodsCount = ref<any[]>([])
    const goodsSale = ref({})
    const goodsFavor = ref({})
    const cityGoodsSale = ref<any[]>([])

    // dispatch和获取store.state.analyseModule.categoryGoodsCount是异步，
    // 可能获取的时候数据还没有请求回来所以这里用watch监听

    //分类商品个数
    watch(
      () => store.state.analyseModule.categoryGoodsCount,
      (newVal) => {
        goodsCount.value = newVal.map((item) => {
          return { name: item.name, value: item.goodsCount }
        })
      }
    )
    //分类商品总销量
    watch(
      () => store.state.analyseModule.categotyGoodsSale,
      (newVal) => {
        const xLabels: string[] = []
        const values: number[] = []
        for (const item of newVal) {
          xLabels.push(item.name)
          values.push(item.goodsCount)
        }
        goodsSale.value = { xLabels, values }
      }
    )
    //分类商品收藏
    watch(
      () => store.state.analyseModule.cagtegoryGoodsFavor,
      (newVal) => {
        const xLabels: string[] = []
        const values: number[] = []
        for (const item of newVal) {
          xLabels.push(item.name)
          values.push(item.goodsFavor)
        }
        goodsFavor.value = { xLabels, values }
      }
    )
    //商品各个城市销量
    watch(
      () => store.state.analyseModule.cityGoodsSale,
      (newVal) => {
        cityGoodsSale.value = newVal.map((item) => {
          return { name: item.address, value: item.count }
        })
      }
    )

    return {
      goodsCount,
      goodsSale,
      goodsFavor,
      cityGoodsSale
    }
  }
})
</script>

<style scoped></style>
