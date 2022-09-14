//对于axios二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import store from "@/store";
//引入进度条的样式
import "nprogress/nprogress.css";
//start代表开始 done代表结束
const requests = axios.create({
  //1.create
  //基础路径
  baseURL: "/mock",
  //超时时间
  timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use((config) => {

//   //请求头添加一个字段
  nprogress.start();
  //config为配置对象header请求头
  return config;
});
//响应拦截器
requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败
    return Promise.reject(new Error("faile"));
  }
);
export default requests;
