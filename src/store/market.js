import Vue from 'vue';
import * as marketApi from '@/api/market.js';

export default {
	namespaced:true,
	state: {
		securityMap: new Map() //es6
	},
	actions: {
		'QUERY_SECURITY_STATIC_DATA': ({commit, state}, {marketCode, securityCode}) => {
			return new Promise((resolve, reject) => {
				marketApi.querySecurityStaticData(marketCode, securityCode).then((response) => {
				  let data = response.data;
				  if(!data.error && !data.sysCode){
				  	commit('PUSH_SECURITY_MAP', {security: data});
				  	resolve(data);
				  }else{
				  	console.warn('request fail.');
				  	reject('request fail');
				  }
				});
			});
		}
	},
	mutations: {
		'PUSH_SECURITY_MAP': (state, {security}) => {
			let key = security.mktCode + security.mktCode;
			state.securityMap.set(key, security);
		}
	},
	getters: {
		'GET_SECURITY': ({dispatch, state}, {marketCode, securityCode}) => {
			let key = marketCode + securityCode;
			let security = state.securityMap.get(key);
			if(security){
				return Promise.resolve(security);
			}else{
				return new Promise((resolve, reject) =>{
					dispatch('QUERY_SECURITY_STATIC_DATA', {
						marketCode: marketCode,
						securityCode: securityCode
					}).then((data) => {
						resolve(data);
					})
				});
			}
		}
	}
}