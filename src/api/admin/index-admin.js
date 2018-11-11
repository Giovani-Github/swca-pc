/**
 * 后台，首页管理api接口
 * @Author Giovani
 * @Create: 2018/11/9 15:05
 */
import {BASE_URL, axios} from '../base';

const indexAdmin = {
  /**
   * 删除文章
   * @param articleId
   */
  deleteArticle(articleId) {
    return axios.delete(BASE_URL + "/index/article/" + articleId);
  },

  /**
   * 审核通过
   * @param articleId
   */
  checkArticle(articleId) {
    return axios.put(BASE_URL + "/index/article/" + articleId);
  },

  /**
   * 获取所有文章
   */
  findAllAritcle() {
    return axios.get(BASE_URL + "/index/article");
  },

  /**
   * 删除轮播图
   * @param slideId
   */
  deleteSlide(slideId) {
    return axios.delete(BASE_URL + "/index/slideImg/" + slideId);
  },

  /**
   * 审核通过
   * @param slideId
   */
  checkSlide(slideId) {
    return axios.put(BASE_URL + "/index/slideImg/" + slideId);
  },

  /**
   * 获取文章标题，根据文章id
   * @param articleId
   */
  getArticleTitleByArticleId(articleId) {
    return axios.get(BASE_URL + "/index/aritcleTitle/" + articleId);
  },

  /**
   * 获取所有轮播图
   */
  findAllSlideImg() {
    return axios.get(BASE_URL + "/index/slideImg");
  },

  /**
   * 文章图片上传
   * @param param
   * @returns {AxiosPromise<any>}
   */
  uploadArticleImg(param) {

    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    };
    return axios.post(BASE_URL + "/index/articleImg", param, config);
  },

  /**
   * 文章发布
   * @param param
   */
  articlePublish(param) {
    return axios.post(BASE_URL + "/index/article", param);
  },

  /**
   * 首页轮播图上传
   * @param param
   * @returns {AxiosPromise<any>}
   */
  uploadSlideImg(param) {

    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    };
    return axios.post(BASE_URL + "/index/slideImg", param, config);
  }

};

export default indexAdmin;
