<template>
  <div class="login-panel">
    <h2 class="title">Vue3+TS后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <i class="el-icon-user-solid"></i>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <i class="el-icon-mobile-phone"></i>
            <span>手机登录</span>
          </span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="remember-pwd">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <el-link href="https://element.eleme.io" target="_blank" type="primary">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button type="primary" @click="handleLogin">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const currentTab = ref('account')
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const handleLogin = () => {
      if (currentTab.value === 'account') {
        // 账号登陆
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 手机号登录
        phoneRef.value?.loginAction()
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLogin
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-top: -120px;
  width: 320px;
  .title {
    text-align: center;
  }
  .remember-pwd {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    margin-top: 10px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
