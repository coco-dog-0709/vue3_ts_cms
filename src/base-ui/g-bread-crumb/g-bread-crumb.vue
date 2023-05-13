<template>
  <div class="g-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.id" :to="{ path: item.path }">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IbreadCrumb } from './type'

export default defineComponent({
  name: '',
  props: {
    breadCrumbs: {
      type: Array as PropType<IbreadCrumb[]>,
      defult: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
