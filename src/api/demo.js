/**
 * 测试用api
 * @Author Giovani
 * @Create: 2018/10/19 12:39
 */

import {BASE_URL, axios} from './base';

const demo = {

  demo1() {
    return axios.get(BASE_URL + "/demos/demo1");
  }

};

export default demo;
