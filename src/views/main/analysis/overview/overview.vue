<template>
  <div class="overview">
    <GCard title="关于:">
      Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus 、TypeScript、Echart5 等后台系统解决方案。
    </GCard>
    <GCard title="技术栈:">
      <GLink :link-data="technologyStacks"></GLink>
    </GCard>
    <GCard title="目录划分:">
      <GDescription :descriptionData="projectDirectory"></GDescription>
    </GCard>
    <GCard title="命名规范:">
      <GDescription :descriptionData="namingRule"></GDescription>
    </GCard>
    <GCard title="Git提交规范:">
      <GDescription
        :descriptionData="[
          {
            name: 'add操作',
            description: 'git add'
          },
          {
            name: 'commit操作',
            description: 'npm run commit'
          },
          {
            name: 'pull操作',
            description: 'git pull'
          },
          {
            name: 'push操作',
            description: 'git push'
          }
        ]"
      ></GDescription>
    </GCard>
  </div>
</template>

<script lang="ts">
import { GCard, GLink, GDescription } from '@/base-ui'

import { technologyStacks, projectDirectory, namingRule } from './config'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'overview',
  components: {
    GCard,
    GLink,
    GDescription
  },
  setup() {
    return {
      technologyStacks,
      projectDirectory,
      namingRule
    }
  }
})
</script>

<style scoped></style>
