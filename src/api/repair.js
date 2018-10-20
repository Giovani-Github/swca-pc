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
};

export default repair;

