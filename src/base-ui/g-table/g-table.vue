<template>
  <div class="g-table">
    <div class="header">
      <slot name="title">
        <h3>{{ title }}</h3>
      </slot>
      <div class="operate">
        <slot name="headerOperate"> </slot>
      </div>
    </div>
    <el-table :data="tableData" v-bind="otherConfig" border>
      <el-table-column v-if="showSelectColumn" type="selection" width="40"></el-table-column>
      <el-table-column v-if="showIndexColumn" label="序号" type="index" width="60" align="center"></el-table-column>
      <template v-for="column in columnsList" :key="column.prop">
        <el-table-column v-bind="column" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="column.slotName" :row="scope.row">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <el-pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IColumnsList } from './type'

export default defineComponent({
  name: 'GTable',
  props: {
    title: {
      type: String
    },
    tableData: {
      type: Array,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    columnsList: {
      type: Array as PropType<IColumnsList[]>,
      required: true
    },
    //是否显示序号列
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    //是否显示复选列
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    //绑定到el-table上的属性
    otherConfig: {
      type: Object,
      default: () => ({})
    },
    //分页配置:
    pagination: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    //是否展示分页器:
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:pagination'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      console.log(pageSize)
      emit('update:pagination', { ...props.pagination, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      console.log(currentPage)
      emit('update:pagination', { ...props.pagination, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.g-table {
  margin: 30px 0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer {
    text-align: right;
  }
}
</style>
