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
   * 修改权限
   * @param data
   * @returns {AxiosPromise<any>}
   */
  updateAuth(userId, roleId) {
    return axios.put(BASE_URL + "/admin/user/auth/" + userId + "/" + roleId);
  },

  /**
   * 完成维修
   * @param data
   * @returns {AxiosPromise<any>}
   */
  success(userId, roleId) {
    return axios.put(BASE_URL + "/admin/success/" + userId + "/" + roleId);
  }

};

export default repairAdmin;

