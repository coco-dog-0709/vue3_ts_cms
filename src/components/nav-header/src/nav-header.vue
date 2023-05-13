<template>
  <div class="nav-header">
    <div class="nav-left">
      <i class="fold-menu" :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="foldMenuClick"></i>
      <GBreadCrumb :bread-crumbs="breadCrumbs"></GBreadCrumb>
    </div>
    <div class="nav-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logoutClick" icon="el-icon-warning">退出登录</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user-solid">用户信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit-outline">系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="username">{{ username }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { cache } from '@/utils'
import { GBreadCrumb } from '@/base-ui'
import { mapBreadCrumbByPath } from '@/global'

export default defineComponent({
  components: {
    GBreadCrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isFold = ref(false)
    const username = computed(() => store.state.loginModule.userInfo.name)
    const userMenus = computed(() => store.state.loginModule.userMenus)
    const breadCrumbs = computed(() => {
      return mapBreadCrumbByPath(userMenus.value, route.path)
    })

    const foldMenuClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const logoutClick = () => {
      cache.setCache('token', '')
      router.push('/login')
    }
    return {
      isFold,
      username,
      userMenus,
      breadCrumbs,
      foldMenuClick,
      logoutClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .nav-left {
    display: flex;
    align-items: center;
    .bread-crumb {
      margin-left: 20px;
    }
  }
  .nav-right {
    display: flex;
    align-items: center;
  }
  .fold-menu {
    margin-right: 20px;
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
