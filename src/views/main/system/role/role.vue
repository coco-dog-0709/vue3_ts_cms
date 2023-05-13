<template>
  <div class="role">
    <PageSearch :formConfig="formConfig" pageName="role"></PageSearch>
    <PageContent
      :tableConfig="tableConfig"
      pageName="role"
      @addClick="handleAddClick"
      @editClick="handleEditClick"
    ></PageContent>
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :title="pageModalTitle"
      :modalData="modalData"
      :otherFormData="otherFormData"
      pageName="role"
    >
      <template #default>
        <div class="tree-menu">
          <el-tree
            ref="elTreeRef"
            :data="allMenuList"
            :props="{ children: 'children', label: 'name' }"
            show-checkbox
            node-key="id"
            @check="handleCheck"
          ></el-tree>
        </div>
      </template>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { ElTree } from 'element-plus'

import { formConfig, tableConfig, modalConfig } from './config'

import { usePageModal } from '@/hooks'

import { getLeaveNodes } from '@/global/get-user-routes'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const store = useStore()
    const pageModalTitle = ref('')
    const allMenuList = computed(() => store.state.allMenuList)
    const otherFormData = ref({})
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    // 勾选权限树
    const handleCheck = (data: any, selectedData: any) => {
      //两个参数 data:当前次被选中的对象，checked:树当前所有被选中的对象
      // const menuList = getLeaveNodes(selectedData.checkedNodes)
      // checkedKeys + halfCheckedKeys = 所有处于选中状态的节点的id   half：半选中
      const { checkedKeys, halfCheckedKeys } = selectedData
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherFormData.value = { menuList }
    }

    const addCallBack = () => {
      pageModalTitle.value = '新增角色'
      nextTick(() => {
        // 点击新增时，清空选中的节点
        elTreeRef.value?.setCheckedKeys([], false)
      })
    }
    const editCallBack = (item: any) => {
      pageModalTitle.value = '编辑角色'
      const leaveNodeKeys = getLeaveNodes(item.menuList)

      nextTick(() => {
        // 点击编辑时，因为elTreeRef.value还没来的及与ElTree绑定， 值为undefined  所以放到nextTick中
        elTreeRef.value?.setCheckedKeys(leaveNodeKeys, false)
      })
    }
    const [handleAddClick, handleEditClick, modalData, pageModalRef] = usePageModal(addCallBack, editCallBack)
    return {
      //配置:
      formConfig,
      tableConfig,
      modalConfig,

      //实例:
      pageModalRef,
      elTreeRef,

      //数据:
      modalData,
      pageModalTitle,
      allMenuList,
      otherFormData,

      //事件:
      handleAddClick,
      handleEditClick,
      addCallBack,
      editCallBack,
      handleCheck
    }
  }
})
</script>

<style scoped lang="less">
.tree-menu {
  margin-left: 30px;
}
</style>
