import Vue from 'vue';
import Vuex from 'vuex';
import account from './account';
import session from './session';
import market from './market';
import twoFA from './twoFA';

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    session: session,
    account: account,
    market: market,
    twoFA: twoFA
  }
})