/**
 * 用户相关数据
 * @Author Giovani
 * @Create: 2018/10/19 15:32
 */
export default {
  state: {
    // 是否登录
    isLogin: false,
    // 登录注册面板是否弹出
    logRegPopup: false
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLosin = isLogin;
    },
    setLogRegPopup(state, logRegPopup) {
      state.logRegPopup = logRegPopup;
    }
  },
  getters: {
    getLogRegPopup: (state) => {
      return state.logRegPopup;
    }
  }
}
