<template>
  <div class="menu-page">
    <PageSearch
      :formConfig="formConfig"
      @queryForm="handleQueryForm"
      @resetForm="handleResetForm"
      pageName="menu"
    ></PageSearch>
    <PageContent ref="pageContentRef" :tableConfig="tableConfig" pageName="menu"></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { tableConfig } from './config/table-config'
import { formConfig } from './config/form-config'
import { usePageSearch } from '@/hooks'

export default defineComponent({
  name: 'MenuPage',
  setup() {
    const [pageContentRef, handleQueryForm, handleResetForm] = usePageSearch()
    return {
      formConfig,
      tableConfig,
      pageContentRef,
      handleQueryForm,
      handleResetForm
    }
  }
})
</script>

<style scoped></style>
