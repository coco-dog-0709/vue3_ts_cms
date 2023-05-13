<template>
  <div class="not-found">
    <h2>Sorry~ Not Found</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'not-found',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
