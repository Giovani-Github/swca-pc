/**
 * 集中管理各种vuex的store，并导出
 * @Author Giovani
 * @Create: 2018/10/19 14:23
 */
import Vue from 'vue';
import vuex from 'vuex';
import global_store from './global_store';
import user_store from './user_store';

Vue.use(vuex);

export default new vuex.Store({
    modules: {
      // 通过$store.state.global访问
      global: global_store,
      user: user_store,
    }
  }
);
