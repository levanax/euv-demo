export const formatSecurityCode = function(marketCode, securityCode){
	let result = null;
	switch(marketCode){
		case "HK":
			let length = securityCode.length;
			let str = '';
			for(let i = 0 ,l = 5 - length; i < l ; i++){
				str += '0';
			}
			result = str + securityCode;
		break;
		default:
		break;
	}
	return result;
}

export const isEmpty = function(str){
	return str === null || str.trim() === '';
}


export const isNotEmpty = function(str){
	return !isEmpty(str);
}