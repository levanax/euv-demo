import axios from 'axios';
import {
	Config
} from '@/commons/config';


export function queryAbleContact(loginID){
  let url = '/clients/' + loginID + '/otpContactProfile';
  return axios.request({
		url: url,
		method: 'get',
		baseURL: Config.server,
		data: {}
	});
}

export function requestOTPService(loginID,module, otpType, channel, langCode){
	let url = '/clients/' + loginID + '/otp';
  return axios.request({
		url: url,
		method: 'get',
		baseURL: Config.server,
		params: {
			platform:'M',
			module: module,
			otpType: otpType,
			channel: channel,
			langCode: langCode
		}
	});
}