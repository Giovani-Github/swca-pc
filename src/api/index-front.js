/**
 * 前台首页模块接口列表
 * @Author Giovani
 * @Create: 2018/11/11 20:52
 */

import {BASE_URL, axios} from './base';

const indexFront = {
  /**
   * 获取所有轮播图
   */
  findAllSlide() {
    return axios.get(BASE_URL + "/index/slideImg");
  },

};

export default indexFront;
