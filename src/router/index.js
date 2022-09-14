import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, reslove, reject) {
  if (reslove && reject) {
    originalPush.call(this, location, reslove, reject);
  } else {
    originalPush.call(this, location, () => {}, () => {});
  }
};
VueRouter.prototype.replace = function(location, reslove, reject) {
  if (reslove && reject) {
    originalReplace.call(this, location, reslove, reject);
  } else {
    originalPush.call(this, location, () => {}, () => {});
  }
};

let router = new VueRouter({
  routes,
  //设置滚动条的位置
  scrollBehavior() {
    //滚动行为这个函数,需要有返回值,返回值为一个对象。
    //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
    return { y: 0 };
  },
});
//全局守卫 前置守卫
router.beforeEach(async (to, from, next) => {
  //to:去的那个路由的信息
  //from:从那个路由而来的信息
  //next:放行函数 next(/login)
  //用户登录了才会有token
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    if (to.path == "/login") {
      next('/home');
    } else {
      if (name) {
        next();
      } else {
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          await store.dispatch("userLogout")
          // await commit('CLEARUSERINFO');
          // console.log(to.path);
          next('/login');
          // router.push('/login')
        }
      }
    }
  }else{
    //未登录不能去交易相关，不能去支付【pay paysuccess】 个人中心 center
    //未登录去登录页
    let toPath = to.path
    if(toPath.indexOf('/trade') !== -1  || toPath.indexOf('/pay') !==-1 || toPath.indexOf('/center') !== -1){
      next('/login?redirect='+to.path)
    }else {
      next()
    }
  }
});
export default router;
