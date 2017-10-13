import Vue from 'vue';
import * as accountApi from '@/api/account.js';

export default {
	namespaced:true,
	state: {
  		accountList:[],
  		accountProductLines: null
	},
	actions: {
		'QUERY_ACCOUNT_LIST': async ({commit, state}, {loginID}) => {
			let response = await accountApi.queryAccountList(loginID);
			let data = response.data;
			if(!data.error && !data.sysCode){
		      	commit('SET_ACCOUNT_LIST', {accountList: data.clientAccounts});
		      	return data.clientAccounts;
		    }else{
		    	throw new Error('account list get fail');
		    }
		},
		'QUERY_ACCOUNT_PRODUCT_LINES': async ({commit, state}, {accNum}) => {
			await accountApi.queryAccountProductLine(accNum).then((response) => {
				let data = response.data;
			    if(!data.error && !data.sysCode){
			  	   commit('SET_ACCOUNT_PRODUCT_LINES',{
				  	accountProductLines: data.productLines
				   })
				   return data.productLines;
			    }else{
			  	    throw new Error('data get fail');
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
		},
		'SET_ACCOUNT_PRODUCT_LINES': (state, {accountProductLines}) =>  {
			state.accountProductLines = accountProductLines;
		}
	},
	getters: {
		'GET_ACCOUNT_LIST': (state) => (cucys) => {
			let accountList = state.accountList;

		}
	}
}