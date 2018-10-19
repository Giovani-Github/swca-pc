/**
 * 用户模块接口列表
 * @Author Giovani
 * @Create: 2018/10/13 21:40:54
 */
import {BASE_URL, axios} from './base';

const user = {
  login(params) {
    return axios.post(BASE_URL + '/auth/login', params);
  },

  reg(params) {
    return axios.post(BASE_URL + '/auth/register', params);
  }
};

export default user;


