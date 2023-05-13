<template>
  <div class="main">
    <el-container class="container">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="aside">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <nav-header @foldChange="foldChangeClick" />
        </el-header>
        <el-main class="center">
          <div class="center-content">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const foldChangeClick = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      foldChangeClick
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .container {
    height: 100%;
    .aside {
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      cursor: pointer;
      background-color: #092036;
      transition: width 0.3s linear;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .header {
      display: flex;
      color: #333;
      text-align: center;
      align-items: center;
      height: 48px !important;
      background: #fff;
    }
    .center {
      height: calc(100% - 48px);
      background-color: #f0f2f5;
      color: #333;
    }
    .center-content {
      background-color: #fff;
    }
  }
}
</style>
