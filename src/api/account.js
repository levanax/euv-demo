import axios from 'axios';
import {
	Config
} from '@/commons/config';


export function queryAccountList(loginID) {
	let url = '/clients/' + loginID + '/accounts';
	return axios.request({
		url: url,
		method: 'get',
		baseURL: Config.server,
		data: {}
	});
}


export const queryAccountProductLine = function(accNum){
	let url = ['/accounts', accNum, 'productLines'].join('/');
	return axios.request({
		url:url,
		method: 'get',
		baseURL: Config.server,
		params:{}
	});
}