/**
 * 维修模块接口列表
 * @Author Giovani
 * @Create: 2018/10/20 16:03
 */
import {BASE_URL, axios} from './base';

const repair = {
  /**
   * 提交维修订单
   * @param params
   * @returns {AxiosPromise<any>}
   */
  commit(params) {
    return axios.post(BASE_URL + '/repair', params);
  },

  /**
   * 查询当前用户所有维修订单
   * @returns {AxiosPromise<any>}
   */
  findAllOrder(data) {
    return axios.get(BASE_URL + "/repair", {params: data});
  },

  /**
   * 取消订单
   * @param data
   * @returns {AxiosPromise<any>}
   */
  cancel(data) {
    return axios.put(BASE_URL + "/admin/cancel/" + data);
  }
};

export default repair;

