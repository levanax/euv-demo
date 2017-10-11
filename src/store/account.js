import * as accountApi from '@/api/account.js';

export default {
	namespaced:true,
	state: {
  		accountList:[]
	},
	actions: {
		'QUERY_ACCOUNT_LIST': ({commit, state}, {loginID}) => {
			accountApi.queryAccountList(loginID).then(function(response) {
			  let data = response.data;
		      if(data.clientAccounts){
		        state.accountList = data.clientAccounts;
		      }
			});
		}
	}
}