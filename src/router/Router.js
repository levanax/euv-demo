import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/view/user/Login'
import Main from '@/view/market/Main'

Vue.use(Router);

let router = new Router({
	routes: [{
		path: '/',
		redirect: {
			name:'login'
		}
	}, {
		path: '/login',
		name: 'login',
		component: UserLogin
	},{
		path: '/main',
		name: 'main',
		component: Main,
		beforeEnter : function(to, from, next){
			next();
		}
	}]
});


router.beforeEach((to, from, next) => {
	let online = true;
	switch(to.path){
		case '/login':
  			next();
		break;
		default:
			// console.debug('to.path : '+to.path);
			if(online){
				next();
			}else{
				next('/login');
			}
		break;
	}
})
export {router as default} 