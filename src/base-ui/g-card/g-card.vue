<template>
  <div class="g-card">
    <el-card :shadow="shadow">
      <template #header>
        <span class="header">{{ title }}</span>
      </template>
      <slot>
        <div>Content</div>
      </slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GCard',
  props: {
    title: {
      type: String,
      default: 'Here is a Title'
    },
    shadow: {
      type: String,
      default: 'always'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.g-card {
  margin-bottom: 20px;
  .header {
    font-weight: 700;
  }
}
</style>
