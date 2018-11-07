/**
 *后台管理，用户管理模块接口列表
 * @Author Giovani
 * @Create: 2018/11/6 19:57
 */

import {BASE_URL, axios} from '../base';

const repairAdmin = {
  /**
   * 查询所有用户信息
   * @returns {AxiosPromise<any>}
   */
  findAllUser(data) {
    return axios.get(BASE_URL + "/admin/user", {params: data});
  },

  /**
   * 接受订单
   * @param data
   * @returns {AxiosPromise<any>}
   */
  accept(data) {
    return axios.put(BASE_URL + "/admin/accept/" + data);
  },

  /**
   * 完成维修
   * @param data
   * @returns {AxiosPromise<any>}
   */
  success(data) {
    return axios.put(BASE_URL + "/admin/success/" + data);
  }

};

export default repairAdmin;

