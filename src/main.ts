import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/css/index.less'

import router from './router'
import store from './store'

import globalRegister from './global'

import { initLoginStates } from '@/store'

const app = createApp(App)
/*
app.use的参数如果是一个函数，会自动将app传入这个函数，
如果参数是一个对象，会执行这个对象的install方法，并且也会将app作为install方法的参数
*/
app.use(globalRegister)

//用户刷新页面时初始化loginModule/state的状态,一定要在use(router之前执行)
initLoginStates()

app.use(router)

app.use(store)
app.mount('#app')
