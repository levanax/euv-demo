import axios from 'axios';
import {
	Config
} from '@/commons/config';

export function querySecurityStaticData(marketCode, securityCode){
	let url = [
			'/markets',
			marketCode,
			'securities',
			securityCode
		].join('/');
	return axios.request({
		url: url,
		method: 'get',
		baseURL: Config.server,
		params: {
			langCode: 'en'
		}
	});
}

export const queryMarketCurrency = function(){
	let url = '/markets/currency';
	return axios.request({
		url:url,
		method: 'get',
		baseURL: Config.server,
		params:{}
	});
}