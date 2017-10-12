
export function formatAccount(account){
	let result = null;
	if(account){
		result = account.accNum + ' ' + account.accCucy;
	}
	return result;
}