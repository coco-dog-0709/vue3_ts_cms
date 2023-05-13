<template>
  <div class="user">
    <PageSearch :formConfig="formConfig" @queryForm="handleQueryForm" @resetForm="handleResetForm" pageName="users" />
    <PageContent
      ref="pageContentRef"
      :tableConfig="tableConfig"
      pageName="users"
      @addClick="handleAddClick"
      @editClick="handleEditClick"
    />
    <PageModal
      ref="pageModalRef"
      :modalConfig="ModalConfigComputed"
      :title="pageModalTitle"
      :modalData="modalData"
      :hidden-item="hiddenItem"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

import { formConfig, tableConfig, modalConfig } from './config'

// hooks:
import { usePageSearch, usePageModal } from '@/hooks'

export default defineComponent({
  name: 'user',

  setup() {
    const store = useStore()
    const hiddenItem = ref<Array<string>>([])
    const pageModalTitle = ref('')

    const addCallBack = () => {
      pageModalTitle.value = '新增用户'
      hiddenItem.value = []
    }
    const editCallBack = () => {
      pageModalTitle.value = '编辑用户'
      hiddenItem.value.push('password')
    }
    const ModalConfigComputed = computed(() => {
      const allDepartmentList = store.state.allDepartmentList
      const allRoleList = store.state.allRoleList

      const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')
      if (departmentItem && departmentItem.options) {
        departmentItem.options = allDepartmentList.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }

      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
      if (roleItem && roleItem.options) {
        roleItem.options = allRoleList.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
      return modalConfig
    })

    const [pageContentRef, handleQueryForm, handleResetForm] = usePageSearch()
    const [handleAddClick, handleEditClick, modalData, pageModalRef] = usePageModal(addCallBack, editCallBack)

    return {
      //配置:
      formConfig,
      tableConfig,
      modalConfig,
      ModalConfigComputed,

      //实例:
      pageContentRef,
      pageModalRef,

      //数据:
      hiddenItem,
      pageModalTitle,
      modalData,

      //事件:
      handleQueryForm,
      handleResetForm,
      handleAddClick,
      handleEditClick,
      addCallBack,
      editCallBack
    }
  }
})
</script>

<style scoped lang="less"></style>
