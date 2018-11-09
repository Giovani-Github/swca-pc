/**
 * 后台，首页管理api接口
 * @Author Giovani
 * @Create: 2018/11/9 15:05
 */
import {BASE_URL, axios} from '../base';

const indexAdmin = {

  /**
   * 首页轮播图上传
   * @param param
   * @returns {AxiosPromise<any>}
   */
  uploadImg(param) {

    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    };
    return axios.post(BASE_URL + "/index/img", param, config);
  }

};

export default indexAdmin;
