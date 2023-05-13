<template>
  <div class="search-form">
    <GForm v-bind="formConfig" v-model="formData">
      <template #footer>
        <el-button class="el-icon-refresh-left" size="small" @click="resetHandler">重置</el-button>
        <el-button :disabled="!queryPermission" type="primary" class="el-icon-search" size="small" @click="queryHandler"
          >搜索
        </el-button>
      </template>
    </GForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePermissions } from '@/hooks'

export default defineComponent({
  name: 'PageSearch',
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['resetForm', 'queryForm'],
  setup(props, { emit }) {
    //formData不能写死，要根据页面动态变化
    const originalFormData: any = {}
    const formItems = props.formConfig.formItems ?? []
    for (const item of formItems) {
      originalFormData[item.field] = ''
    }
    const formData = ref(originalFormData)

    //点击重置:
    const resetHandler = () => {
      // formData.value = originalFormData  这样写视图不会更新
      for (const item of Object.keys(formData.value)) {
        formData.value[item] = ''
      }
      emit('resetForm')
    }
    //点击搜索:
    const queryHandler = () => {
      emit('queryForm', formData.value)
    }
    const queryPermission = usePermissions(props.pageName, 'query')

    return {
      formData,
      resetHandler,
      queryHandler,
      queryPermission
    }
  }
})
</script>

<style scoped lang="less"></style>
