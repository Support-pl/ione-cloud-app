import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import i18n from './i18n'
import store from './store'
import router from './router'
import './registerServiceWorker'
import axios from 'axios';

var axiosInstance = axios.create({
	baseURL: 'https://my.support.by/app_cloud_mobile',
});

Vue.config.productionTip = false
Vue.use(Antd)

Vue.prototype.$axios = axiosInstance;

new Vue({
  i18n,
	router,
	store,
  render: h => h(App)
}).$mount('#app')

// window.addEventListener('load', () => {

// 	if ('serviceWorker' in navigator) {

// 		navigator.serviceWorker.register('./sw.js')
// 			.then(registration => {
// 				console.log('Service worker successfully registered', registration);
// 			})
// 			.catch(error => {
// 				console.log('Service worker registration failed', error);
// 			});
// 	}
// });