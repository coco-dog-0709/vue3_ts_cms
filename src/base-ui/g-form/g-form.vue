<template>
  <div class="form-wrapper">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form class="g-form" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="rowLayout">
            <el-form-item v-if="!hiddenItem.includes(item.field)" :label="item.label" :style="formItemStyle">
              <el-input
                v-if="item.type === 'text'"
                type="text"
                size="small"
                :placeholder="item.placeholder"
                v-bind="item.otherConfig"
                v-model="formData[item.field]"
              />
              <el-input
                v-if="item.type === 'password'"
                type="password"
                :placeholder="item.placeholder"
                v-bind="item.otherConfig"
                v-model="formData[item.field]"
              />
              <el-select
                v-else-if="item.type === 'selection'"
                style="width: 100%"
                :placeholder="item.placeholder"
                v-bind="item.otherConfig"
                v-model="formData[item.field]"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.label"
                  :value="option.value"
                  :label="option.label"
                ></el-option>
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'date-picker'"
                type="daterange"
                style="width: 100%"
                v-bind="item.otherConfig"
                v-model="formData[item.field]"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import { IFormItem } from './type'

export default defineComponent({
  name: 'GForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    //类似响应式，决定一行显示几个表单
    rowLayout: {
      type: Object,
      default: () => ({
        xs: 24, // 屏幕 < 768px 一行显示一个表单
        sm: 24, // 768px < 屏幕 < 992px 一行显示一个表单
        md: 12, // 992px < 屏幕 < 1200px 一行显示两个表单
        lg: 8, // 1200px < 屏幕 < 1920px 一行显示三个表单
        xl: 6 // 屏幕 > 1920px 一行显示四个表单
      })
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    formItemStyle: {
      type: Object,
      default: () => ({ padding: '10px 5px;' })
    },
    hiddenItem: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    //拷贝一份，不直接引用props.modelVal,避免违反改变props的原则
    const formData: any = ref({ ...props.modelValue })
    //之后监听formData,发送新值出去
    watch(
      formData,
      (newVal) => {
        emit('update:modelValue', newVal)
      },
      {
        deep: true,
        immediate: true
      }
    )

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.g-form {
  padding-top: 22px;
  padding-right: 40px;
}
.footer {
  text-align: right;
  padding: 0 40px 22px 0;
}
</style>
