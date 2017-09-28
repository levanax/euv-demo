import io from 'socket.io-client';
import {Config} from '@/commons/Config';

let createSocketConnect = function() {
	let [url, authorization, brokerID] = [Config.psgServer, 'asdfasdf', 'MR'];

	let feedSocket = io.connect(url, {
		reconnectionAttempts: 0,
		timeout: 2000,
		reconnectionDelay: 100,
		reconnectionDelayMax: 200,
		autoConnect: true,
		multiplex: false,
		query: [
			'authorization=' + authorization,
			'uuid=' + 'uuid',
			'brokerID=' + brokerID,
			'Appkey=' + '535634563456345',
			'AppPwd=' + 'FCGHXFGHXFGHFGH'
		].join('&')
	})
}

let init = function(){
	createSocketConnect();
}

export {init};