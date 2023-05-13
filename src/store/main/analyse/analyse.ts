import { Module } from 'vuex'
import { IanalyseState } from './type'
import { IrooteState } from '../../type'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getCityGoodsSale
} from '@/service/main/analyse/analyse'
const analyseModule: Module<IanalyseState, IrooteState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categotyGoodsSale: [],
      cagtegoryGoodsFavor: [],
      cityGoodsSale: []
    }
  },
  mutations: {
    setGoodsCount(state, goodsCount) {
      state.categoryGoodsCount = goodsCount
    },
    setGoodsSale(state, goodsSale) {
      state.categotyGoodsSale = goodsSale
    },
    setGoodsFavor(state, goodsFavor) {
      state.cagtegoryGoodsFavor = goodsFavor
    },
    setCitySale(state, citySale) {
      state.cityGoodsSale = citySale
    }
  },
  getters: {},
  actions: {
    async getCategoryGoodsDataAction({ commit }) {
      const goodsCountResult = await getCategoryGoodsCount()
      if (goodsCountResult.code === 0 && goodsCountResult.data) {
        commit('setGoodsCount', goodsCountResult.data)
      }
      const goodsSaleResult = await getCategoryGoodsSale()
      if (goodsSaleResult.code === 0 && goodsSaleResult.data) {
        commit('setGoodsSale', goodsSaleResult.data)
      }
      const goodsFavorResult = await getCategoryGoodsFavor()
      if (goodsFavorResult.code === 0 && goodsFavorResult.data) {
        commit('setGoodsFavor', goodsFavorResult.data)
      }
      const citySaleResult = await getCityGoodsSale()
      if (citySaleResult.code === 0 && citySaleResult.data) {
        commit('setCitySale', citySaleResult.data)
      }
    }
  }
}

export default analyseModule
