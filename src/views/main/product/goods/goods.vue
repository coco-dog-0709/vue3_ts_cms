<template>
  <div class="goods">
    <PageSearch :formConfig="formConfig" @resetForm="handleResetForm" @queryForm="handleQueryForm" pageName="goods" />
    <PageContent ref="pageContentRef" :tableConfig="tableConfig" pageName="goods">
      <template #imgUrl="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        />
      </template>
      <template #oldPrice="scope">
        <div>￥{{ scope.row.oldPrice }}</div>
      </template>
      <template #newPrice="scope">
        <div>￥{{ scope.row.newPrice }}</div>
      </template>
      <template #status="scope">
        <div>{{ scope.row.status === 1 ? '上架' : '下架' }}</div>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { tableConfig } from './config/table-config'
import { formConfig } from './config/search-config'
import { usePageSearch } from '@/hooks'

export default defineComponent({
  name: 'goods',
  setup() {
    const [pageContentRef, handleQueryForm, handleResetForm] = usePageSearch()

    return {
      tableConfig,
      formConfig,
      pageContentRef,
      handleResetForm,
      handleQueryForm
    }
  }
})
</script>

<style scoped></style>
