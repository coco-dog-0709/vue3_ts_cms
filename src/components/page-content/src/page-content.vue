<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="page-content">
    <GTable :tableData="tableData" :totalCount="totalCount" v-bind="tableConfig" v-model:pagination="pagination">
      <!-- 通用插槽 --start -->
      <template #headerOperate>
        <el-button :disabled="!createPermission" type="primary" size="small" @click="handleAdd">{{
          tableConfig.rightButtonText || '新增'
        }}</el-button>
        <el-button class="el-icon-refresh" size="small"></el-button>
      </template>
      <template #enable="scope">
        <el-button plain size="mini" :type="scope.row.enable === 1 ? 'primary' : 'danger'">{{
          scope.row.enable === 1 ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        {{ $timeFormat(scope.row.createAt, 'YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateAt="scope">
        {{ $timeFormat(scope.row.updateAt, 'YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #operate="scope">
        <el-button
          :disabled="!updatePermission"
          class="el-icon-edit"
          type="text"
          size="mini"
          @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          :disabled="!deletePermission"
          class="el-icon-delete"
          type="text"
          size="mini"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
      <!-- 通用插槽 --end -->

      <!-- 每个页面需要单独处理的插槽，传递到每个具体的页面 --start -->
      <template v-for="item in personalSlots" :key="item.slotName" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
      <!-- 每个页面需要单独处理的插槽，传递到每个具体的页面 --end -->
    </GTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import { usePermissions } from '@/hooks'

export default defineComponent({
  name: 'PageContent',
  props: {
    tableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['addClick', 'editClick'],
  setup(props, { emit }) {
    const store = useStore()
    const pagination = ref({ currentPage: 1, pageSize: 10 })
    watch(pagination, () => {
      getPageList()
    })
    //发送网络请求:
    const getPageList = (formData: any = {}) => {
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pagination.value.currentPage - 1) * pagination.value.pageSize,
          size: pagination.value.pageSize,
          ...formData
        }
      })
    }
    getPageList()

    const tableData = computed(() => store.state.systemModule.tableData)
    const totalCount = computed(() => store.state.systemModule.totalCount)

    //每列的插槽，筛选出共有的插槽，剔除掉，保留页面特有的插槽
    const personalSlots = props.tableConfig.columnsList.filter((item: any) => {
      //没有配置slotName
      if (!item.slotName) return false
      //剔除共有slot
      if (item.slotName === 'enable') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'operate') return false

      return true
    })

    //获取各种按钮权限
    const createPermission = usePermissions(props.pageName, 'create')
    const deletePermission = usePermissions(props.pageName, 'delete')
    const updatePermission = usePermissions(props.pageName, 'update')

    //删除某项
    const handleDelete = (item: any) => {
      store.dispatch('systemModule/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    //添加:
    const handleAdd = () => {
      emit('addClick')
    }
    //编辑:
    const handleEdit = (item: any) => {
      emit('editClick', item)
    }

    return {
      tableData,
      totalCount,
      pagination,
      personalSlots,
      getPageList,
      createPermission,
      deletePermission,
      updatePermission,
      handleDelete,
      handleAdd,
      handleEdit
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 0 40px 0;
  border-top: 20px solid #f5f5f5;
}
</style>
