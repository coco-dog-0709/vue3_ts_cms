// 接口Module接收两个泛型，一个是state返回的对象，一个是根storestate返回的对象
import { Module } from 'vuex'

import { IrooteState } from '../type'
import { ILoginState, IAccount } from './type'

import { accountLogin, queryUserInfoById, queryUserMenusByRoleId } from '@/service/login/login'

import router from '@/router'

import { cache } from '@/utils'

import { getUserRoutes } from '@/global'

const loginModule: Module<ILoginState, IrooteState> = {
  namespaced: true,
  state() {
    return {
      userInfo: null,
      token: '',
      userMenus: []
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setUserMenus(stete, userMenus) {
      stete.userMenus = userMenus
      // 动态添加用户路由:
      const userRoutes = getUserRoutes(userMenus)
      userRoutes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    //账号登录:
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      try {
        // 1.登录:
        const accountLoginResult = await accountLogin(payload)
        const { id, token } = accountLoginResult?.data || { id: '', token: '' }
        if (token) {
          commit('setToken', token)
          cache.setCache('token', token)
          //有token再去请求部门和角色数据
          dispatch('getDepAndRoleAndMenuAction', null, { root: true })
        }

        // 2.请求用户信息:
        const userInfoResult = await queryUserInfoById(id)
        const userInfo = userInfoResult?.data || null
        commit('setUserInfo', userInfo)
        cache.setCache('userInfo', userInfo)

        // 3.根据用户信息中的角色id请求用户菜单:
        if (userInfo && id) {
          const userMenusResult = await queryUserMenusByRoleId(userInfo.role.id)
          const userMenus = userMenusResult?.data || []
          commit('setUserMenus', userMenus)
          cache.setCache('userMenus', userMenus)
        }

        // 5.跳转到首页
        router.push('/main')
      } catch (error) {
        console.log(error)
      }
    },

    //手机号登录:
    phoneLoginAction() {
      console.log('手机号登录')
    },

    /* 
    用户刷新页面时防止state中的状态丢失,
    之所以不在state中直接以 `userInfo: cache.getCache('userInfo')` 的方式
    是因为要遵守想改变state的状态，只能通过mutations的原则
    */
    refreshLoginStates({ commit, dispatch }) {
      const token = cache.getCache('token')
      if (token) {
        commit('setToken', token)
        //有token再去请求部门和角色数据
        dispatch('getDepAndRoleAndMenuAction', null, { root: true })
      }
      const userInfo = cache.getCache('userInfo')
      if (userInfo) {
        commit('setUserInfo', userInfo)
      }
      const userMenus = cache.getCache('userMenus')
      if (userMenus) {
        commit('setUserMenus', userMenus)
      }
    }
  },
  modules: {}
}

export default loginModule
