/**
 * 网络请求基础配置
 * @Author Administrator
 * @Create: 2018/10/13 21:38:37
 */
import Axios from "axios";
import qs from "qs";

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  if (config.method === "post") {
    // axios接收的post请求参数的格式是form-data格式,所以需要使用插件“qs”，将请求参数转换为form-data格式
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 导出axios以及HOST
export const BASE_URL = '/swca_api'; // 跨域相关，在config/index.js中
export const axios = Axios; // 网络请求
