import Vue from 'vue';
import * as accountApi from '@/api/account.js';

export default {
	namespaced:true,
	state: {
  		accountList:[]
	},
	actions: {
		'QUERY_ACCOUNT_LIST': async ({commit, state}, {loginID}) => {
			await accountApi.queryAccountList(loginID).then(function(response) {
			  let data = response.data;
		      if(data.clientAccounts){
		      	commit('SET_ACCOUNT_LIST', {accountList: data.clientAccounts});
		      }
			});
		}
	},
	mutations: {
		'SET_ACCOUNT_LIST': (state, {accountList}) => {
			let formatAccount = Vue.filter('formatAccount');
			for(let i=0,length = accountList.length; i< length;i++){
				accountList[i]['desc'] = formatAccount(accountList[i]);
			}
			state.accountList = accountList;
		}
	},
	getters: {
		'GET_ACCOUNT_LIST': (state, {marketCode, cucyCode}) => {
			
		}
	}
}