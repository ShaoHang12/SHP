 import Vue from "vue";
 import Vuex from 'vuex';
 Vue.use(Vuex);
 import home from './home';
 import search from "./search";
 import detail from "./detail";
 import shopcart from "./shopcart";
 import user from "./user";
 import trade from "./trade";
 //对外暴露
 export default new Vuex.Store({
    //实现仓库模块式开发
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
 })
 