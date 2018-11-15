/**
 * 公共数据
 * @Author Giovani
 * @Create: 2018/10/19 14:27
 */
export default {
  state: {
    BASE_URL: '/swca_api',

    /**
     * 服务器响应状态码
     */
    status: {
      /**
       * 客户端的错误，如请求参数错误
       */
      BAD_REQUEST: 400,
      /**
       * 成功
       */
      OK: 200,
      /**
       * 没有权限访问
       */
      FORBIDDEN: 403,
      /**
       * 服务器端错误
       */
      INTERNAL_SERVER_ERROR: 500,
      /**
       * 请求超时
       */
      GATEWAY_TIMEOUT: 504,
      /**
       * 服务器端没有找到内容
       */
      NO_CONTENT: 204,
      /**
       * 没有找到
       */
      NOT_FOUND: 404,
    },
    // 订单维修状态
    repairState: {
      /**
       * 已提交
       */
      COMMIT_INIT: 0,
      /**
       * 已接受维修
       */
      ACCEPT: 1,
      /**
       * 已维修完成
       */
      SUCCESS: 2,
      /**
       * 已取消
       */
      CANCEL: 3
    },

    /**
     * 后台左侧菜单当前选择项
     */
    adminMenuActive: '1',

    /**
     * 用户中心抽屉是否打开
     */
    userCenter: false

  },
  mutations: {
    /**
     * 修改userCenter数据，通过this.$store.commit('setUserCenter', 'userCenter')访问
     * @param state
     * @param userCenter
     */
    setUserCenter(state, userCenter) {
      state.userCenter = userCenter;
    },

    /**
     * 修改token数据，通过this.$store.commit('setToken', 'token')访问
     * @param state
     * @param token
     */
    setToken(state, token) {
      state.token = token;
    },

    /**
     * 修改adminMenuActive，通过this.$store.commit('setAdminMenuActive', 'activeName')访问
     * @param state
     * @param activeName
     */
    setAdminMenuActive(state, activeName) {
      state.adminMenuActive = activeName;
    }
  }
}
