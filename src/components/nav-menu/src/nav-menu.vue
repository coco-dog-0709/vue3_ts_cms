<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3 + TS</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="aside-menu"
      text-color="#b7bdc3"
      background-color="#00152b"
      :collapse="collapse"
      unique-opened
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-submenu v-if="item.children?.length > 0" :index="`${item.id}`">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="middleItem in item.children" :key="middleItem.id">
            <el-menu-item :index="`${middleItem.id}`" @click="menuItemClick(middleItem)">{{
              middleItem.name
            }}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="`${item.id}`" @click="menuItemClick(item)">
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { getMenuIdByPath } from '@/global'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const userMenus = computed(() => store.state.loginModule.userMenus)
    const defaultActive = computed(() => {
      const matchMenu = getMenuIdByPath(userMenus.value, route.path)
      if (matchMenu) {
        return matchMenu.id + ''
      }
      return '39' //默认为核心技术的id
    })

    const menuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      menuItemClick,
      defaultActive
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  background-color: #00152b;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px 0 5px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      flex: 1;
      white-space: nowrap;
    }
  }
  .aside-menu {
    width: 100%;
    height: calc(100% - 48px);
    border-right: none;
  }
  /deep/ .el-submenu__title {
    padding-left: 18px !important;
  }
  /deep/ .el-menu-item {
    background-color: #092036 !important;
  }

  /deep/ .el-menu-item.is-active {
    background-color: #0a60bd !important ;
    color: #fff !important;
  }
  /deep/ .el-menu-item:hover,
  /deep/ .el-submenu__title:hover {
    color: #fff !important;
  }
}
</style>
