import { createStore, useStore as useVuexStore, Store } from 'vuex'
import loginModule from './login/login'
import systemModule from './main/system/system'
import analyseModule from './main/analyse/analyse'

import { IrooteState, IrootAndModuleState } from './type'
import { getPageList } from '@/service/main/system/system'
import { getButtonPermission } from '@/global/get-user-routes'

import { cache } from '@/utils'

const store = createStore<IrooteState>({
  state() {
    return {
      allDepartmentList: [], //所有的部门列表
      allRoleList: [], //所有的角色列表
      allMenuList: [], //所有的菜单列表
      userPermissions: [] //用户按钮权限
    }
  },
  mutations: {
    setDepartmentList(state, payload) {
      state.allDepartmentList = payload
    },
    setRoleList(state, payload) {
      state.allRoleList = payload
    },
    setMenuList(state, payload) {
      state.allMenuList = payload
    },
    setUserPermissions(state, userPermissions) {
      state.userPermissions = userPermissions
    }
  },
  getters: {},
  actions: {
    //获取所有的部门、角色、菜单 列表
    async getDepAndRoleAndMenuAction({ commit }) {
      const departmentData = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      })
      if (departmentData && departmentData.data) {
        const { list: allDepartmentList = [] } = departmentData.data
        commit('setDepartmentList', allDepartmentList)
      }
      const roleData = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      })
      if (roleData && roleData.data) {
        const { list: allRoleList = [] } = roleData.data
        commit('setRoleList', allRoleList)
      }
      const menuData = await getPageList('/menu/list', {})
      if (menuData && menuData.data) {
        const { list: allMenuList = [] } = menuData.data
        commit('setMenuList', allMenuList)
      }
    }
  },
  modules: {
    loginModule,
    systemModule,
    analyseModule
  }
})

//用户刷新页面时防止vuex里的数据丢失:
export function initLoginStates() {
  store.dispatch('loginModule/refreshLoginStates')

  //在这里调用getDepartmentAndRoleAction会有token还没请求回来的情况
  //store.dispatch('getDepartmentAndRoleAction')

  //4.获取用户的按钮权限:
  //这里不知道在根store中如何去获取loginModule下的userMenus，暂时只能通过cache去获取
  const userMenus = cache.getCache('userMenus')
  if (userMenus.length > 0) {
    const userPermissions = getButtonPermission(userMenus)
    store.commit('setUserPermissions', userPermissions)
  }
}

//为了在组件中store不为any并且可以使用子store中的状态,重构useStore函数：
export function useStore(): Store<IrootAndModuleState> {
  return useVuexStore()
}

export default store
