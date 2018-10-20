/**
 * 公共数据
 * @Author Giovani
 * @Create: 2018/10/19 14:27
 */
export default {
  state: {
    BASE_URL: '/swca_api',
    // 存放jwt
    token: '',

    // 服务器响应状态码
    status: {
      // 客户端的错误，如请求参数错误
      BAD_REQUEST: 400,
      // 成功
      OK: 200,
      // 没有权限访问
      FORBIDDEN: 403
    }
  },
  mutations: {
    // 修改token数据，通过this.$store.commit('setToken', 'token')访问
    setToken(state, token) {
      state.token = token;
    }
  }
}
