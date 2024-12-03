import { createStore } from 'vuex';
import actions from '@/store/action';
import mutations from '@/store/mutation';
export default createStore({
  state: {
    people: [],
  },
  getters: {},
  mutations,
  actions,
  modules: {},
});
