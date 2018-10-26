/**
 * 后台管理，维修模块接口列表
 * @Author Giovani
 * @Create: 2018/10/25 15:29
 */
import {BASE_URL, axios} from '../base';

const repairAdmin = {
  /**
   * 查询所有维修订单
   * @returns {AxiosPromise<any>}
   */
  findAllOrder(data) {
    return axios.get(BASE_URL + "/admin/repair", {params: data});
  }
};

export default repairAdmin;
