/**
 * 用户模块接口列表
 * @Author Giovani
 * @Create: 2018/10/13 21:40:54
 */
import {BASE_URL, axios} from './base';

const user = {

  /**
   * 根据手机号码查询用户
   * @param userId
   * @returns {AxiosPromise<any>}
   */
  getUserByPhoneNum(phoneNum) {
    return axios.get(BASE_URL + '/users/roles/' + phoneNum);
  },

  /**
   * 登录
   * @param params
   * @returns {AxiosPromise<any>}
   */
  login(params) {
    return axios.post(BASE_URL + '/auth/login', params);
  },

  /**
   * 注册
   * @param params
   * @returns {AxiosPromise<any>}
   */
  reg(params) {
    return axios.post(BASE_URL + '/auth/register', params);
  },

  /**
   * 后台登录
   * @param params
   */
  loginAdmin(params) {
    return axios.post(BASE_URL + '/auth/loginAdmin', params);
  },

  /**
   * 根据用户id查询用户信息
   * @param userId
   * @returns {AxiosPromise<any>}
   */
  getUserByUserId(userId) {
    return axios.get(BASE_URL + '/users/' + userId);
  },

  /**
   * 根据用户id查询用户名
   * @param userId
   * @returns {AxiosPromise<any>}
   */
  getUserNameByUserId(userId) {
    return axios.get(BASE_URL + "/users/userName/" + userId);
  },



};

export default user;


