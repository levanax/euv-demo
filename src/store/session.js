const state = {
	loginID: null,
	authorization: null
}
const mutations = {
  // TODO: 放置我们的状态变更函数
  'SET_USER_CACHE':(state, {loginID, authorization})=>{
  	state.loginID = loginID
  	state.authorization = authorization
  }
}

export default {
	namespaced:true,
	state,
	mutations
}