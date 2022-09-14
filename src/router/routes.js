// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from "@/pages/Trade"
// import Pay from "@/pages/Pay"
//路由配置信息
export default [
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    path: "/detail/:skuid?",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/trade",
    name: "trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopCart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/GroupOrder"),
      },
      //进入center就访问myorder
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    //重定向，在项目跑起来，访问/立马定向到首页
    path: "*",
    redirect: "/home",
  },
];
