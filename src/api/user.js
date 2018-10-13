/**
 * 用户模块接口列表
 * @Author Giovani
 * @Create: 2018/10/13 21:40:54
 */
import {BASE_URL, axios} from './base';

const user = {
  login() {
    return axios.get(BASE_URL + '/user');
  }
};

export default user;


