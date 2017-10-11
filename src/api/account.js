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
		data: {

		}
	});
}