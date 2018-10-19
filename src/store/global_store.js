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
  },
  mutations: {
    // 修改token数据，通过this.$store.commit('setToken', 'token')访问
    setToken(state, token) {
      state.token = token;
    }
  }
}
