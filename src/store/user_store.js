/**
 * 用户相关数据
 * @Author Giovani
 * @Create: 2018/10/19 15:32
 */
import router from '../router';

export default {
  state: {
    phoneNum: '',
    userName: ''
  },
  mutations: {
    setPhoneNum(state, phoneNum) {
      state.phoneNum = phoneNum;
    },
    setUserName(state, userName) {
      state.userName = userName;
    }
  }

}
