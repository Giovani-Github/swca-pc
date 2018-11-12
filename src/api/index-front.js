/**
 * 前台首页模块接口列表
 * @Author Giovani
 * @Create: 2018/11/11 20:52
 */

import {BASE_URL, axios} from './base';

const indexFront = {
  // 阅读量加1
  readingAdd(articleId) {
    return axios.put(BASE_URL + "/index/article/reading/" + articleId);
  },

  /**
   * 根据作者id获取作者信息
   */
  getAuthorByUserId(userId) {
    return axios.get(BASE_URL + "/index/user/" + userId);
  }
  ,
  /**
   * 根据id获取文章
   */
  getArticleById(articleId) {
    return axios.get(BASE_URL + "/index/article/" + articleId);
  },
  /**
   * 获取所有轮播图
   */
  getAllSlide() {
    return axios.get(BASE_URL + "/index/slideImg");
  },

  /**
   * 获取前20篇普通文章
   */
  getNewInformArticle() {
    return axios.get(BASE_URL + "/index/informArticle");
  },

  /**
   * 获取阅读量最多的20篇教程文章
   */
  getHotCourseArticle() {
    return axios.get(BASE_URL + "/index/courseArticle");
  },
};

export default indexFront;
