import { Module } from 'vuex'
import { ISystemState, IPageListPayload } from './type'
import { IrooteState } from '../../type'

import { addPageData, editPageData, deletePageData, getPageList } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IrooteState> = {
  namespaced: true,
  state: () => {
    return {
      tableData: [],
      totalCount: 0
    }
  },
  mutations: {
    setPageList(state, pageList) {
      state.tableData = pageList
    },
    setTotalCount(state, totalCount) {
      state.totalCount = totalCount
    }
  },
  getters: {},
  actions: {
    //获取页面数据通用方法，需要传入页面名称 pageName
    async getPageListAction({ commit }, payload: IPageListPayload) {
      const pageUrl = `/${payload.pageName}/list`
      const pageListResult = await getPageList(pageUrl, payload.queryInfo)
      if (pageListResult && pageListResult.data) {
        const { list, totalCount = 0 } = pageListResult.data
        commit('setPageList', list)
        commit('setTotalCount', totalCount)
      }
    },
    //删除页面某项数据的通用方法，需要传入页面名称 pageName 和删除项的id
    async deletePageDataAction(context, { pageName, id }) {
      await deletePageData(`${pageName}/${id}`)
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //新增页面某条数据的通用方法，需要传入页面名称 pageName
    async addPageDataAction(context, { pageName, newData }) {
      const pageData = await addPageData(`/${pageName}`, newData)
      if (pageData && pageData.data) {
        context.dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      }
    },
    //编辑页面某条数据的通用方法，需要传入页面名称 pageName
    async editPageDataAction(context, { pageName, editData, id }) {
      const pageData = await editPageData(`/${pageName}/${id}`, editData)
      if (pageData && pageData.code === 0) {
        context.dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      } else {
        alert('编辑失败')
      }
    }
  }
}

export default systemModule
