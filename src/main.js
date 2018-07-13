// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {Config} from './commons/config'
import * as axiosManager from './utils/axiosManager'
import * as filters from './utils/filters'
import router from './router'
import store from './store'

import  i18n from './plugins/i18next'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
	console.error(err);
}


/* ---------------bootstrap vue bug .---------------- */
//https://github.com/bootstrap-vue/bootstrap-vue/issues/1201
let originalVueComponent = Vue.component
Vue.component = function(name, definition) {
  if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
      name === 'bCheckGroup' || name === 'bFormRadioGroup') {
    definition.components = {bFormCheckbox: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}
/* -------------bootstrap vue bug end.------------------- */
Vue.use(BootstrapVue);


axiosManager.initInterceptor();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
});
