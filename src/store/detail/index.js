
import {repGoodsInfo,repAddOrUpdateShopCart} from "@/api"
//封装游客身份模块uuid
import {getUUID}  from "@/utils/uuid_token"
const state = {
    goodsInfo:{},
    uuid_token:getUUID()


};
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    },
};
const actions = {
   async getGoodsInfo({commit} ,skuId){
      let result = await repGoodsInfo(skuId);
      if(result.code == 200){
           commit('GETGOODSINFO',result.data)
      }
    },
    //将产品添加到购物车中  
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
      let result = await repAddOrUpdateShopCart(skuId,skuNum);
    }
    
};
const getters = {
    //路径导航简化数据
    categoryView(state){
        //当前计算出来的categoryView属性值至少是一个空对象
        return state.goodsInfo.categoryView || {};
    },
    //简化产品信息
    skuInfo(state){
        return state.goodsInfo.skuInfo || {};
    },
    //售卖属性的简化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || [];
    }
};
export default {
state,
mutations,
actions,
getters
}