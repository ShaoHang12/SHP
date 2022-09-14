
import { reqGetSearchInfo } from "@/api";
//引入search小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList

    }
};
const actions = {
    //获取search数据
   async getSearchList({commit},params={}) {
      let result = await reqGetSearchInfo(params)
      if(result.code==200){
         commit('GETSEARCHLIST',result.data)  
      }
    }

};
//项目中主要作用简化仓库数据
const getters = {
    //当前形参为仓库中的state
    goodsList(state){
        return state.searchList.goodsList || []

    },
    trademarkList(state){
        return state.searchList.trademarkList || []

    },
    attrsList(state){
        return state.searchList.attrsList  || []
    },

};
export default {
    state,
    mutations,
    actions,
    getters
}