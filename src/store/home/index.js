import {reqCategoryList,reqGetBannerList,reqFloorList} from "@/api"
//home模块化小仓库
const state = {
    //茛距接口的初始值返回初始化
    categoryList:[],
    //轮播图的数据
    bannerList: [],
    floorList: []

};
const mutations = {
    CATEGORYLIST(state,categoryList ){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList ){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList ){
        state.floorList = floorList
    },
};
const actions = {
   async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code === 200){
            commit('CATEGORYLIST',result.data)
        }
    },
   async getBannerList({commit}){
        let result = await  reqGetBannerList()
        if(result.code === 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    //获取floor数据
   async getFloorList({commit}){
        let result = await  reqFloorList()
        if(result.code === 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}; 
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
