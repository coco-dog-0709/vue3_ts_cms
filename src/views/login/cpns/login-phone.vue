<template>
  <div class="login-phone">
    <el-form :model="phone" label-width="70px" :rules="rules">
      <el-form-item label="手机号" prop="number">
        <el-input v-model.number="phone.number" type="text" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code-item">
          <el-input v-model.number="phone.code" type="text" />
          <el-button type="primary" class="get-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      number: '',
      code: ''
    })
    const loginAction = () => {
      store.dispatch('loginModule/phoneLoginAction', { ...phone })
    }

    return {
      phone,
      rules,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.code-item {
  display: flex;
  justify-content: space-between;
  .get-code {
    margin-left: 10px;
  }
}
</style>
