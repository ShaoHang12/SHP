//统一管理项目前部的接口
import requests from "./request";
import mockRequest from "./mockAjax";
//三级联动接口
// /api/
export const reqCategoryList = () => {
  //发请求axios返回Promise对象
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};
export const reqGetBannerList = () => {
  return mockRequest.get("/banner");
};
//获取floor组件数据
export const reqFloorList = () => {
  return mockRequest.get("/floor");
};
//获取搜索模块数据 地址:/api/list 请求方式post
export const reqGetSearchInfo = (params) => {
  return requests({ url: "/list", method: "post", data: params });
};
//获取产品详情接口
export const repGoodsInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: "get" });
};
//将产品添加到购物车中（更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const repAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};
//获取购物车列表的接口
export const reqCartList = () => {
  return requests({ url: `/cart/cartList`, method: "get" });
};
//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
};
//切换选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};
//获取验证码
///api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};
//注册用户
export const reqUserRegister = (data) => {
  return requests({ url: `/user/passport/register`, data, method: "post" });
};
//用户登录
///api/user/passport/login
export const reqUserLogin = (data) => {
  return requests({ url: `/user/passport/login`, method: "post", data });
};
//获取用户信息需要带着用户的token
///user/passport/auth/getUserInfo
export const reqUserInfo = (data) => {
  return requests({
    url: `/user/passport/auth/getUserInfo`,
    data,
    method: "get",
  });
};
//退出登录
export const reqLogout = () => {
  return requests({ url: `/user/passport/logout`, method: "get" });
};
//获取用户地址信息
//api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => {
  return requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: "get",
  });
};
//获取交易地址
///api/order/auth/trade
export const reqOrderInfo = () => {
  return requests({
    url: `/order/auth/trade`,
    method: "get",
  });
};
//提交订单
///api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data) => {
  return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}
//获取支付信息
///api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId,data) => {
  return requests({url:`/payment/weixin/createNative/${orderId}`,data,method:'get'})
}
//获取支付订单状态
///api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
  return requests({ url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}
//我的订单
// /api/order/auth/{page}/{limit}
export const reqMyOrder = (limit,page) => {
  return requests({url:`/order/auth/${page}/${limit}`,method: "get",page})
}