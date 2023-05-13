<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center>
      <GForm v-bind="modalConfig" v-model="formData" :hidden-item="hiddenItem"></GForm>
      <!-- 预留插槽，处理页面单独的逻辑 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick" size="mini"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'PageModal',
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    modalData: {
      type: Object,
      default: () => ({})
    },
    hiddenItem: {
      type: Array,
      default: () => []
    },
    pageName: {
      type: String,
      required: true
    },
    otherFormData: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    //监听传入的props的改变，源数据内存地址改变，所以这里要用getter形式，
    watch(
      () => props.modalData,
      (newVal) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[item.field] = newVal[item.field]
        }
      }
    )

    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.modalData).length) {
        //编辑时确认:
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherFormData },
          id: props.modalData.id
        })
      } else {
        //新增时确认:
        store.dispatch('systemModule/addPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherFormData }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
