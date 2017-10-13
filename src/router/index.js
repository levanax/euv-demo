import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

const UserLogin = () => import('@/view/user/Login');
const Main = () => import('@/view/market/Main');
const Order = () => import('@/view/market/Order');

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
	}, {
		path: '/order/:market/:sctyID/:side',
		name: 'order',
		component: Order
	}]
});


router.beforeEach((to, from, next) => {
	let onlineLoginID = store.state.session.loginID;
	/*必需引入 storerouter.app.$store.state.session.loginID */
	let online = onlineLoginID!==null?true:false;
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