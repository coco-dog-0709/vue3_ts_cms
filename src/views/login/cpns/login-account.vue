<template>
  <div class="login-account">
    <el-form :model="account" :rules="rules" label-width="60px" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" type="text" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import { cache } from '@/utils'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: cache.getCache('name'),
      password: cache.getCache('password')
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.是否缓存本地账号和密码
          if (isKeepPassword) {
            cache.setCache('name', account.name)
            cache.setCache('password', account.password)
          } else {
            cache.removeCache('name')
            cache.removeCache('password')
          }
          //2.调用accountLoginAction:
          store.dispatch('loginModule/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
