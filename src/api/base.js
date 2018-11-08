/**
 * 网络请求基础配置
 * @Author Administrator
 * @Create: 2018/10/13 21:38:37
 */
import store from '../store';
import Axios from "axios";
import qs from "qs";
import {Message} from "iview"

// 添加请求拦截器
Axios.interceptors.request.use(
  function (config) {
    // if (config.method === "post") {
    // axios接收的post请求参数的格式是form-data格式,所以需要使用插件“qs”，将请求参数转换为form-data格式
    // config.data = qs.stringify(config.data);

    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    // 请求时判断vuex中是合法存在token（即jwt），存在就带上
    let token = sessionStorage.getItem('token');
    config.headers.Authorization = "Bearer " + token;

    // }
    return config;
  },
  function (error) {
    Message.error({message: '请求超时!'});
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {

    if (response.status == store.state.global.status.NO_CONTENT) {
      console.log(response);
      Message.error({
        content: "没有相关数据",
        duration: 10,
        closable: true
      });
    }

    // 对响应数据做点什么
    return response;
  },
  function (error) {
    if (error.response.status == store.state.global.status.GATEWAY_TIMEOUT || error.response.status == store.state.global.status.NOT_FOUND) {
      Message.error({
        content: '服务器被吃了⊙﹏⊙∥',
        duration: 10,
        closable: true
      });
    } else if (error.response.status == store.state.global.status.FORBIDDEN) {
      Message.error({
        content: '权限不足或未登陆',
        duration: 10,
        closable: true
      });

    } else if (error.response.status == store.state.global.status.BAD_REQUEST) {
      Message.error({
        content: error.response.data.msg,
        duration: 10,
        closable: true
      });
    } else if (error.response.status == store.state.global.status.INTERNAL_SERVER_ERROR) {
      Message.error({
        content: error.response.data.msg,
        duration: 10,
        closable: true
      });
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 导出axios以及HOST
export const BASE_URL = store.state.global.BASE_URL; // 跨域相关，在config/index.js中
export const axios = Axios; // 网络请求
