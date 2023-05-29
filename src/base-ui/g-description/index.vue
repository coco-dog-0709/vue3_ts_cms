<template>
  <div class="g-description">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in descriptionData" :key="index">
        <el-descriptions-item>
          <template #label>{{ item.name }}</template>
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '',
  props: {
    title: {
      type: String,
      default: ''
    },
    descriptionData: {
      type: Array,
      default: () => []
    },
    column: {
      type: Number,
      default: 1
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.g-description {
  margin-bottom: 20px;
}
</style>
