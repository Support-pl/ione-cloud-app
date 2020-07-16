import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import i18n from './i18n'
import router from './router'


Vue.config.productionTip = false
Vue.use(Antd)


// @ts-ignore
// BX24.init( () => {
new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
// })

window.addEventListener('load', () => {

	if ('serviceWorker' in navigator) {

		navigator.serviceWorker.register('./sw.js')
			.then(registration => {
				console.log('Service worker successfully registered', registration);
			})
			.catch(error => {
				console.log('Service worker registration failed', error);
			});
	}
});