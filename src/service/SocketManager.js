import io from 'socket.io-client';
import axios from 'axios';
import {
	Config
} from '@/commons/config';

let feedSocket;
/**
 * @param data {Object}
 * @param data.brokerID {String}
 * @param data.authorization {String}
 */
let createSocketConnect = function(data) {
	if(!feedSocket){
		let [url, authorization, brokerID] = [Config.psgServer, data.authorization, data.brokerID];

		feedSocket = io.connect(url, {
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
				'Appkey=' + Config.appKey,
				'AppPwd=' + Config.appPwd
			].join('&')
		});

		feedSocket.on('connect', function() {
			console.debug('connected.');
		});
		feedSocket.on('disconnect', function() {
			console.debug('disconnected');
		});
	}else{
		if (!feedSocket.connected) {
			feedSocket.connect();		
		}
	}
}

/**
 * @param data {Object}
 * @param data.mktCode {String}
 * @param data.sctyID {String}
 */
let subscribe = function(data) {
	if (feedSocket.connected) {
		// feedSocket.
		axios.request({
			url: '/streaming/sctyQuoteMin/subscribe',
			method: 'post',
			baseURL: Config.psgServer,
			data: {
				mktCode: data.mktCode,
				sctyID: data.sctyID
			}
		}).then(function(response) {
			let data = response.data;
		});
	}else{
		setTimeout(function(){
			subscribe(data);
		}, 1000);
	}
}
let subscribeIndex = function() {
	if (feedSocket.connected) {
		// feedSocket.
		axios.request({
			url: '/streaming/index/subscribe',
			method: 'post',
			baseURL: Config.psgServer,
			data: {
				mktCode: 'HK'
			}
		}).then(function(response) {
			let data = response.data;
			// console.debug(data);
		});
	}else{
		setTimeout(function(){
			subscribeIndex();
		}, 1000);
	}
}



let addResponseListener = function(callback) {
	feedSocket.on('scty_quote_min', callback);
}

let addIndexResponseListener = function(callback) {
	feedSocket.on('index', callback);
}


let install = function(data) {
	createSocketConnect(data);
}

export {
	install,
	subscribe,
	subscribeIndex,
	addResponseListener,
	addIndexResponseListener
};