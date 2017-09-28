import axios from 'axios';

let initInterceptor = function() {
	axios.interceptors.request.use(function(config) {
		console.debug(config);
		return config;
	}, function(error) {
		return Promise.reject(error);
	});

	// Add a response interceptor
	axios.interceptors.response.use(function(response) {
		console.debug(response);
		// Do something with response data
		return response;
	}, function(error) {
		// Do something with response error
		return Promise.reject(error);
	});
}


export {initInterceptor};

