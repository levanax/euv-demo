import Vue from 'vue';
import Vuex from 'vuex';
import account from './account';
import session from './session';


Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    session: session,
    account: account
  }
})