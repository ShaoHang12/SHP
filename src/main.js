import Vue from "vue";
import App from "./App.vue";
//三级联动组件
import TypeNav from "@/components/TypeNav";
//引入分页器
import Pagination from "@/components/Pagination";
//引入MockServe.js
import "@/mock/mockServe";
//引入路由
import router from "./router";
//引入仓库
import store from "./store";
//引入轮播图
import Carousel from "@/components/Carousel";
//引入Swiper样式
import "swiper/css/swiper.css";
//统一引入
import * as API from "@/api";
//引入ui组件库
import { Button,MessageBox } from "element-ui";
//引入图片懒加载
import VueLazyload from "vue-lazyload";
import  "@/plugins/validate"
Vue.config.productionTip = false;
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);
//按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;
Vue.use(VueLazyload);
new Vue({
  render: (h) => h(App),
  //注册路由出现$router,$route
  router,
  //注册仓库 $store
  store,
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
