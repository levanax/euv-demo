import Vue from 'vue';
import * as marketApi from '@/api/market.js';

export default {
	namespaced:true,
	state: {
		securityMap: new Map(), //es6
		// key market, value: ['HKD']
		marketCurrencyMap: new Map()
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
		},
		'QUERY_MARKET_CURRENCY': ({commit, state}) => {
			marketApi.queryMarketCurrency().then((response)=>{
			  let data = response.data;
			  if(!data.error && !data.sysCode){
			  	commit('SET_MARKET_CURRENCY_MAP', {marketCurrencyList: data.mktCucy});
			  }
			});
		}
	},
	mutations: {
		'PUSH_SECURITY_MAP': (state, {security}) => {
			let key = security.mktCode + security.mktCode;
			state.securityMap.set(key, security);
		},
		'SET_MARKET_CURRENCY_MAP': (state, {marketCurrencyList}) => {
			for(let i = 0, length = marketCurrencyList.length; i < length; i++){
				state.marketCurrencyMap.set(marketCurrencyList[i].mktCode, marketCurrencyList[i].mktCucy);
			}
		}
	},
	getters: {
		'GET_SECURITY_MAP': (dispatch, state, getters) => {
			return state.securityMap;
		}
	}
}