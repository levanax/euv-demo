export const formatSecurityCode = function(marketCode, securityCode){
	let result = null;
	swtich(marketCode){
		'HK':
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